export type GraphPlane = {
  left: number;
  top: number;
  width: number;
  height: number;
  range: number;
};

export type SvgPoint = { x: number; y: number };

/**
 * Projects mathematical coordinates into the fixed 1000 × 620 teaching-board
 * SVG. The SVG scales responsively through its viewBox, so this transform stays
 * mathematically stable at every rendered size.
 */
export function worldToSvg(point: SvgPoint, plane: GraphPlane): SvgPoint {
  return {
    x: plane.left + ((point.x + plane.range) / (plane.range * 2)) * plane.width,
    y: plane.top + ((plane.range - point.y) / (plane.range * 2)) * plane.height,
  };
}

export function slopeBetween(first: SvgPoint, second: SvgPoint) {
  const run = second.x - first.x;
  return run === 0 ? null : (second.y - first.y) / run;
}

export function pointIsOnSlopeInterceptLine(point: SvgPoint, slope: number, intercept: number) {
  return Math.abs(point.y - (slope * point.x + intercept)) < 1e-9;
}
