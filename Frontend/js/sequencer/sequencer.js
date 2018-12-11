let htmlGen = require('../components/htmlGen.js');
let api = require('../components/netReqs.js');
let matrix = require('../components/matrix.js');
let miscFns = require('../components/miscFns.js');

const onColor = 'rgb(60, 62, 187)'
const offColor = 'rgb(128, 128, 128)'

// tracks if user is dragging/expanding a grid square horizontally
// needs to be global for document eventlistener for mouseup
let isDragging = false;

// NOTE NOT SURE HOW TO GET ARROW FUNCTIONS
// TO WORK WITH PROTOTYPAL INHERITANCE
// sequencer object
function Sequencer(type, isHidden) {
    this.type = type;           // type of sequencer, percussion or melodic
    this.matrix = [];           // 2d array for story data of sequencer grid
    this.sounds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.measureLength = 1;
    this.isHidden = isHidden;
    this.isPlaying = false;
}
// creates grid of squares
// generate HTML with helper functions, then add to the DOM
Sequencer.prototype.create = function () {
    let grid = htmlGen.createGrid(this.type, this.sounds, this.measureLength, [4, 4]);
    this.matrix = matrix.createMatrix(this.sounds, this.measureLength, [4, 4]);
    let controls = htmlGen.createControls(this.type);
    document.getElementById(this.type + '-grid').innerHTML = grid;
    document.getElementById(this.type + '-controls').innerHTML = controls;
    this.mapClicks();
}
Sequencer.prototype.mapClicks = function () {
    // buttons for switching between sequencers
    let drums = document.getElementById('drums-container');
    let melody = document.getElementById('melody-container');
    let keyboard = document.getElementById('keyboard-container');
    document.getElementById(this.type + '-select').addEventListener('click', (e) => {
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

    // grid clicks
    // get list of all grid elements, loop through them and add event listeners
    let mouseEnteredUnclicked = false; // tracks status of mouse entering and leaving
    let gridElements = document.getElementsByClassName('grid-' + this.type);
    for (let i = 0; i < gridElements.length; i++) {
        // click listener
        gridElements[i].addEventListener('click', (e) => {
            // there's nested div inside each grid element, so need to check for that
            if (e.target.id.charAt(0) != 'i') {
                let state = getComputedStyle(e.target).getPropertyValue('background-color');
                let col = miscFns.getCol(e.target.id);
                let row = miscFns.getRow(e.target.id);
                if (state === offColor) {
                    e.target.style.backgroundColor = onColor;
                    miscFns.addDragElement(e.target, this.type, row, col);
                    this.matrix[row][col] = 1;
                }
                else {
                    e.target.style.backgroundColor = offColor;
                    miscFns.removeDragElement(e.target);
                    this.matrix[row][col] = 0;
                }
            }
        });
        // mouseover and out listeners, needs to use tracking from above, mouseEnteredClicked
        gridElements[i].addEventListener('mouseover', (e) => {
            // need to check is user is dragging, and for inner element
            if (isDragging) { return }
            else if (e.target.id.charAt(0) != 'i') {
                let state = getComputedStyle(e.target).getPropertyValue('background-color');
                let col = miscFns.getCol(e.target.id);
                let row = miscFns.getRow(e.target.id);
                // if mouse enters and is unclicked
                if (e.buttons === 0 && (state === offColor || onColor)) mouseEnteredUnclicked = true;
                // if mouse enters and is clicked and bg is off
                else if (e.buttons === 1 && state === offColor) {
                    e.target.style.backgroundColor = onColor;
                    this.matrix[row][col] = 1;
                    miscFns.addDragElement(e.target, this.type, row, col);
                    mouseEnteredUnclicked = false;
                }
                // if mouse enters and is clicked and bg is on
                else if (e.buttons === 1 && state === onColor) {
                    e.target.style.backgroundColor = offColor;
                    miscFns.removeDragElement(e.target);
                    this.matrix[row][col] = 0;
                    mouseEnteredUnclicked = false;
                }
            }

        });
        gridElements[i].addEventListener('mouseout', (e) => {
            // need to check is user is dragging, and for inner element
            if (isDragging) { return }
            else if (e.target.id.charAt(0) != 'i') {
                let state = getComputedStyle(e.target).getPropertyValue('background-color');
                let col = miscFns.getCol(e.target.id);
                let row = miscFns.getRow(e.target.id);
                // if mouse leaves and is clicked and bg is off
                if (e.buttons === 1 && state === offColor && mouseEnteredUnclicked) {
                    e.target.style.backgroundColor = onColor;
                    miscFns.addDragElement(e.target, this.type, row, col);
                    this.matrix[row][col] = 1;
                    mouseEnteredUnclicked = false;
                }
                // if mouse leaves and is clicked and bg is on
                else if (e.buttons === 1 && state === onColor && mouseEnteredUnclicked) {
                    e.target.style.backgroundColor = offColor;
                    miscFns.removeDragElement(e.target);
                    this.matrix[row][col] = 0;
                    mouseEnteredUnclicked = false;
                }
            }
        });
    }

    let startingX = 0;
    let newX = 0;
    let newWidth = 0;
    let extendElement = '';
    let originalWidth = '';
    // mouse listener on grid containers
    document.getElementById(`${this.type}-grid`).addEventListener('mousedown', (e) => {
        startingX = 0;
        if (e.target.id.charAt(0) === 'i') {
            extendElement = e.target.parentElement;
            originalWidth =  getComputedStyle(extendElement).getPropertyValue('width');
            isDragging = true;
            startingX = e.clientX;
        }
    });
    document.getElementById(`${this.type}-grid`).addEventListener('mouseup', (e) => {
        if (isDragging) {
            isDragging = false;
            //endX = e.clientX;
            //newWidth = endX - startingX;
            //console.log(extendElement);
            //extendElement.style.width = newWidth.toString() + 'px';
        }
    });
    document.getElementById(`${this.type}-grid`).addEventListener('mousemove', (e) => {
        if(isDragging){
            newX = e.clientX;
            newWidth = newX - startingX;
            extendElement.style.width = newWidth.toString() + 'px';
            console.log(e.clientX);
        }
    });
    // grid drags
    let innerGridElements = document.getElementsByClassName('inner-grid-' + this.type);
    for (let i = 0; i < innerGridElements.length; i++) {
        innerGridElements[i].addEventListener('ondrag', (e) => {
            console.log('test');
        })
    }
}

// eventlistener for whole document if when dragging, user leaves the sequencer container
globalMouseup = function(){
    document.addEventListener('mouseup', (e) => {
        isDragging = false;
    })
}

module.exports = {
    Sequencer: Sequencer,
    globalMouseup:globalMouseup
}