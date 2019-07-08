const htmlGen = require('../functionality/htmlGen.js.js');
const api = require('../functionality/netReqs.js.js');
const matrix = require('../functionality/matrix.js.js');
const miscFns = require('../functionality/miscFns.js.js');

const onColor = 'rgb(60, 62, 187)';
const offColor = 'rgb(128, 128, 128)';
let gridElementWidth = 0;
let gridElementHeight = 0;

// NOTE NOT SURE HOW TO GET ARROW FUNCTIONS
// TO WORK WITH PROTOTYPAL INHERITANCE
// sequencer object
function Sequencer(type, isHidden) {
  this.type = type;           // type of sequencer, percussion or melodic
  this.matrix = [];           // 2d array for story data of sequencer grid
  this.sounds = [1, 2, 3, 4, 5, 6, 7, 8, 9];  // list of sounds (drums or melody)
  this.timeSig = [4, 4];
  this.barNum = 1;            // numbers of bars https://en.wikipedia.org/wiki/Bar_(music)  // do I even need measure length?
  this.measureLength = '';    // number of possible beats in a measure
  this.gridElements = [];     // array of objects with each grid coordinates
  this.isHidden = isHidden;
  this.isPlaying = false;
  this.canvasLeft = 0;
  this.canvasTop = 0;
}
// creates grid of squares
// generate HTML with helper functions, then add to the DOM
Sequencer.prototype.create = function () {
  // generate html for child controls
  let controls = htmlGen.createControls(this.type);
  document.getElementById(this.type + '-controls').innerHTML = controls;

  // draw grid elements on canvas and store each element as
  this.gridElements = htmlGen.createGrid(this.type, this.sounds, this.barNum, this.timeSig);

  // store coords of top and left of main canvas
  let grid = document.getElementById(`drums-grid`);
  this.canvasLeft = grid.offsetLeft;
  this.canvasTop = grid.offsetTop;

  this.mapClicks();
}
// set dragging trackers to falsey
Sequencer.prototype.unDrag = function () {
}
Sequencer.prototype.mapClicks = function () {
  // buttons for switching between sequencers
  let drums = document.getElementById('drums-container');
  let melody = document.getElementById('melody-container');
  let keyboard = document.getElementById('keyboard-container');
  document.getElementById(`${this.type}-select`).addEventListener('click', (e) => {
    if (e.target.id === 'drums-select') {
      drums.style.display = 'flex';
      melody.style.display = 'none';
      keyboard.style.display = 'none';
    }
    else if (e.target.id === 'melody-select') {
      melody.style.display = 'flex';
      drums.style.display = 'none';
      keyboard.style.display = 'none';
    }
  });

  let grid = document.getElementById(`${this.type}-grid`);
  let ctx = grid.getContext('2d');

  grid.addEventListener('click', (e) => {
    // coords of mouse click
    console.log(event)
    console.log('shit')
    let x = event.pageX - this.canvasLeft;
    let y = event.pageY - this.canvasTop;

    this.gridElements.forEach(function (element) {
      if (y > element.top && y < element.top + element.height
        && x > element.left && x < element.left + element.width) {
        //alert('clicked an element');
        
        ctx.strokeStyle = '#373737';
        ctx.fillStyle = 'rgb(60, 62, 187)';
        ctx.fillRect(element.left, element.top, element.width, element.height);
        ctx.strokeRect(element.left, element.top, element.width, element.height);
        console.log(element)
        console.log('fuck')
      }
    });
  })
}
module.exports = {
  Sequencer: Sequencer/*,
  globalMouseup:globalMouseup*/
}