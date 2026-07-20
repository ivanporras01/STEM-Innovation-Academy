"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Dispatch, PointerEvent, SetStateAction } from "react";
import {
  ArrowRight,
  Calculator,
  Camera,
  Check,
  ChevronRight,
  CircleHelp,
  Eraser,
  FlaskConical,
  Lock,
  Maximize2,
} from "lucide-react";
import {
  BookOpen,
  Clock3,
  MessageCircle,
  Mic,
  MicOff,
  Pencil,
  Send,
  ShieldCheck,
  Sparkles,
  StopCircle,
  Volume2,
  Wifi,
} from "lucide-react";
import { NovaLogoIcon } from "@/components/ui/nova-logo-mark";
import { OrbitoRealGuide } from "@/components/orbit/orbito-real-guide";
import { worldToSvg } from "@/lib/ai-tutoring-graph";
import { cn } from "@/lib/utils";

type Subject = "Math" | "Science";
type Room = "waiting" | "classroom" | "report";
type Message = { from: "explorer" | "tutor"; text: string };
type SessionActivity = { chatMessages: number; whiteboardStrokes: number; hasNotes: boolean };
type BoardColor = "navy" | "cyan" | "green" | "orange" | "purple";
type BoardCommand =
  | { type: "clear" }
  | { type: "write" | "formula"; text: string; x: number; y: number; align?: "left" | "center" | "right"; color?: BoardColor; size?: number }
  | { type: "drawAxes"; x: number; y: number; width: number; height: number; ticks?: number }
  | { type: "plotPoint"; x: number; y: number; label?: string; color?: BoardColor }
  | { type: "drawLine"; x1: number; y1: number; x2: number; y2: number; color?: BoardColor }
  | { type: "drawArrow"; x1: number; y1: number; x2: number; y2: number; label?: string; color?: BoardColor }
  | { type: "drawTriangle"; points: Array<{ x: number; y: number; label?: string }>; color?: BoardColor; labels?: string[] }
  | { type: "highlight"; x: number; y: number; width: number; height: number; color?: Exclude<BoardColor, "navy"> };
type LearnerAction = "message" | "continue" | "understood" | "hint" | "different-explanation" | "slower";
type TeachingState = { objective: string; currentConcept: string; currentStep: number; studentUnderstanding: "starting" | "thinking" | "confident" | "needs-support"; hintsCount: number; nextGuidingQuestion: string; priorTutorBlock: string; lastLearnerMessage: string; selectedLearnerAction: LearnerAction };
type TeachingBlock = { explanation: string; boardCommands: BoardCommand[]; guidingQuestion: string; suggestedActions: string[] };
type TutorResponse = { reply: string; teachingBlock: TeachingBlock; lessonState?: TeachingState; providerStatus?: string; providerMessage?: string };

function parseNestedTutorJson(value: unknown, depth = 0): unknown {
  if (depth >= 4 || typeof value !== "string") return value;
  const cleaned = value.trim().replace(/^```(?:json)?\s*|\s*```$/gi, "");
  if (!/^[{[]/.test(cleaned)) return value;
  try {
    return parseNestedTutorJson(JSON.parse(cleaned), depth + 1);
  } catch {
    return value;
  }
}

function plainTutorText(value: unknown, depth = 0): string {
  const parsed = parseNestedTutorJson(value);
  if (typeof parsed === "string") {
    return /^[{[]/.test(parsed.trim()) ? "" : parsed.replace(/\s+/g, " ").trim();
  }
  if (!parsed || typeof parsed !== "object" || depth >= 4) return "";
  const record = parsed as Record<string, unknown>;
  for (const key of ["reply", "explanation", "text", "content", "message"]) {
    const text = plainTutorText(record[key], depth + 1);
    if (text) return text;
  }
  return "";
}

function normalizeTutorResponse(value: unknown): TutorResponse | null {
  const response = parseNestedTutorJson(value);
  if (!response || typeof response !== "object" || Array.isArray(response)) return null;
  const record = response as Record<string, unknown>;
  const rawBlock = parseNestedTutorJson(record.teachingBlock);
  const block = rawBlock && typeof rawBlock === "object" && !Array.isArray(rawBlock)
    ? rawBlock as Record<string, unknown>
    : {};
  const explanation = plainTutorText(block.explanation);
  const reply = plainTutorText(record.reply) || explanation;
  const guidingQuestion = plainTutorText(block.guidingQuestion);
  if (!reply || !explanation || !guidingQuestion) return null;

  return {
    reply,
    teachingBlock: {
      explanation,
      boardCommands: Array.isArray(block.boardCommands) ? block.boardCommands as BoardCommand[] : [],
      guidingQuestion,
      suggestedActions: Array.isArray(block.suggestedActions)
        ? block.suggestedActions.map((action) => plainTutorText(action)).filter(Boolean)
        : [],
    },
    lessonState: record.lessonState as TeachingState | undefined,
    providerStatus: typeof record.providerStatus === "string" ? record.providerStatus : undefined,
    providerMessage: typeof record.providerMessage === "string" ? record.providerMessage : undefined,
  };
}

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const TOPICS: Record<Subject, string[]> = {
  Math: ["Algebra & equations", "Geometry", "Pre-algebra", "Statistics", "Calculus readiness"],
  Science: ["Biology", "Chemistry", "Physics", "Earth & space science", "Scientific investigation"],
};

function getSavedSetup() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.sessionStorage.getItem("nova-ai-tutoring") ?? "null") as {
      name?: string;
      subject?: Subject;
      topic?: string;
    } | null;
  } catch {
    return null;
  }
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

const BOARD_COLORS: Record<BoardColor, string> = { navy: "#0b1d3a", cyan: "#007da0", green: "#07836b", orange: "#d65e14", purple: "#7257c7" };
const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 620;

function isTextCommand(command: BoardCommand): command is Extract<BoardCommand, { type: "write" | "formula" }> {
  return command.type === "write" || command.type === "formula";
}

function TeachingBoard({ commands }: { commands: BoardCommand[] }) {
  const axes = commands.find((command): command is Extract<BoardCommand, { type: "drawAxes" }> => command.type === "drawAxes") ?? { type: "drawAxes" as const, x: 50, y: 55, width: 62, height: 62, ticks: 10 };
  const range = axes.ticks ?? 10;
  const plane = {
    left: (axes.x - axes.width / 2) * 10,
    top: (axes.y - axes.height / 2) * 6.2,
    width: axes.width * 10,
    height: axes.height * 6.2,
    range,
  };
  const scale = (x: number, y: number) => worldToSvg({ x, y }, plane);
  const percentX = (value: number) => value * 10;
  const percentY = (value: number) => value * 6.2;
  const graphCommandsPresent = commands.some((command) => ["drawAxes", "plotPoint", "drawLine"].includes(command.type));
  const axisCommands = commands.filter((command): command is Extract<BoardCommand, { type: "drawAxes" }> => command.type === "drawAxes");
  const visibleAxes = axisCommands.length ? axisCommands : graphCommandsPresent ? [axes] : [];

  return (
    <svg viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`} preserveAspectRatio="xMidYMid meet" className="pointer-events-none absolute inset-0 h-full w-full" aria-label="Órbita's structured teaching board">
      <defs><marker id="board-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#07836b" /></marker></defs>
      {commands.filter((command) => command.type === "highlight").map((command, index) => (
        <rect key={`highlight-${index}`} x={percentX(command.x)} y={percentY(command.y)} width={percentX(command.width)} height={percentY(command.height)} rx="12" fill={BOARD_COLORS[command.color ?? "cyan"]} opacity="0.13" />
      ))}
      {visibleAxes.map((command, index) => {
        const x = percentX(command.x); const y = percentY(command.y); const width = percentX(command.width); const height = percentY(command.height);
        const graphRange = command.ticks ?? 10;
        const tickStep = graphRange <= 5 ? 1 : 2;
        const tickValues = Array.from({ length: Math.floor((graphRange * 2) / tickStep) + 1 }, (_, tick) => -graphRange + tick * tickStep);
        const graphPlane = { left: x - width / 2, top: y - height / 2, width, height, range: graphRange };
        return <g key={`axes-${index}`} stroke="#55718c" strokeWidth="2">
          <line x1={x - width / 2} y1={y} x2={x + width / 2} y2={y} /><line x1={x} y1={y - height / 2} x2={x} y2={y + height / 2} />
          {tickValues.map((value) => {
            const pointX = worldToSvg({ x: value, y: 0 }, graphPlane);
            const pointY = worldToSvg({ x: 0, y: value }, graphPlane);
            return <g key={value}>
              <line x1={pointX.x} y1={y - 6} x2={pointX.x} y2={y + 6} />
              <line x1={x - 6} y1={pointY.y} x2={x + 6} y2={pointY.y} />
              {value !== 0 && <><text x={pointX.x} y={y + 23} fill="#38536d" stroke="none" fontSize="14" textAnchor="middle">{value}</text><text x={x - 12} y={pointY.y + 5} fill="#38536d" stroke="none" fontSize="14" textAnchor="end">{value}</text></>}
            </g>;
          })}
          <text x={x + width / 2 - 12} y={y - 10} fill="#0b1d3a" stroke="none" fontSize="17">x</text><text x={x + 10} y={y - height / 2 + 18} fill="#0b1d3a" stroke="none" fontSize="17">y</text>
        </g>;
      })}
      {commands.filter((command) => command.type === "drawLine").map((command, index) => {
        const start = scale(command.x1, command.y1); const end = scale(command.x2, command.y2);
        return <line key={`line-${index}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={BOARD_COLORS[command.color ?? "cyan"]} strokeWidth="5" strokeLinecap="round" />;
      })}
      {commands.filter((command): command is Extract<BoardCommand, { type: "drawTriangle" }> => command.type === "drawTriangle").map((command, index) => (
        <g key={`triangle-${index}`} stroke={BOARD_COLORS[command.color ?? "cyan"]} strokeWidth="5" fill="none" strokeLinejoin="round">
          <polygon points={command.points.map((point) => `${percentX(point.x)},${percentY(point.y)}`).join(" ")} />
          {command.points.map((point, pointIndex) => <text key={pointIndex} x={percentX(point.x)} y={percentY(point.y) - 12} fill="#0b1d3a" stroke="none" fontSize="18" fontWeight="700" textAnchor="middle">{point.label}</text>)}
          {command.labels?.map((label, labelIndex) => <text key={`label-${labelIndex}`} x="500" y={520 + labelIndex * 25} fill="#0b1d3a" stroke="none" fontSize="18" fontWeight="700" textAnchor="middle">{label}</text>)}
        </g>
      ))}
      {commands.filter((command) => command.type === "plotPoint").map((command, index) => {
        const point = scale(command.x, command.y);
        return <g key={`point-${index}`}><circle cx={point.x} cy={point.y} r="7" fill={BOARD_COLORS[command.color ?? "orange"]} /><text x={point.x + 10} y={point.y - 10} fill="#0b1d3a" fontSize="16" fontWeight="700">{command.label}</text></g>;
      })}
      {commands.filter((command) => command.type === "drawArrow").map((command, index) => <g key={`arrow-${index}`}><line x1={percentX(command.x1)} y1={percentY(command.y1)} x2={percentX(command.x2)} y2={percentY(command.y2)} stroke={BOARD_COLORS[command.color ?? "green"]} strokeWidth="4" markerEnd="url(#board-arrow)" /><text x={(percentX(command.x1) + percentX(command.x2)) / 2} y={(percentY(command.y1) + percentY(command.y2)) / 2 - 10} fill={BOARD_COLORS[command.color ?? "green"]} fontSize="17" textAnchor="middle" fontWeight="700">{command.label}</text></g>)}
      {commands.filter(isTextCommand).map((command, index) => <text key={`text-${index}`} x={percentX(command.x)} y={percentY(command.y)} fill={BOARD_COLORS[command.color ?? "navy"]} fontSize={command.size ?? (command.type === "formula" ? 24 : 18)} fontWeight={command.type === "formula" ? "700" : "600"} textAnchor={command.align === "left" ? "start" : command.align === "right" ? "end" : "middle"}>{command.text}</text>)}
    </svg>
  );
}

export function AiTutoringExperience({
  initialRoom = "landing",
  studentName = "",
}: {
  initialRoom?: "landing" | Room;
  studentName?: string;
}) {
  const [room, setRoom] = useState<"landing" | Room>(initialRoom);
  const [name, setName] = useState(studentName);
  const [subject, setSubject] = useState<Subject>("Math");
  const [topic, setTopic] = useState(TOPICS.Math[0]);
  const [activity, setActivity] = useState<SessionActivity>({ chatMessages: 0, whiteboardStrokes: 0, hasNotes: false });

  useEffect(() => {
    const saved = getSavedSetup();
    if (!saved) return;
    setName(saved.name || studentName);
    setSubject(saved.subject || "Math");
    setTopic(saved.topic || TOPICS[saved.subject || "Math"][0]);
  }, [studentName]);

  const enterWaitingRoom = () => {
    window.sessionStorage.setItem("nova-ai-tutoring", JSON.stringify({ name, subject, topic }));
    setRoom("waiting");
    window.history.replaceState(null, "", "/ai-tutoring/session");
  };

  if (room === "landing") {
    return (
      <TutoringLanding
        name={name}
        setName={setName}
        subject={subject}
        setSubject={setSubject}
        topic={topic}
        setTopic={setTopic}
        onEnter={enterWaitingRoom}
      />
    );
  }

  if (room === "waiting") {
    return (
      <WaitingRoom
        name={name || "Explorer"}
        subject={subject}
        topic={topic}
        onJoin={() => setRoom("classroom")}
      />
    );
  }

  if (room === "report") {
    return <SessionReport name={name || "Explorer"} subject={subject} topic={topic} activity={activity} onReturn={() => setRoom("landing")} />;
  }

  return <VirtualClassroom name={name || "Explorer"} subject={subject} topic={topic} onActivity={setActivity} onEnd={() => setRoom("report")} />;
}

function TutoringLanding({
  name,
  setName,
  subject,
  setSubject,
  topic,
  setTopic,
  onEnter,
}: {
  name: string;
  setName: (value: string) => void;
  subject: Subject;
  setSubject: (value: Subject) => void;
  topic: string;
  setTopic: (value: string) => void;
  onEnter: () => void;
}) {
  return (
    <main className="nova-container py-8 sm:py-12">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-nova-cyan hover:text-white">
        <NovaLogoIcon size="sm" /> NOVA AI Tutoring
      </Link>
      <section className="relative overflow-hidden rounded-[2rem] border border-nova-cyan/25 bg-[#071a31]/85 px-6 py-10 shadow-[0_0_80px_rgba(0,212,255,0.1)] sm:px-10 lg:px-14">
        <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-nova-cyan/10 blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-nova-cyan/30 bg-nova-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-nova-cyan">
              <Sparkles className="h-3.5 w-3.5" /> Grades 6–12 · Math & Science
            </p>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Your next breakthrough starts with a question.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-nova-cyan-light/85">
              Step into a focused 60-minute discovery session. Bring a tricky problem, an idea, or a “how does this work?”—NOVA helps you explore it one step at a time.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ["One-on-one space", "Your pace, your questions"],
                ["Math + Science", "Built for grades 6–12"],
                ["Private by design", "No recording enabled"],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-xs text-nova-cyan-light/70">{detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto flex w-full max-w-sm items-end justify-center rounded-[2rem] border border-nova-cyan/25 bg-gradient-to-b from-[#123b5d] to-[#071426] p-6">
            <div className="absolute inset-x-10 bottom-4 h-12 rounded-full bg-nova-cyan/30 blur-2xl" />
            <OrbitoRealGuide variantId="orbita" size="hero" animate={false} className="relative h-72 w-72" />
            <div className="absolute bottom-6 left-6 rounded-xl border border-nova-cyan/30 bg-[#071a31]/90 px-3 py-2">
              <p className="text-xs font-bold text-white">NOVA AI Tutor</p>
              <p className="text-[11px] text-nova-cyan">Ready for your mission</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-4xl rounded-3xl border border-white/10 bg-[#071426]/80 p-6 sm:p-8">
        <div className="mb-6 flex items-start gap-3">
          <span className="mt-0.5 rounded-xl bg-nova-cyan/15 p-2 text-nova-cyan"><CircleHelp className="h-5 w-5" /></span>
          <div>
            <h2 className="text-xl font-bold text-white">Set your discovery focus</h2>
            <p className="mt-1 text-sm text-nova-cyan-light/75">This setup stays in your browser for this session only.</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-white">
            Explorer name
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="What should NOVA call you?" className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-nova-cyan" />
          </label>
          <div>
            <p className="text-sm font-semibold text-white">Choose a realm</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["Math", "Science"] as Subject[]).map((item) => (
                <button key={item} type="button" onClick={() => { setSubject(item); setTopic(TOPICS[item][0]); }} className={cn("rounded-xl border px-4 py-3 text-sm font-bold transition", subject === item ? "border-nova-cyan bg-nova-cyan/15 text-nova-cyan" : "border-white/15 bg-white/5 text-white/75 hover:border-white/35")}>
                  {item === "Math" ? <Calculator className="mr-2 inline h-4 w-4" /> : <FlaskConical className="mr-2 inline h-4 w-4" />}{item}
                </button>
              ))}
            </div>
          </div>
          <label className="block text-sm font-semibold text-white sm:col-span-2">
            What are you exploring?
            <select value={topic} onChange={(event) => setTopic(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#0b1d32] px-4 py-3 text-white outline-none focus:border-nova-cyan">
              {TOPICS[subject].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-nova-cyan-light/75"><Clock3 className="h-4 w-4 text-nova-cyan" /> 60-minute virtual discovery session</p>
          <button type="button" onClick={onEnter} className="nova-btn-primary nova-btn-glow inline-flex items-center justify-center gap-2">
            Enter waiting room <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </main>
  );
}

function WaitingRoom({ name, subject, topic, onJoin }: { name: string; subject: Subject; topic: string; onJoin: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [camera, setCamera] = useState<"idle" | "on" | "blocked">("idle");
  const [mic, setMic] = useState(false);

  useEffect(() => () => streamRef.current?.getTracks().forEach((track) => track.stop()), []);
  const requestCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCamera("on");
    } catch {
      setCamera("blocked");
    }
  };

  return (
    <main className="nova-container py-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/ai-tutoring" className="inline-flex items-center gap-2 text-sm font-medium text-nova-cyan hover:text-white">← Edit session focus</Link>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_.85fr]">
          <section className="rounded-3xl border border-white/10 bg-[#071426]/85 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-nova-cyan">Mission launchpad</p>
            <h1 className="mt-2 text-3xl font-bold text-white">You&apos;re almost in, {name}.</h1>
            <p className="mt-3 text-nova-cyan-light/80">Check your setup, then join your private discovery space when you&apos;re ready.</p>
            <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-[#030b16]">
              {camera === "on" ? <video ref={videoRef} autoPlay muted playsInline className="aspect-video w-full object-cover" /> : <div className="flex aspect-video flex-col items-center justify-center p-6 text-center"><Camera className="mb-3 h-8 w-8 text-nova-cyan" /><p className="font-semibold text-white">Camera preview is optional</p><p className="mt-1 text-sm text-white/55">Turn it on only if you&apos;d like a browser preview.</p></div>}
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <button type="button" onClick={() => setMic(!mic)} className={cn("rounded-xl border p-3 text-left text-sm", mic ? "border-nova-green/50 bg-nova-green/10 text-nova-green" : "border-white/10 bg-white/5 text-white/75")}><span className="mb-1 block">{mic ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}</span>Mic {mic ? "ready" : "muted"}</button>
              <button type="button" onClick={requestCamera} className={cn("rounded-xl border p-3 text-left text-sm", camera === "on" ? "border-nova-green/50 bg-nova-green/10 text-nova-green" : "border-white/10 bg-white/5 text-white/75")}><Camera className="mb-1 h-4 w-4" />{camera === "blocked" ? "Camera blocked" : camera === "on" ? "Camera ready" : "Preview camera"}</button>
              <div className="rounded-xl border border-nova-green/30 bg-nova-green/10 p-3 text-sm text-nova-green"><Volume2 className="mb-1 h-4 w-4" />Speaker ready</div>
            </div>
          </section>
          <aside className="rounded-3xl border border-nova-cyan/20 bg-gradient-to-b from-[#0c2946] to-[#071426] p-6">
            <div className="flex items-center gap-2 text-sm font-bold text-nova-green"><Wifi className="h-4 w-4" /> Connection ready</div>
            <h2 className="mt-5 text-xl font-bold text-white">{subject} discovery session</h2>
            <p className="mt-1 text-sm text-nova-cyan">{topic}</p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3"><dt className="text-white/60">Explorer</dt><dd className="font-medium text-white">{name}</dd></div>
              <div className="flex justify-between border-b border-white/10 pb-3"><dt className="text-white/60">Duration</dt><dd className="font-medium text-white">60 minutes</dd></div>
              <div className="flex justify-between pb-1"><dt className="text-white/60">Session mode</dt><dd className="font-medium text-white">Browser-based</dd></div>
            </dl>
            <div className="mt-6 rounded-xl border border-white/10 bg-black/15 p-3 text-xs leading-relaxed text-white/65"><ShieldCheck className="mr-1 inline h-4 w-4 text-nova-cyan" /> Be kind, protect personal information, and ask for help when you need it. Optional test voice uses your browser only; NOVA does not record it.</div>
            <button type="button" onClick={onJoin} className="nova-btn-primary nova-btn-glow mt-6 flex w-full items-center justify-center gap-2">Join session <ChevronRight className="h-4 w-4" /></button>
          </aside>
        </div>
      </div>
    </main>
  );
}

function VirtualClassroom({ name, subject, topic, onActivity, onEnd }: { name: string; subject: Subject; topic: string; onActivity: Dispatch<SetStateAction<SessionActivity>>; onEnd: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const [seconds, setSeconds] = useState(60 * 60);
  const [chat, setChat] = useState<Message[]>([{ from: "tutor", text: `Welcome, ${name}. I’m Órbita. What would you like to investigate about ${topic}?` }]);
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [teachingBlock, setTeachingBlock] = useState<TeachingBlock>({
    explanation: `Welcome, ${name}. Tell me what you would like to explore, and we’ll take it one small step at a time.`,
    boardCommands: [],
    guidingQuestion: `What would you like to investigate about ${topic}?`,
    suggestedActions: ["I have a question"],
  });
  const [lessonState, setLessonState] = useState<TeachingState>({
    objective: `Explore ${topic}`,
    currentConcept: topic,
    currentStep: 0,
    studentUnderstanding: "starting",
    hintsCount: 0,
    nextGuidingQuestion: `What would you like to investigate about ${topic}?`,
    priorTutorBlock: "",
    lastLearnerMessage: "",
    selectedLearnerAction: "message",
  });
  const [isResponding, setIsResponding] = useState(false);
  const [chatError, setChatError] = useState("");
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((time) => Math.max(0, time - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    setVoiceSupported(Boolean(window.SpeechRecognition || window.webkitSpeechRecognition));
    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis.cancel();
    };
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const context = canvas.getContext("2d");
      if (!context) return;
      const image = context.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
      context.lineCap = "round"; context.lineJoin = "round"; context.strokeStyle = "#00d4ff"; context.lineWidth = 3;
      context.putImageData(image, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  const point = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };
  const startDraw = (event: PointerEvent<HTMLCanvasElement>) => {
    const context = canvasRef.current?.getContext("2d"); if (!context) return;
    drawing.current = true; onActivity((activity) => ({ ...activity, whiteboardStrokes: activity.whiteboardStrokes + 1 })); const { x, y } = point(event); context.beginPath(); context.moveTo(x, y); event.currentTarget.setPointerCapture(event.pointerId);
  };
  const draw = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return; const context = canvasRef.current?.getContext("2d"); if (!context) return;
    const { x, y } = point(event); context.lineTo(x, y); context.stroke();
  };
  const sendMessage = async (guidedMessage?: string, selectedLearnerAction: LearnerAction = "message") => {
    const text = (guidedMessage ?? message).trim();
    if (!text || isResponding) return;

    const history = chat.slice(-6).map((item) => ({ role: item.from === "tutor" ? "tutor" as const : "explorer" as const, text: item.text }));
    const requestLessonState: TeachingState = {
      ...lessonState,
      priorTutorBlock: `${teachingBlock.explanation} ${teachingBlock.guidingQuestion}`.slice(0, 700),
      lastLearnerMessage: text.slice(0, 500),
      selectedLearnerAction,
      hintsCount: selectedLearnerAction === "hint" ? Math.min(10, lessonState.hintsCount + 1) : lessonState.hintsCount,
      studentUnderstanding: selectedLearnerAction === "understood" || selectedLearnerAction === "continue"
        ? "confident"
        : selectedLearnerAction === "hint" || selectedLearnerAction === "slower"
          ? "needs-support"
          : lessonState.studentUnderstanding,
    };
    setChat((items) => [...items, { from: "explorer", text }]);
    onActivity((activity) => ({ ...activity, chatMessages: activity.chatMessages + 1 }));
    if (!guidedMessage) setMessage("");
    setChatError("");
    setIsResponding(true);
    setIsAwaitingResponse(false);

    try {
      const response = await fetch("/api/ai-tutoring/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, subject, topic, context: history, lessonState: requestLessonState }),
      });
      const rawData: unknown = await response.json();
      const responseError = rawData && typeof rawData === "object" ? rawData as { error?: unknown; code?: unknown } : {};
      const data = normalizeTutorResponse(rawData);
      if (!response.ok || !data || !data.reply) {
        if (responseError.code === "GEMINI_NOT_CONFIGURED") {
          throw new Error("Gemini not configured. Add GEMINI_API_KEY to local server environment, then try again.");
        }
        throw new Error(typeof responseError.error === "string" ? responseError.error : "Órbita could not respond right now.");
      }
      setChat((items) => [...items, { from: "tutor", text: data.reply }]);
      setTeachingBlock(data.teachingBlock);
      if (data.providerMessage) setChatError(data.providerMessage);
      setIsAwaitingResponse(true);
      setLessonState(data.lessonState ?? {
        ...requestLessonState,
        currentStep: requestLessonState.currentStep + 1,
        currentConcept: data.teachingBlock.guidingQuestion,
        nextGuidingQuestion: data.teachingBlock.guidingQuestion,
        priorTutorBlock: data.teachingBlock.explanation,
      });
    } catch (error) {
      setChatError(error instanceof Error ? error.message : "Órbita could not respond right now.");
    } finally {
      setIsResponding(false);
    }
  };
  const speakWithOrbita = () => {
    if (!teachingBlock.explanation || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(plainTutorText(teachingBlock.explanation));
    utterance.rate = 0.95;
    utterance.onend = () => { setIsListening(false); setIsAwaitingResponse(true); };
    window.speechSynthesis.speak(utterance);
  };
  const stopSpeaking = () => window.speechSynthesis.cancel();
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }
    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Recognition) {
      setChatError("Listening is not supported in this browser. Try Chrome or Edge, or type your question.");
      return;
    }
    if (!recognitionRef.current) {
      const recognition = new Recognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.onresult = (event) => {
        let transcript = "";
        for (let index = event.resultIndex; index < event.results.length; index += 1) {
          transcript += event.results[index][0]?.transcript ?? "";
        }
        setMessage(transcript.trim());
      };
      recognition.onerror = (event) => {
        setIsListening(false);
        setChatError(event.error === "not-allowed" ? "Microphone permission was not granted. You can still type your question." : "Listening stopped. Please try again or type your question.");
      };
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
    setChatError("");
    setIsListening(true);
    recognitionRef.current.start();
  };
  const calculate = () => {
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) { setResult("Use numbers and + − × ÷ ( ) only."); return; }
    try { setResult(String(Function(`"use strict"; return (${expression})`)())); } catch { setResult("Check that expression and try again."); }
  };
  return (
    <main className="min-h-screen bg-[#030b16]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#071426]/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3"><NovaLogoIcon size="sm" /><div><p className="font-bold text-white">NOVA AI Tutoring</p><p className="text-xs text-nova-cyan">{subject} · {topic}</p></div></div>
          <div className="rounded-full border border-nova-cyan/30 bg-nova-cyan/10 px-4 py-2 font-mono text-sm font-bold text-nova-cyan"><Clock3 className="mr-2 inline h-4 w-4" />{formatTime(seconds)} remaining</div>
          <button type="button" onClick={onEnd} className="rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:border-nova-cyan hover:text-nova-cyan">End session</button>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1600px] gap-4 p-4 lg:grid-cols-[250px_minmax(0,1fr)_290px]">
        <aside className="rounded-2xl border border-white/10 bg-[#071426] p-4">
          <div className="flex items-start gap-3"><OrbitoRealGuide variantId="orbita" size="md" animate={false} className="h-24 w-24" /><div><p className="font-bold text-white">Órbita</p><p className="mt-1 text-xs font-semibold text-nova-green">● Ready to guide</p></div></div>
          <div className="mt-4 rounded-xl border border-nova-cyan/30 bg-nova-cyan/10 p-3 text-xs leading-relaxed text-nova-cyan"><Sparkles className="mr-1 inline h-4 w-4" /> One idea at a time. Browser voice is optional and nothing is recorded by NOVA.</div>
          <div className="mt-4 border-t border-white/10 pt-4"><p className="text-xs font-bold uppercase tracking-wider text-white/50">Your mission</p><p className="mt-2 text-sm font-semibold text-white">{lessonState.objective}</p><p className="mt-1 text-xs text-white/60">Step {lessonState.currentStep + 1} · {lessonState.currentConcept}</p></div>
        </aside>
        <section className="min-w-0 rounded-2xl border border-white/10 bg-[#f8fcff] p-3 shadow-inner">
          <div className="mb-3 flex items-center justify-between text-[#0b1d3a]"><div className="flex items-center gap-2 font-bold"><Pencil className="h-4 w-4 text-[#007da0]" /> Interactive whiteboard</div><button type="button" onClick={() => { const canvas = canvasRef.current; if (canvas) canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height); }} className="rounded-lg border border-[#0b1d3a]/20 px-2 py-1 text-xs font-semibold hover:bg-[#dff8ff]"><Eraser className="mr-1 inline h-3.5 w-3.5" />Clear</button></div>
          <div className="relative overflow-hidden rounded-xl">
            <canvas ref={canvasRef} onPointerDown={startDraw} onPointerMove={draw} onPointerUp={() => { drawing.current = false; }} onPointerLeave={() => { drawing.current = false; }} className="h-[350px] w-full touch-none rounded-xl bg-[linear-gradient(#dcecf5_1px,transparent_1px),linear-gradient(90deg,#dcecf5_1px,transparent_1px)] bg-[size:24px_24px] cursor-crosshair sm:h-[510px]" aria-label="Interactive whiteboard. Draw using a pointer or mouse." />
            <TeachingBoard commands={teachingBlock.boardCommands} />
          </div>
          <div className="mt-3 rounded-xl border border-[#007da0]/20 bg-[#eaf8fc] p-3 text-sm text-[#0b1d3a]"><p className="font-bold text-[#007da0]">Órbita&apos;s current idea</p><p className="mt-1 leading-relaxed">{teachingBlock.explanation}</p><p className="mt-2 font-semibold">{teachingBlock.guidingQuestion}</p></div>
        </section>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#071426] p-4">
            <p className="mb-3 flex items-center gap-2 font-bold text-white"><MessageCircle className="h-4 w-4 text-nova-cyan" /> Chat with Órbita</p>
            <div className="h-40 space-y-2 overflow-y-auto pr-1">
              {chat.map((item, index) => <div key={`${item.text}-${index}`} className={cn("rounded-xl px-3 py-2 text-xs leading-relaxed", item.from === "explorer" ? "ml-5 bg-nova-cyan/15 text-white" : "mr-4 bg-white/10 text-white/75")}>{item.text}</div>)}
              {isResponding && <div className="mr-4 rounded-xl bg-white/10 px-3 py-2 text-xs text-white/75">Órbita is thinking…</div>}
            </div>
            {chatError && <p role="alert" className="mt-2 text-xs text-nova-orange">{chatError}</p>}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => void sendMessage("Continue to the next small step.", "continue")} disabled={isResponding} className="col-span-2 rounded-lg bg-nova-green/20 px-2 py-2 text-xs font-bold text-nova-green hover:bg-nova-green/30 disabled:opacity-60">I got it — continue</button>
              <button type="button" onClick={() => void sendMessage("Please give one hint for this exact step.", "hint")} disabled={isResponding} className="rounded-lg border border-nova-cyan/40 px-2 py-2 text-xs font-semibold text-nova-cyan disabled:opacity-60">Show me a hint</button>
              <button type="button" onClick={() => void sendMessage("Please explain this same step in a different way.", "different-explanation")} disabled={isResponding} className="rounded-lg border border-white/20 px-2 py-2 text-xs font-semibold text-white disabled:opacity-60">Explain differently</button>
              <button type="button" onClick={() => { setMessage("I have a question: "); }} className="rounded-lg border border-white/20 px-2 py-2 text-xs font-semibold text-white">I have a question</button>
              <button type="button" onClick={() => void sendMessage("Please slow down and restate this step in smaller pieces.", "slower")} disabled={isResponding} className="rounded-lg border border-white/20 px-2 py-2 text-xs font-semibold text-white disabled:opacity-60">Slow down</button>
            </div>
            <div className="mt-3 flex gap-2">
              <input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void sendMessage(); }} disabled={isResponding} placeholder="Ask or share an idea…" className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-2 py-2 text-xs text-white outline-none placeholder:text-white/35 focus:border-nova-cyan disabled:opacity-60" />
              <button type="button" onClick={() => void sendMessage()} disabled={isResponding} aria-label="Send message" className="rounded-lg bg-nova-cyan p-2 text-[#061321] disabled:opacity-60"><Send className="h-4 w-4" /></button>
            </div>
            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="text-[11px] font-semibold text-nova-cyan">Test voice (browser) {voiceSupported ? "· Ready" : "· Unsupported"}</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button type="button" onClick={speakWithOrbita} className="rounded-lg border border-nova-cyan/40 px-2 py-2 text-xs font-semibold text-nova-cyan hover:bg-nova-cyan/10"><Volume2 className="mr-1 inline h-3.5 w-3.5" />Speak with Órbita</button>
                <button type="button" onClick={stopSpeaking} className="rounded-lg border border-white/20 px-2 py-2 text-xs font-semibold text-white/80 hover:border-white/50"><StopCircle className="mr-1 inline h-3.5 w-3.5" />Stop speaking</button>
                <button type="button" onClick={toggleListening} className={cn("col-span-2 rounded-lg border px-2 py-2 text-xs font-semibold", isListening ? "border-nova-orange/60 bg-nova-orange/10 text-nova-orange" : "border-white/20 text-white/80 hover:border-nova-cyan")}><Mic className="mr-1 inline h-3.5 w-3.5" />{isListening ? "Stop listening" : "Listen"} {isListening ? "— recording your voice…" : "— tap to start"}</button>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-white/50">{isListening || isAwaitingResponse ? "Órbita is listening for your thinking…" : "After Órbita speaks, share your thinking by voice or chat. Your transcript appears for review before sending."}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#071426] p-4"><p className="flex items-center gap-2 font-bold text-white"><BookOpen className="h-4 w-4 text-nova-cyan" /> Explorer notes</p><textarea value={note} onChange={(event) => { setNote(event.target.value); onActivity((activity) => ({ ...activity, hasNotes: event.target.value.trim().length > 0 })); }} placeholder="Capture an idea, a question, or your next step…" className="mt-3 h-20 w-full resize-none rounded-lg border border-white/15 bg-white/5 p-2 text-xs text-white outline-none placeholder:text-white/35 focus:border-nova-cyan" /></div>
          <div className="rounded-2xl border border-white/10 bg-[#071426] p-4"><p className="flex items-center gap-2 font-bold text-white"><Calculator className="h-4 w-4 text-nova-cyan" /> Quick calculator</p><div className="mt-3 flex gap-2"><input value={expression} onChange={(event) => setExpression(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") calculate(); }} placeholder="e.g. (12 + 8) / 2" className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-2 py-2 text-xs text-white outline-none focus:border-nova-cyan" /><button type="button" onClick={calculate} className="rounded-lg border border-nova-cyan/50 px-2 text-xs font-bold text-nova-cyan">=</button></div>{result && <p className="mt-2 text-xs text-nova-cyan-light">{result}</p>}</div>
          <div className="rounded-2xl border border-white/10 bg-[#071426] p-4 text-xs text-white/65"><Maximize2 className="mr-1 inline h-4 w-4 text-nova-cyan" /> Formula and science reference packs will connect here when curriculum resources are configured.</div>
        </aside>
      </div>
    </main>
  );
}

function SessionReport({ name, subject, topic, activity, onReturn }: { name: string; subject: Subject; topic: string; activity: SessionActivity; onReturn: () => void }) {
  return (
    <main className="nova-container py-12">
      <section className="mx-auto max-w-2xl rounded-3xl border border-nova-cyan/20 bg-[#071426]/90 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-nova-cyan/15 text-nova-cyan"><Check className="h-8 w-8" /></div>
        <p className="mt-6 text-sm font-bold uppercase tracking-wider text-nova-cyan">Session complete</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Nice exploration, {name}.</h1>
        <p className="mx-auto mt-3 max-w-lg text-nova-cyan-light/80">Your {subject.toLowerCase()} discovery focused on <strong className="text-white">{topic}</strong>. This is a local session recap, not an assessment or a record of mastery.</p>
        <div className="mt-8 grid gap-3 text-left sm:grid-cols-3"><div className="rounded-xl bg-white/5 p-4"><Clock3 className="h-5 w-5 text-nova-cyan" /><p className="mt-2 text-sm font-semibold text-white">Session timer</p><p className="text-xs text-white/60">Tracked in this browser</p></div><div className="rounded-xl bg-white/5 p-4"><Pencil className="h-5 w-5 text-nova-cyan" /><p className="mt-2 text-sm font-semibold text-white">Whiteboard</p><p className="text-xs text-white/60">{activity.whiteboardStrokes ? `${activity.whiteboardStrokes} drawing ${activity.whiteboardStrokes === 1 ? "start" : "starts"}` : "No marks captured"}</p></div><div className="rounded-xl bg-white/5 p-4"><MessageCircle className="h-5 w-5 text-nova-cyan" /><p className="mt-2 text-sm font-semibold text-white">Your activity</p><p className="text-xs text-white/60">{activity.chatMessages} chat {activity.chatMessages === 1 ? "message" : "messages"}{activity.hasNotes ? " · notes added" : ""}</p></div></div>
        <p className="mt-6 text-xs text-white/50"><Lock className="mr-1 inline h-3.5 w-3.5" /> This foundation does not save recordings, voice, or session data to NOVA.</p>
        <button type="button" onClick={onReturn} className="nova-btn-primary nova-btn-glow mt-7">Plan another discovery</button>
      </section>
    </main>
  );
}
