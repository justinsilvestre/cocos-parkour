class Point {
  constructor(x, y) {
    Object.assign(this, { x, y });
  }
}

const NOT_SUPPORTED = 'NOT_SUPPORTED';
const RIGHT = 'RIGHT';
const LEFT = 'LEFT';
const UP = 'UP';
const DOWN = 'DOWN';

class SimpleRecognizer {
  constructor() {
    Object.assign(this, {
      points: [],
      result: null
    });
  }

  // to be called in onTouchBegan
  beginPoint(x, y) {
    Object.assign(this, {
      points: [ new Point(x, y) ],
      result: null
    });
  }

  // to be called in onTouchMoved
  movePoint(x, y) {
    this.points.push(new Point(x, y));

    if (this.result == NOT_SUPPORTED)
      return;

    const len = this.points.length;
    const dx = this.points[len - 1].x - this.points[len - 2].x;
    const dy = this.points[len - 1].y - this.points[len - 2].y;

    var newRtn;
    if (Math.abs(dx) > Math.abs(dy)) {
      newRtn = dx > 0 ? RIGHT : LEFT;
    } else {
      newRtn = dy > 0 ? UP : DOWN;
    }

    if (!this.result) {
      this.result = newRtn;
      return;
    }

    this.result !== newRtn && (this.result = NOT_SUPPORTED);
  }

  // to be called in onTouchEnded
  endPoint() {
    return this.points.length < 3 ? 'error' : this.result;
  }

  getPoints() {
    return this.points;
  }
}

export default SimpleRecognizer;