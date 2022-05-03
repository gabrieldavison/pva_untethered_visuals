import { initScene } from "../switcher.js";
import * as m from "/midi.js";
import * as s from "/finalScenes.js";

export default () => {
  m.setButton(0, () => initScene(s.galaxyVideoInput));
  m.setButton(1, () => initScene(s.galaxyWithAudioVideo));
  m.setButton(2, () => initScene(s.twoBoxVideo));
  m.setButton(3, () => initScene(s.rotSquaresBigVideo));
  m.setButton(4, () => initScene(s.rotSquaresSmallVideo));
  m.setButton(5, () => initScene(s.dirtyCamera));
};
