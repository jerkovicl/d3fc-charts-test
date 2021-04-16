/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export class Simplify {
  // to suit your point format, run search/replace for '' and '';
  // for 3D version, see 3d branch (configurability would draw significant performance overhead)

  // square distance between 2 points
  static getSqDist(p1: number, p2: number) {
    const dx = p1 - p2;
    const dy = p1 - p2;

    return dx * dx + dy * dy;
  }

  // square distance from a point to a segment
  static getSqSegDist(p: number, p1: number, p2: number) {
    let x = p1;
    let y = p1;
    let dx = p2 - x;
    let dy = p2 - y;

    if (dx !== 0 || dy !== 0) {
      const t = ((p - x) * dx + (p - y) * dy) / (dx * dx + dy * dy);

      if (t > 1) {
        x = p2;
        y = p2;
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }

    dx = p - x;
    dy = p - y;

    return dx * dx + dy * dy;
  }
  // rest of the code doesn't care about point format

  // basic distance-based simplification
  static simplifyRadialDist(points: number[], sqTolerance: number) {
    let prevPoint = points[0] as number;
    const newPoints = [prevPoint];
    let point;

    for (let i = 1, len = points.length; i < len; i++) {
      point = points[i];

      if (this.getSqDist(point, prevPoint) > sqTolerance) {
        newPoints.push(point);
        prevPoint = point;
      }
    }

    if (prevPoint !== point && point) newPoints.push(point);

    return newPoints;
  }

  static simplifyDPStep(points: number[], first: number, last: number, sqTolerance: number, simplified: number[]) {
    let maxSqDist = sqTolerance;
    let index;

    for (let i = first + 1; i < last; i++) {
      const sqDist = this.getSqSegDist(points[i], points[first], points[last]);

      if (sqDist > maxSqDist) {
        index = i;
        maxSqDist = sqDist;
      }
    }

    if (maxSqDist > sqTolerance && index) {
      if (index - first > 1) this.simplifyDPStep(points, first, index, sqTolerance, simplified);
      simplified.push(points[index]);
      if (last - index > 1) this.simplifyDPStep(points, index, last, sqTolerance, simplified);
    }
  }

  // simplification using Ramer-Douglas-Peucker algorithm
  static simplifyDouglasPeucker(points: number[], sqTolerance: number) {
    const last = points.length - 1;

    const simplified = [points[0]];
    this.simplifyDPStep(points, 0, last, sqTolerance, simplified);
    simplified.push(points[last]);

    return simplified;
  }

  // both algorithms combined for awesome performance
  static simplify(points: number[], tolerance: number, highestQuality: boolean) {
    if (points.length <= 2) return points;

    const sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;

    points = highestQuality ? points : this.simplifyRadialDist(points, sqTolerance);
    points = this.simplifyDouglasPeucker(points, sqTolerance);

    return points;
  }
}
