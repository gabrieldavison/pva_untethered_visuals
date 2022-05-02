import { initScene } from "../switcher.js";
import * as m from "/midi.js";
import * as s from "/finalScenes.js";

export default () => {
  m.setButton(0, () => initScene(s.moireCircles2));
  m.setButton(1, () => initScene(s.moireCircles4));
};
