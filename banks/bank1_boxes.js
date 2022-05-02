import { initScene } from "../switcher.js";
import * as m from "/midi.js";
import * as s from "/finalScenes.js";

export default () => {
  m.setButton(0, () => initScene(s.oneBoxAudio));
  m.setButton(1, () => initScene(s.oneBox));
  m.setButton(2, () => initScene(s.twoBox));
  m.setButton(3, () => initScene(s.twoBoxInverted));
  m.setButton(4, () => initScene(s.twoBoxAudio));
  m.setButton(5, () => initScene(s.fourBoxAudio));
  m.setButton(6, () => initScene(s.fourBox));
  m.setButton(7, () => initScene(s.fourBoxSeparate));
};
