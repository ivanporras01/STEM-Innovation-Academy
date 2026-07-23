"use client";

import { useEffect, useRef, useState } from "react";
import type { Dispatch, PointerEvent, SetStateAction } from "react";
import {
  ArrowRight,
  Calculator,
  Check,
  Eraser,
  FlaskConical,
  Lock,
  MessageCircle,
  Mic,
  Pencil,
  StopCircle,
  Volume2,
  Wrench,
} from "lucide-react";
import { OrbitoRealGuide } from "@/components/orbit/orbito-real-guide";
import { worldToSvg } from "@/lib/ai-tutoring-graph";
import {
  mergeSuggestedActions,
  type LearnerAction,
  type SuggestedAction,
} from "@/lib/ai-tutoring-pedagogy";
import { ensureOrbitaVoicesLoaded, getOrbitaVoice, speakWithOrbitaVoice } from "@/lib/orbita-voice";
import { cn } from "@/lib/utils";

type Subject = "Math" | "Science";
type Room = "classroom" | "report";
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
type OrbitaStatus = "ready" | "thinking" | "celebrating";
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
  Math: ["Algebra & equations", "Geometry", "Pre-algebra", "Statistics & probability", "Functions & advanced algebra"],
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
  const percentX = (value: number) => (value / 100) * BOARD_WIDTH;
  const percentY = (value: number) => (value / 100) * BOARD_HEIGHT;
  const graphCommandsPresent = commands.some((command) => ["drawAxes", "plotPoint", "drawLine"].includes(command.type));
  const axisCommands = commands.filter((command): command is Extract<BoardCommand, { type: "drawAxes" }> => command.type === "drawAxes");
  const visibleAxes = axisCommands.length ? axisCommands : graphCommandsPresent ? [axes] : [];
  const textCommands = commands.filter(isTextCommand);
  const hasVisual = textCommands.length > 0 || graphCommandsPresent || commands.some((command) => command.type === "drawTriangle" || command.type === "drawArrow" || command.type === "highlight");

  return (
    <svg viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`} preserveAspectRatio="xMidYMid meet" className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-label="Órbita's structured teaching board">
      <defs><marker id="board-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#07836b" /></marker></defs>
      {!hasVisual && (
        <text x={BOARD_WIDTH / 2} y={BOARD_HEIGHT / 2} fill="#7a92a8" fontSize="22" textAnchor="middle">
          Órbita will write the problem here as you chat
        </text>
      )}
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
      {textCommands.map((command, index) => {
        const x = percentX(command.x);
        const y = percentY(command.y);
        const fontSize = Math.max(command.size ?? (command.type === "formula" ? 34 : 22), command.type === "formula" ? 30 : 20);
        const anchor = command.align === "left" ? "start" : command.align === "right" ? "end" : "middle";
        const approxWidth = Math.min(BOARD_WIDTH - 80, Math.max(180, command.text.length * fontSize * 0.55));
        const boxX = anchor === "middle" ? x - approxWidth / 2 : anchor === "end" ? x - approxWidth : x;
        return (
          <g key={`text-${index}`}>
            <rect x={boxX - 12} y={y - fontSize} width={approxWidth + 24} height={fontSize + 18} rx="12" fill="#ffffff" opacity="0.92" />
            <text x={x} y={y} fill={BOARD_COLORS[command.color ?? "navy"]} fontSize={fontSize} fontWeight={command.type === "formula" ? 800 : 650} textAnchor={anchor}>
              {command.text}
            </text>
          </g>
        );
      })}
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
  // Never accept the removed waiting-room state — always open the live classroom.
  const [room, setRoom] = useState<"landing" | Room>(
    initialRoom === "classroom" || initialRoom === "report" ? initialRoom : initialRoom === "landing" ? "landing" : "classroom",
  );
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

  const startTutoringSession = () => {
    window.sessionStorage.setItem("nova-ai-tutoring", JSON.stringify({ name, subject, topic }));
    window.location.assign("/ai-tutoring/session");
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
        onEnter={startTutoringSession}
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
    <main className="nova-container py-10 sm:py-14">
      <p className="mb-6 text-sm font-semibold text-nova-cyan">NOVA AI Tutoring · Órbita</p>
      <section className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-[#071426]/90 p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-4">
          <OrbitoRealGuide variantId="orbita" size="md" animate={false} className="h-20 w-20 shrink-0" />
          <div>
            <h1 className="text-2xl font-bold text-white">Quiet tutoring space</h1>
            <p className="mt-1 text-sm text-nova-cyan-light/80">Math &amp; Science · grades 6–12. One question, one step.</p>
          </div>
        </div>
        <div className="grid gap-4">
          <label className="block text-sm font-semibold text-white">
            Your name
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="First name" className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-nova-cyan" />
          </label>
          <div>
            <p className="text-sm font-semibold text-white">Subject</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["Math", "Science"] as Subject[]).map((item) => (
                <button key={item} type="button" onClick={() => { setSubject(item); setTopic(TOPICS[item][0]); }} className={cn("rounded-xl border px-4 py-3 text-sm font-bold transition", subject === item ? "border-nova-cyan bg-nova-cyan/15 text-nova-cyan" : "border-white/15 bg-white/5 text-white/75 hover:border-white/35")}>
                  {item === "Math" ? <Calculator className="mr-2 inline h-4 w-4" /> : <FlaskConical className="mr-2 inline h-4 w-4" />}{item}
                </button>
              ))}
            </div>
          </div>
          <label className="block text-sm font-semibold text-white">
            Topic
            <select value={topic} onChange={(event) => setTopic(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#0b1d32] px-4 py-3 text-white outline-none focus:border-nova-cyan">
              {TOPICS[subject].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <button type="button" onClick={onEnter} className="nova-btn-primary nova-btn-glow mt-6 inline-flex w-full items-center justify-center gap-2">
          Start tutoring <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </main>
  );
}

function VirtualClassroom({ name, subject, topic, onActivity, onEnd }: { name: string; subject: Subject; topic: string; onActivity: Dispatch<SetStateAction<SessionActivity>>; onEnd: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const replyInputRef = useRef<HTMLInputElement>(null);
  const [seconds, setSeconds] = useState(60 * 60);
  const [chat, setChat] = useState<Message[]>([{ from: "tutor", text: `Hi ${name}—I’m Órbita. Paste your ${subject} problem and we’ll take one step at a time.` }]);
  const [message, setMessage] = useState("");
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [showTools, setShowTools] = useState(false);
  const [teachingBlock, setTeachingBlock] = useState<TeachingBlock>({
    explanation: `Hi ${name}—I’m Órbita. Share your Math or Science problem and we’ll take one clear step together.`,
    boardCommands: [],
    guidingQuestion: `What ${topic} question should we tackle first?`,
    suggestedActions: ["I have a question", "I'm stuck on a problem", "Show me a hint"],
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
  const [orbitaVolume, setOrbitaVolume] = useState(0.9);
  const [isListening, setIsListening] = useState(false);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(true);
  const [orbitaStatus, setOrbitaStatus] = useState<OrbitaStatus>("ready");
  const [showBreakthrough, setShowBreakthrough] = useState(false);
  const suggestedActions = mergeSuggestedActions(teachingBlock.suggestedActions).slice(0, 3);

  const triggerBreakthrough = () => {
    setShowBreakthrough(true);
    setOrbitaStatus("celebrating");
    window.setTimeout(() => {
      setShowBreakthrough(false);
      setOrbitaStatus("ready");
    }, 3200);
  };

  const orbitaStatusLabel = orbitaStatus === "thinking"
    ? "Órbita is thinking…"
    : orbitaStatus === "celebrating"
      ? "Breakthrough!"
      : isListening || isAwaitingResponse
        ? "Órbita is listening for your thinking…"
        : "Órbita is ready for your next move";

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((time) => Math.max(0, time - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    setVoiceSupported(Boolean(window.SpeechRecognition || window.webkitSpeechRecognition));
    const unloadOrbitaVoices = ensureOrbitaVoicesLoaded(() => {
      getOrbitaVoice();
    });
    try {
      const savedVolume = Number(window.sessionStorage.getItem("nova-orbita-volume"));
      if (Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 1) {
        setOrbitaVolume(savedVolume);
      }
    } catch {
      // ignore storage errors
    }
    return () => {
      unloadOrbitaVoices();
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
    setOrbitaStatus("thinking");

    const wasNeedsSupport = lessonState.studentUnderstanding === "needs-support" || lessonState.studentUnderstanding === "thinking";
    let celebrate = false;

    try {
      const response = await fetch("/api/ai-tutoring/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, subject, topic, explorerName: name, context: history, lessonState: requestLessonState }),
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
      const nextBlock = data.teachingBlock.boardCommands.some((command) => command.type === "write" || command.type === "formula")
        ? data.teachingBlock
        : {
            ...data.teachingBlock,
            boardCommands: [
              { type: "clear" as const },
              {
                type: "formula" as const,
                text: (data.teachingBlock.explanation.match(/[0-9a-zA-Z(][^=≤≥<>]{0,40}[=≤≥<>]{1,2}[^.]{0,40}/)?.[0] || data.reply).slice(0, 80),
                x: 50,
                y: 36,
                color: "navy" as const,
                size: 34,
              },
            ],
          };
      setTeachingBlock(nextBlock);
      if (data.providerMessage) setChatError(data.providerMessage);
      setIsAwaitingResponse(true);

      const nextLessonState = data.lessonState ?? {
        ...requestLessonState,
        currentStep: requestLessonState.currentStep + 1,
        currentConcept: data.teachingBlock.guidingQuestion,
        nextGuidingQuestion: data.teachingBlock.guidingQuestion,
        priorTutorBlock: data.teachingBlock.explanation,
      };
      setLessonState(nextLessonState);

      // Keep the conversation feeling live: speak the step, then focus the reply box.
      const speech = `${plainTutorText(data.teachingBlock.explanation)} ${plainTutorText(data.teachingBlock.guidingQuestion)}`.trim();
      if (speech) {
        speakWithOrbitaVoice(speech, {
          volume: orbitaVolume,
          onEnd: () => {
            setIsAwaitingResponse(true);
            replyInputRef.current?.focus();
          },
        });
      } else {
        window.setTimeout(() => replyInputRef.current?.focus(), 50);
      }

      const replyLooksCorrect = /\b(yes|correct|nice|breakthrough|exactly|right|well done|great job|good start)\b/i.test(data.reply);
      const becameConfident = nextLessonState.studentUnderstanding === "confident" && wasNeedsSupport;
      if (replyLooksCorrect || becameConfident) {
        celebrate = true;
        triggerBreakthrough();
      }
    } catch (error) {
      setChatError(error instanceof Error ? error.message : "Órbita could not respond right now.");
    } finally {
      setIsResponding(false);
      if (!celebrate) setOrbitaStatus("ready");
    }
  };
  const handleSuggestedAction = (action: SuggestedAction) => {
    if (action.action === "message" && !action.message?.includes("question")) {
      void sendMessage(action.message ?? action.label, "message");
      return;
    }
    if (action.action === "message") {
      setMessage("I have a question: ");
      return;
    }
    void sendMessage(action.message ?? action.label, action.action);
  };
  const speakWithOrbita = () => {
    if (!teachingBlock.explanation || !("speechSynthesis" in window)) return;
    const explanation = plainTutorText(teachingBlock.explanation);
    const question = plainTutorText(teachingBlock.guidingQuestion);
    const speech = question ? `${explanation} ${question}` : explanation;
    speakWithOrbitaVoice(speech, {
      volume: orbitaVolume,
      onEnd: () => {
        setIsListening(false);
        setIsAwaitingResponse(true);
      },
    });
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
    const raw = expression.trim();
    if (!raw) {
      setResult("");
      return;
    }
    const normalized = raw
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/√\s*\(/g, "Math.sqrt(")
      .replace(/√\s*(-?\d+(?:\.\d+)?)/g, "Math.sqrt($1)")
      .replace(/(\d+(?:\.\d+)?)\s*\^\s*(\d+(?:\.\d+)?)/g, "Math.pow($1,$2)")
      .replace(/\^/g, "**");
    if (!/^[0-9+\-*/().\sMathpowsqrt,]+$/.test(normalized)) {
      setResult("Use numbers, + − × ÷ ( ), ^, or √");
      return;
    }
    try {
      // eslint-disable-next-line no-new-func
      const value = Function(`"use strict"; return (${normalized})`)();
      if (typeof value !== "number" || !Number.isFinite(value)) {
        setResult("Check that expression and try again.");
        return;
      }
      setResult(Number.isInteger(value) ? String(value) : String(Math.round(value * 1_000_000) / 1_000_000));
    } catch {
      setResult("Check that expression and try again.");
    }
  };
  const insertCalc = (snippet: string) => {
    setExpression((current) => `${current}${snippet}`);
  };
  return (
    <main className="min-h-screen bg-[#030b16]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#071426]/95 px-4 py-2.5 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">Órbita · {subject}</p>
            <p className="truncate text-[11px] text-white/50">{topic}</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={speakWithOrbita} aria-label="Speak" className="rounded-lg border border-white/15 p-2 text-nova-cyan hover:bg-white/5" title="Speak">
              <Volume2 className="h-4 w-4" />
            </button>
            <button type="button" onClick={stopSpeaking} aria-label="Stop speaking" className="rounded-lg border border-white/15 p-2 text-white/70 hover:bg-white/5" title="Stop">
              <StopCircle className="h-4 w-4" />
            </button>
            {voiceSupported && (
              <button
                type="button"
                onClick={toggleListening}
                aria-label={isListening ? "Stop listening" : "Listen"}
                className={cn("rounded-lg border p-2", isListening ? "border-nova-orange/50 text-nova-orange" : "border-white/15 text-white/70 hover:bg-white/5")}
                title={isListening ? "Stop mic" : "Mic"}
              >
                <Mic className="h-4 w-4" />
              </button>
            )}
            <span className="hidden rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/70 sm:inline">{formatTime(seconds)}</span>
            <button type="button" onClick={onEnd} className="rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 hover:border-nova-cyan hover:text-nova-cyan">
              End
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-4xl flex-col gap-3 p-3 sm:p-4">
        <section className="rounded-2xl border border-white/10 bg-[#f8fcff] p-3 shadow-inner">
          {showBreakthrough && (
            <p className="mb-2 text-center text-sm font-semibold text-[#07836b]">Nice work — keep going.</p>
          )}
          <div className="mb-2 flex items-center justify-between text-[#0b1d3a]">
            <p className="text-sm font-bold">Board</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowTools((open) => !open)}
                className={cn("rounded-lg border px-2 py-1 text-xs font-semibold", showTools ? "border-[#007da0] bg-[#eaf8fc] text-[#007da0]" : "border-[#0b1d3a]/20 hover:bg-[#dff8ff]")}
              >
                <Wrench className="mr-1 inline h-3.5 w-3.5" />
                Calc
              </button>
              <button
                type="button"
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (canvas) canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
                }}
                className="rounded-lg border border-[#0b1d3a]/20 px-2 py-1 text-xs font-semibold hover:bg-[#dff8ff]"
              >
                <Eraser className="mr-1 inline h-3.5 w-3.5" />
                Clear
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <canvas
              ref={canvasRef}
              onPointerDown={startDraw}
              onPointerMove={draw}
              onPointerUp={() => { drawing.current = false; }}
              onPointerLeave={() => { drawing.current = false; }}
              className="h-[280px] w-full touch-none rounded-xl bg-[linear-gradient(#dcecf5_1px,transparent_1px),linear-gradient(90deg,#dcecf5_1px,transparent_1px)] bg-[size:24px_24px] cursor-crosshair sm:h-[420px]"
              aria-label="Interactive whiteboard"
            />
            <TeachingBoard commands={teachingBlock.boardCommands} />
          </div>

          {showTools && (
            <div className="mt-3 rounded-xl border border-[#007da0]/20 bg-white p-3">
              <p className="text-xs font-semibold text-[#007da0]">Quick calculator</p>
              <div className="mt-2 flex gap-2">
                <input
                  value={expression}
                  onChange={(event) => setExpression(event.target.value)}
                  onKeyDown={(event) => { if (event.key === "Enter") calculate(); }}
                  placeholder="e.g. 46 - 7 or √39"
                  className="min-w-0 flex-1 rounded-lg border border-[#007da0]/20 px-3 py-2 text-sm text-[#0b1d3a] outline-none focus:border-[#007da0]"
                />
                <button type="button" onClick={calculate} className="rounded-lg bg-[#007da0] px-3 text-sm font-bold text-white">=</button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  { label: "−", insert: "-" },
                  { label: "+", insert: "+" },
                  { label: "×", insert: "×" },
                  { label: "÷", insert: "÷" },
                  { label: "^2", insert: "^2" },
                  { label: "√", insert: "√(" },
                ].map((button) => (
                  <button
                    key={button.label}
                    type="button"
                    onClick={() => insertCalc(button.insert)}
                    className="rounded-md border border-[#0b1d3a]/15 px-2 py-1 text-xs font-semibold text-[#0b1d3a]/80 hover:border-[#007da0]"
                  >
                    {button.label}
                  </button>
                ))}
              </div>
              {result && <p className="mt-2 text-sm font-semibold text-[#007da0]">= {result}</p>}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#071426] p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-nova-cyan">Órbita</p>
              <p className="mt-1 text-sm leading-relaxed text-white/90">{teachingBlock.explanation}</p>
              <p className="mt-2 text-sm font-semibold text-white">{teachingBlock.guidingQuestion}</p>
            </div>
            {orbitaStatus === "thinking" && <p className="shrink-0 text-xs text-nova-cyan">Thinking…</p>}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              ref={replyInputRef}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void sendMessage();
              }}
              disabled={isResponding}
              placeholder="Your next step…"
              className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-nova-cyan disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => void sendMessage()}
              disabled={isResponding || !message.trim()}
              className="nova-btn-primary px-4 py-3 font-bold disabled:opacity-60"
            >
              Send
            </button>
          </div>

          {suggestedActions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestedActions.map((action) => (
                <button
                  key={`${action.action}-${action.label}`}
                  type="button"
                  onClick={() => handleSuggestedAction(action)}
                  disabled={isResponding}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 hover:border-nova-cyan hover:text-nova-cyan disabled:opacity-60"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {chatError && <p role="alert" className="mt-3 text-xs text-nova-orange">{chatError}</p>}
          <p className="mt-3 text-[11px] text-white/40">{orbitaStatusLabel}</p>

          <details className="mt-3 border-t border-white/10 pt-3">
            <summary className="cursor-pointer text-xs font-semibold text-white/50 hover:text-white/70">Recent messages</summary>
            <div className="mt-2 max-h-32 space-y-2 overflow-y-auto">
              {chat.slice(-6).map((item, index) => (
                <p key={`${item.text}-${index}`} className={cn("rounded-lg px-2 py-1.5 text-xs leading-relaxed", item.from === "explorer" ? "bg-nova-cyan/15 text-white" : "bg-white/5 text-white/70")}>
                  {item.text}
                </p>
              ))}
            </div>
            <label className="mt-3 flex items-center gap-2 text-[11px] text-white/50">
              <span>Vol</span>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(orbitaVolume * 100)}
                onChange={(event) => {
                  const next = Number(event.target.value) / 100;
                  setOrbitaVolume(next);
                  try {
                    window.sessionStorage.setItem("nova-orbita-volume", String(next));
                  } catch {
                    // ignore
                  }
                }}
                className="h-1.5 w-28 accent-nova-cyan"
                aria-label="Volume"
              />
            </label>
          </details>
        </section>
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
        <h1 className="mt-2 text-3xl font-bold text-white">Nice work, {name}.</h1>
        <p className="mx-auto mt-3 max-w-lg text-nova-cyan-light/80">Your {subject.toLowerCase()} session focused on <strong className="text-white">{topic}</strong> (grades 6–12). This is a local recap only—not a grade or mastery record.</p>
        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2"><div className="rounded-xl bg-white/5 p-4"><Pencil className="h-5 w-5 text-nova-cyan" /><p className="mt-2 text-sm font-semibold text-white">Whiteboard</p><p className="text-xs text-white/60">{activity.whiteboardStrokes ? `${activity.whiteboardStrokes} drawing ${activity.whiteboardStrokes === 1 ? "start" : "starts"}` : "No marks captured"}</p></div><div className="rounded-xl bg-white/5 p-4"><MessageCircle className="h-5 w-5 text-nova-cyan" /><p className="mt-2 text-sm font-semibold text-white">Your replies</p><p className="text-xs text-white/60">{activity.chatMessages} {activity.chatMessages === 1 ? "message" : "messages"}</p></div></div>
        <p className="mt-6 text-xs text-white/50"><Lock className="mr-1 inline h-3.5 w-3.5" /> This session does not save recordings, voice, or data to NOVA.</p>
        <button type="button" onClick={onReturn} className="nova-btn-primary nova-btn-glow mt-7">Start another session</button>
      </section>
    </main>
  );
}
