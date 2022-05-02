let sliderMapping;
let buttonMapping;

const sliderChangedStateMap = {
  // horizontal sliders
  0: true,
  1: true,
  2: true,
  3: true,
  // vertical sliders
  6: true,
  7: true,
  8: true,
  9: true,
};

const sliderMap = {
  // horizontal sliders
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  // vertical sliders
  6: 0,
  7: 0,
  8: 0,
  9: 0,
};

const buttonMap = {
  0: console.log,
  1: console.log,
  2: console.log,
  3: console.log,
  4: console.log,
  5: console.log,
  6: console.log,
  7: console.log,
  8: console.log,
  9: console.log,
  10: console.log,
  11: console.log,
  12: console.log,
  13: console.log,
  14: console.log,
  15: console.log,
  16: console.log,
};

const ccChange = (e) => {
  const ccNumber = e.controller.number;
  if (sliderMapping.hasOwnProperty(ccNumber)) {
    sliderMapping[ccNumber] = e.value;
  }
};

const noteChange = (e) => {
  const noteNumber = e.data[1];
  console.log(noteNumber);
  if (buttonMapping.hasOwnProperty(noteNumber)) {
    buttonMapping[noteNumber](e);
  }
};
function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export const getSlider = (number, min, max) => {
  const v = sliderMapping[number];
  return scale(v, 0, 1, min, max);
};

export const setButton = (number, cb) => {
  buttonMapping[number] = cb;
};

export const setup = () => {
  WebMidi.enable()
    .then(onEnabled)
    .catch((err) => alert(err));

  // Function triggered when WebMidi.js is ready
  function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
      console.log("No device detected.");
    } else {
      console.log(WebMidi.inputs);
    }

    const quneo = WebMidi.inputs[0];
    quneo.channels[1].addListener("controlchange", (e) => {
      ccChange(e);
    });
    // Buttons come in on channel 2 (this way theres no conflicts with the ccs)
    quneo.channels[2].addListener("noteon", (e) => {
      noteChange(e);
    });
  }
  sliderMapping = sliderMap;
  buttonMapping = buttonMap;
};
