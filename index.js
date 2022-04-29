import { initScene } from "./switcher.js";
import * as scratchScenes from "./scratchScenes.js";
import * as scenes from "./scenes.js";
import * as m from "./midi.js";

// console.log(m.wm);
window.m = m;
m.setup();
window.onload = () => {
  initScene(scratchScenes.init);
};

let sketchLoaded = false;
console.log(m.setButton);
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
// // Stand in for midi controller
// document.addEventListener("keypress", (e) => {
//   switch (e.key) {
//     case "1":
//       initScene(scenes.init);
//       break;
//     case "2":
//       initScene(scenes.audioInit);
//       break;
//     case "3":
//       initScene(scenes.oneBoxWithSpeedControl);
//       break;
//     case "4":
//       initScene(scenes.twoBoxWithSpeedControl);
//       break;
//     case "5":
//       initScene(scenes.fourBoxWithSpeedControl);
//       break;
//     case "6":
//       initScene(scenes.oneBoxWithAudioControl);
//       break;
//     case "7":
//       initScene(scenes.rotatingSquares);
//       break;
//     case "8":
//       initScene(scenes.galaxy);
//       break;
//     case "9":
//       initScene(scenes.galaxyWithAudioInput);
//       break;
//     case "0":
//       initScene(scenes.moireCircles);
//       break;
//     case "q":
//       initScene(scenes.moireCirclesWithAudioInput);
//       break;
//     case "w":
//       initScene(scenes.squaresInSquares);
//       break;
//     case "e":
//       initScene(scenes.squaresInSquaresAudioInput);
//       break;
//     case "r":
//       initScene(scenes.moireCircles);
//       break;
//   }
// });
