export const start = () => {
  Tone.start();
  console.log("audio started");
};

export class MyAmp {
  constructor() {
    this.input = new Tone.UserMedia();
    this.meter = new Tone.Meter();
    this.input.connect(this.meter);
    this.input.open();
  }
  getLevel() {
    return Tone.dbToGain(this.meter.getValue());
  }
}

export class MyAmpSplit {
  constructor() {
    this.input = new Tone.UserMedia();
    this.splitInput = new Tone.Split(2);
    this.meter1 = new Tone.Meter();
    this.meter2 = new Tone.Meter();

    this.input.connect(this.splitInput);
    this.splitInput.connect(this.meter1, 1);
    this.splitInput.connect(this.meter2, 0);
    this.input.open();
  }
  getLevel1() {
    return Tone.dbToGain(this.meter1.getValue());
  }
  getLevel2() {
    return Tone.dbToGain(this.meter2.getValue());
  }
}
