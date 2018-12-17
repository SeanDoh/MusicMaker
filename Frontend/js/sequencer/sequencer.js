const htmlGen = require('../functionality/htmlGen.js');
const api = require('../functionality/netReqs.js');
const matrix = require('../functionality/matrix.js');
const miscFns = require('../functionality/miscFns.js');

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
  this.sounds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  this.timeSig = [4, 4];
  this.measureLength = 1;
  this.gridLength = 0;  // number of columns in grid
  this.gridWidth = 0;   // width of grid container in px
  this.isHidden = isHidden;
  this.isPlaying = false;
  this.refLeft = 0;
  this.refRightmostLeft = 0;
  this.refRight = 0;
  this.refTop = 0;
  this.refBottom = 0;
  this.gridElementWidth = 0;    // original width
  this.gridElementHeight = 0;   // original height
  this.dragGridElementWidth = 0; // temp width reference for expansion
  this.moveDrag = false;  // trackin 4 draggin
  this.leftDrag = false;
  this.rightDrag = false;
  this.dragElement = '';
  this.gridX = 0;
  this.gridY = 0;
  this.seqClientX = 0;  // store clientX on drag to compare back to how much it changed
  this.seqClientY = 0;
}
// creates grid of squares
// generate HTML with helper functions, then add to the DOM
Sequencer.prototype.create = function () {
  let grid = htmlGen.createGrid(this.type, this.sounds, this.measureLength, [4, 4]);
  this.matrix = matrix.createMatrix(this.sounds, this.measureLength, [4, 4]);
  let controls = htmlGen.createControls(this.type);
  document.getElementById(this.type + '-grid').innerHTML = grid;
  document.getElementById(this.type + '-controls').innerHTML = controls;
  this.gridLength = miscFns.calcGridLenth(this.timeSig, this.measureLength);
  let tempLeftGridElement = document.getElementById(`sb0-0-drums`);
  let tempRightGridElement = document.getElementById(`sb0-${this.gridLength-1}-drums`);
  let tempBottomGridElement = '';
  this.gridElementWidth = parseInt(getComputedStyle(tempLeftGridElement).getPropertyValue('width'), 10);
  this.gridElementHeight = parseInt(getComputedStyle(tempLeftGridElement).getPropertyValue('height'), 10);
  this.refLeft = tempLeftGridElement.offsetLeft;
  this.refRightmostLeft = tempRightGridElement.offsetLeft;
  this.refRight = this.refRightmostLeft + this.gridElementWidth + this.refLeft - 1;
  this.refTop = tempLeftGridElement.offsetTop;
  
  // set temp bottom reference per sequencer type (melody is different row length than drums)
  if (this.type === 'drums') tempBottomGridElement = document.getElementById(`sb${this.sounds.length-1}-0-drums`);
  else tempBottomGridElement = document.getElementById(`sb${this.sounds.length-1}-0-melody`);
  this.refBottom = tempBottomGridElement.offsetTop;

  // set grid container width for reference when expanding
  this.gridWidth = this.gridLength * this.gridElementWidth;
  this.mapClicks();
}
// set dragging trackers to falsey
Sequencer.prototype.unDrag = function () {
  this.moveDrag = false;
  this.leftDrag = false;
  this.rightDrag = false;
  this.dragElement = '';
  this.gridX = 0;
  this.gridY = 0;
  this.seqClientX = 0;
  this.seqClientY = 0;
}
Sequencer.prototype.mapClicks = function () {
  // buttons for switching between sequencers
  let drums = document.getElementById('drums-container');
  let melody = document.getElementById('melody-container');
  let keyboard = document.getElementById('keyboard-container');
  document.getElementById(`${this.type}-select`).addEventListener('click', (e) => {
    if (e.target.id === 'drums-select') {
      drums.style.display = 'block';
      melody.style.display = 'none';
      keyboard.style.display = 'none';
    }
    else if (e.target.id === 'melody-select') {
      melody.style.display = 'block';
      drums.style.display = 'none';
      keyboard.style.display = 'none';
    }
  });

  // when grid clicked, add new element on top of it with position:absolute
  // and then position the element in reference to the top left grid via
  // column and row numbers stored via ID of the html element of the grid
  document.getElementById(`${this.type}-grid`).addEventListener('dblclick', (e) => {
    // get coords of top left grid element for reference
    if (e.target.id.slice(0, 2) === 'sb') {
      let row = miscFns.getRow(e.target.id);
      let col = miscFns.getCol(e.target.id);
      miscFns.createTopGridElement(this.type, row, col, this.refTop, this.refLeft, this.gridElementHeight, this.gridElementWidth)
    }
    else if (e.target.id.slice(0, 3) === 'tsb') e.target.remove();
  })


  document.getElementById(`${this.type}-grid`).addEventListener('mousedown', (e) => {

    let expandDirection = e.target.id.match(/\b(left|right)/g);
    // move square around
    if (e.target.id.slice(0, 3) === 'tsb') {
      console.log('move');
      this.moveDrag = true;
      this.dragElement = e.target;
      this.gridX = parseInt(getComputedStyle(e.target).getPropertyValue('left'), 10);
      this.gridY = parseInt(getComputedStyle(e.target).getPropertyValue('top'), 10);
      this.seqClientX = (Math.floor(e.clientX / this.gridElementWidth));
      this.seqClientY = (Math.floor(e.clientY / this.gridElementHeight));
    }
    else if (expandDirection != null) {
      if (expandDirection[0] === 'right') {
        console.log('right');
        this.rightDrag = true;
        this.dragElement = e.target.parentNode;
        this.dragGridElementWidth = parseInt(getComputedStyle(this.dragElement).getPropertyValue('width'), 10);
        this.seqClientX = e.clientX;
      }
      else {
        console.log('left');
        this.leftDrag = true;
        this.dragElement = e.target.parentNode;
      }
    }
  });

  document.addEventListener('mousemove', (e) => {
    //console.log(e.clientX)
    // move grid element
    if (this.moveDrag) {
      // if ithink(dragelement)right > refRight set new width as (ogWidth - (newRight - refRight))
      
      let tempWidth = !this.dragElement.style.width ? this.gridElementWidth : parseInt(this.dragElement.style.width,10);
      let newLeft = ((Math.floor(e.clientX / this.gridElementWidth) - this.seqClientX) * this.gridElementWidth) + this.gridX;
      let newTop = ((Math.floor(e.clientY / this.gridElementHeight) - this.seqClientY) * this.gridElementHeight) + this.gridY;
      //console.log(parseInt(this.dragElement.style.left,10) + this.refLeft)
      //console.log(parseInt(this.dragElement.style.left,10) + tempWidth + this.refLeft)
      let dragElementRight = parseInt(this.dragElement.style.left,10) + tempWidth + this.refLeft - 1;
      // right limit drag
      if (dragElementRight > this.refRight) {
        console.log('t')
        this.dragElement.style.left = newLeft + 'px';
        this.dragElement.style.width = tempWidth - (dragElementRight - this.refRight) + 'px';
      }
      // left limit drag
      else if (newLeft > this.refRightmostLeft) {
        //console.log('t')
        this.dragElement.style.width = this.gridElementWidth + 'px';
        this.dragElement.style.left = this.refRightmostLeft + 'px';
      }
      else if (newLeft < this.refLeft) this.dragElement.style.left = this.refLeft + 'px';
      else this.dragElement.style.left = newLeft + 'px';
      // top limit
      if (newTop < this.refTop) this.dragElement.style.top = this.refTop + 'px';
      // bottom limit
      else if (newTop > this.refBottom) this.dragElement.style.top = this.refBottom + 'px';
      // within grid
      else this.dragElement.style.top = newTop + 'px';
      miscFns.calcNewId(this.dragElement, this.gridElementWidth, this.gridElementHeight, this.refLeft, this.refTop, this.type);
    }
    // expand right
    else if (this.rightDrag){
      let newWidth = (e.clientX - this.seqClientX) + this.dragGridElementWidth;
      // min size limit
      if (newWidth < this.gridElementWidth) this.dragElement.style.width = this.gridElementWidth + 'px';
      else{
        let col = miscFns.getCol(this.dragElement.id);
        let maxRight = this.gridWidth - (col * this.gridElementWidth);
        // max size limit
        if (newWidth > maxRight) this.dragElement.style.width = maxRight + 'px';
        // within limits
        else this.dragElement.style.width = newWidth + 'px';
      }
      //this.dragElement.style.width = newWidth + 'px';
    }
  })
  // #region shit

  // #endregion shit
}
module.exports = {
  Sequencer: Sequencer/*,
    globalMouseup:globalMouseup*/
}