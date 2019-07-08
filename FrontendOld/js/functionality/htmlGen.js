// This file contains helper functions to generate html
const miscFns = require('./miscFns.js.js');
const gWidth = 15;
const gHeight = 10;
/*  creates the grid of squares for each sequencer
    type = type of sequencer (drums or melody)
    sounds = list sounds for each row (length of this is numRows)
    barNum = number of baaahs
    timeSig = time signature
*/
let createGrid = (type, sounds, barNum, timeSig) => {
  let elements = [];
  let gridLength = miscFns.calcGridLenth(timeSig, barNum);
  let canvas = document.getElementById(`${type}-grid`);
  canvas.width = gridLength * gWidth;
  canvas.height = sounds.length * gHeight;
  let ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#373737';
  ctx.fillStyle = 'grey';
  for(let i = 0; i < sounds.length; i++){
    for (let k = 0; k < gridLength; k++) {
      elements.push({
        coordinate: [i, k], // row, col
        width: gWidth,
        height: gHeight,
        left: (k+1)*gWidth,
        top: (i+1)*gHeight
      })
      ctx.fillRect(k*gWidth, i*gHeight,gWidth, gHeight);
      ctx.strokeRect(k*gWidth, i*gHeight,gWidth, gHeight);
    }
  }
  return elements;
}
// create controls for each sequencer
let createControls = (type) => {
  return `
    <button class='sequencer-type button-highlight' id='${type}-select'>${type.charAt(0).toUpperCase() + type.slice(1)}</button>
    <div class='controls-button-container'>
        <button class='sequencer-start' id='start-${type}'><i class='fa fa-play'></i></button>
        <button class='sequencer-stop' id='stop-${type}'><i class='fa fa-stop'></i></button>
        <button class='sequencer-clear' id='clear-${type}'><i class='fa fa-trash'></i></button>
    </div>
    <div class='controls-sliders'>
        <div class='menu-highlight'>
            <button class='sequencer-volume' id='volume-${type}'><i class='fa fa-volume-up' id='sq-vol-${type}'></i></button>
            <input type='range' class='sequencer-volume-slider' id='sequencer-volume-slider-${type}' min='-60' max='0' value='-15'>
        </div>
        <div class='menu-highlight'>
            <button class='sequencer-measure' id='measure-${type}'><i class='fa fa-braille' aria-hidden='true'></i></button>
            <input type='range' class='sequencer-measure-slider' id='sequencer-measure-slider-${type}' min='1' max='4' value='1'>
        </div>                
    </div>
    `
}
export { createGrid, createControls };