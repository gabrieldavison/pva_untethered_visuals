import { initScene } from "../switcher.js";
import * as m from "/midi.js";
import * as s from "/finalScenes.js";

export default () => {
  m.setButton(0, () => initScene(s.squaresInSquaresAudioSize));
  m.setButton(1, () => initScene(s.squaresInSquaresAudioTrigger));
  m.setButton(2, () => initScene(s.squaresInSquaresAudioTrigger4));
  m.setButton(3, () => initScene(s.squaresInSquaresAudioTrigger16));
  m.setButton(4, () => initScene(s.squaresInSquares));
};
