# Project

## Architecture

- Sketch
  - These are the atomic level of the visuals.
  - Sketches live in one file to start off with.
  - Sketch has a p5 and a hydra component.
  - A sketch is a callable function
    - Might have to do some magic to get this to work with p5
    - p5 needs to run in instance mdoe
- Switcher
  - Deals with changing the sketches
  - Resetting / blanking out between sketches
  - imports all sketches and assigns them a number
  - has a callable method that you pass an ID. This triggers the correct sketch
    - If I have time it would be nice to be have the ID/Sketch mapping in a declarable format (e.g. a json file).
      - Maybe this is just the root file where everything is setup
- MIDI
  - Needs to decide on a library for this.
  - Going to have a setup function which deals with all the controller nonsense
  - Going to have calls to switcher mapped to button presses.
  - Going to have a function that can be called to get the value of a slider or knob
    - This will have min/max/default value as param.
    - This is used inside the sketch in place of a parameter.
      - e.g. `param(min,max,default) => () => slider value.
  - Might be nice to have a debugging function that starts logging the output to console for easy remapping

## Tasks

- Add two sketches to switcher
- Move hydraP5Lib logic into switcher
- Get it toggling between 2 sketches
