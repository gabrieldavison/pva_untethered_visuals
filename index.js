import { initScene } from "./switcher.js";
import * as scratchScenes from "./scratchScenes.js";
import * as scenes from "./scenes.js";
import * as m from "./midi.js";
import bank1 from "./banks/bank1_boxes.js";
import bank2 from "./banks/bank2_galaxy.js";
import bank3 from "./banks/bank3_rotSquares.js";
import bank4 from "./banks/bank4_squaresInSquares";

// console.log(m.wm);
// window.m = m;
m.setup();
window.onload = () => {
  initScene(scratchScenes.init);
};

// bank3();

// Scratch mapping
m.setButton(0, () => initScene(scenes.init));
m.setButton(1, () => initScene(scenes.twoBoxWithSpeedControl));
m.setButton(2, () => initScene(scenes.twoBoxWithSpeedControlHydra));
m.setButton(3, () => initScene(scenes.oneBoxWithAudioControl));
m.setButton(4, () => initScene(scenes.oneBoxWithAudioControlHydra));
m.setButton(5, () => initScene(scenes.fourBoxWithSpeedControl));
m.setButton(6, () => initScene(scenes.fourBoxWithSpeedControlFeedbackAudio));
m.setButton(7, () => initScene(scenes.fourBoxWithSpeedControlVideoInput));
m.setButton(8, () => initScene(scenes.galaxyHydra));
m.setButton(9, () => initScene(scenes.galaxyWithAudioInput));
m.setButton(10, () => initScene(scenes.galaxyHydraVideoInput));
m.setButton(11, () => initScene(scenes.rotatingSquares));
m.setButton(12, () => initScene(scenes.rotatingSquaresBig));
m.setButton(13, () => initScene(scenes.rotatingSquaresBigHydra));
m.setButton(14, () => initScene(scenes.rotatingSquaresVideoInput));
m.setButton(15, () => initScene(scenes.squaresInSquaresAudioSize));
m.setButton(16, () => initScene(scenes.squaresInSquaresAudioTrigger));
m.setButton(17, () => initScene(scenes.squaresInSquaresAudioTrigger4));
m.setButton(18, () => initScene(scenes.squaresInSquaresVideoInput));
m.setButton(19, () => initScene(scenes.squaresInSquaresHydra));
m.setButton(20, () => initScene(scenes.moireCirclesHydraVideoInput));
m.setButton(21, () => initScene(scenes.moireCirclesHydra));
