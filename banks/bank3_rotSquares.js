import { initScene } from "../switcher.js";
import * as m from "/midi.js";
import * as s from "/finalScenes.js";

export default () => {
  m.setButton(0, () => initScene(s.rotSquaresAudio));
  m.setButton(1, () => initScene(s.rotSquaresBig));
  m.setButton(2, () => initScene(s.rotSquaresMed));
  m.setButton(3, () => initScene(s.rotSquaresSmall));
  m.setButton(4, () => initScene(s.rotSquaresBigRepeat));
  m.setButton(5, () => initScene(s.rotSquaresMedRepeat));
  m.setButton(6, () => initScene(s.rotSquaresSmallRepeat));
};
