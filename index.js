import { initScene } from "./switcher.js";
import * as scenes from "./scenes.js";

window.onload = () => {
  initScene(scenes.init);
};

let sketchLoaded = false;

// Stand in for midi controller
document.addEventListener("keypress", (e) => {
  switch (e.key) {
    case "1":
      initScene(scenes.init);
      break;
    case "2":
      initScene(scenes.audioInit);
      break;
    case "3":
      initScene(scenes.oneBoxWithSpeedControl);
      break;
    case "4":
      initScene(scenes.twoBoxWithSpeedControl);
      break;
    case "5":
      initScene(scenes.fourBoxWithSpeedControl);
      break;
    case "6":
      initScene(scenes.oneBoxWithAudioControl);
      break;
    case "7":
      initScene(scenes.rotatingSquares);
      break;
    case "8":
      initScene(scenes.galaxy);
      break;
    case "9":
      initScene(scenes.galaxyWithAudioInput);
      break;
    case "0":
      initScene(scenes.moireCircles);
      break;
    case "q":
      initScene(scenes.moireCirclesWithAudioInput);
      break;
    case "w":
      initScene(scenes.squaresInSquares);
      break;
    case "e":
      initScene(scenes.squaresInSquaresAudioInput);
      break;
    case "r":
      initScene(scenes.moireCircles);
      break;
  }
});
