let htmlGen = require('../html/htmlGen.js');

// NOTE NOT SURE HOW TO GET ARROW FUNCTIONS
// TO WORK WITH PROTOTYPAL INHERITANCE
// sequencer object
function Sequencer(type){
    this.type = type;           // type of sequencer, percussion or melodic
    this.matrix = [];           // 2d array for story data of sequencer grid
    this.sounds = [1,2,3,4,5,6,7,8,9];
    this.isHidden = false;
    this.isPlaying = false;
}
// creates grid of squares
// generate HTML with helper functions, then add to the DOM
Sequencer.prototype.create = function(){
    let grid = htmlGen.createGrid(this.type, this.sounds, 1, [4,4]);
    let controls = htmlGen.createControls(this.type);
    document.getElementById(this.type + '-grid').innerHTML = grid;
    document.getElementById(this.type + '-controls').innerHTML = controls;
}
module.exports = {
    Sequencer:Sequencer
}