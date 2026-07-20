import { pointIsOnSlopeInterceptLine, slopeBetween, worldToSvg } from "../src/lib/ai-tutoring-graph";

const plane = { left: 140, top: 124, width: 720, height: 446.4, range: 10 };
const closeTo = (actual: number, expected: number, label: string) => {
  if (Math.abs(actual - expected) > 1e-9) throw new Error(`${label}: expected ${expected}, received ${actual}`);
};

const origin = worldToSvg({ x: 0, y: 0 }, plane);
closeTo(origin.x, 500, "origin x");
closeTo(origin.y, 347.2, "origin y");

const first = worldToSvg({ x: 1, y: 2 }, plane);
const second = worldToSvg({ x: 4, y: 8 }, plane);
closeTo(first.x, 536, "point (1,2) x");
closeTo(first.y, 302.56, "point (1,2) y");
closeTo(second.x, 644, "point (4,8) x");
closeTo(second.y, 168.64, "point (4,8) y");

const slope = slopeBetween({ x: 1, y: 2 }, { x: 4, y: 8 });
if (slope !== 2) throw new Error(`slope: expected 2, received ${slope}`);
if (!pointIsOnSlopeInterceptLine({ x: 1, y: 2 }, 2, 0) || !pointIsOnSlopeInterceptLine({ x: 4, y: 8 }, 2, 0)) {
  throw new Error("y = 2x should contain both fallback points");
}

console.info("AI tutoring graph assertions passed.");
