export class MyAmp {
  constructor(p5, p) {
    this.p5 = p5;
    this.p = p;
    this.mic = new this.p5.AudioIn();
    this.mic.start();
    this.amp = new this.p5.Amplitude();
  }
  start() {
    this.p.userStartAudio();
    this.amp.setInput(this.mic);
  }
  getLevel() {
    return this.amp.getLevel();
  }
}

export class MyRect {
  constructor(p, x, y, maxWidth, maxHeight, numRects) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.numRects = numRects;
    this.chunkW = maxWidth / numRects;
    this.chunkH = maxHeight / numRects;
    this.offsetX = 0;
    this.offsetY = 0;
    this.targetOffsetX = 0;
    this.targetOffsetY = 0;
  }
  draw() {
    for (let i = 0; i < this.numRects; i++) {
      this.p.push();
      this.p.translate(this.x, this.y);
      for (let i = 0; i < this.numRects; i++) {
        const w = this.chunkW * (i + 1);
        const h = this.chunkH * (i + 1);
        const offsetMult = this.p.map(i, 0, this.numRects, this.numRects, 0);
        this.p.rect(
          0 + offsetMult * this.offsetX,
          0 + offsetMult * this.offsetY,
          w,
          h
        );
      }
      this.p.pop();
    }
  }
  setOffset(x, y) {
    this.targetOffsetX = x;
    this.targetOffsetY = y;
  }
  tick(interval) {
    const dx = (this.targetOffsetX - this.offsetX) / interval;
    const dy = (this.targetOffsetY - this.offsetY) / interval;
    this.offsetX += dx;
    this.offsetY += dy;
  }
}

export class myCircle {
  constructor(p, x, y, maxRad, numCircles) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.tX = x;
    this.tY = y;
    this.maxRad = maxRad;
    this.numCircles = numCircles;
    this.chunk = maxRad / numCircles;
  }

  draw() {
    this.p.push();
    this.p.translate(this.x, this.y);
    for (let i = 0; i < this.numCircles; i++) {
      const s = this.chunk * (i + 1);
      this.p.circle(0, 0, s);
    }
    this.p.pop();
  }
  move(x, y) {
    this.tX = x;
    this.tY = y;
  }
  tick(interval) {
    const dx = (this.tX - this.x) / interval;
    const dy = (this.tY - this.y) / interval;

    this.x += dx;
    this.y += dy;
  }
}

export class Wave {
  constructor(p, initSpeed = 0.05) {
    this.p = p;
    this.clock = 0.0;
    this.speed = 0.05;
  }
  val() {
    return this.p.sin(this.clock);
  }
  setSpeed(v) {
    this.speed = v;
  }
  tick() {
    this.clock += this.speed;
  }
}

export const genAddWaves =
  (p) =>
  (w1, w2, attenuator = 1) =>
    p.map(
      w1.val() + p.map(w2.val(), -1, 1, -1 * attenuator, 1 * attenuator),
      -1 - attenuator * 1,
      1 + attenuator * 1,
      -1,
      1
    );

export class Easer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tx = x;
    this.ty = y;
  }

  tick(interval) {
    const dx = (this.tx - this.x) / interval;
    const dy = (this.ty - this.y) / interval;
    this.x += dx;
    this.y += dy;
  }
}
