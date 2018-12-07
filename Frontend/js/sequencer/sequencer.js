let htmlGen = require('../html/htmlGen.js');
let api = require('../api/netReqs.js');

// NOTE NOT SURE HOW TO GET ARROW FUNCTIONS
// TO WORK WITH PROTOTYPAL INHERITANCE
// sequencer object
function Sequencer(type, isHidden){
    this.type = type;           // type of sequencer, percussion or melodic
    this.matrix = [];           // 2d array for story data of sequencer grid
    this.sounds = [1,2,3,4,5,6,7,8,9];
    this.isHidden = isHidden;
    this.isPlaying = false;
}
// creates grid of squares
// generate HTML with helper functions, then add to the DOM
Sequencer.prototype.create = function(){
    let grid = htmlGen.createGrid(this.type, this.sounds, 1, [4,4]);
    let controls = htmlGen.createControls(this.type);
    document.getElementById(this.type + '-grid').innerHTML = grid;
    document.getElementById(this.type + '-controls').innerHTML = controls;
    this.mapClicks();
}
Sequencer.prototype.mapClicks = function(){
    document.getElementById('sequencer-type-' + this.type).addEventListener('click', (e) => {
        console.log(e.target.id);
        if(e.target.id === 'sequencer-type-drums'){
            console.log(document.getElementById('drums-container').style)
            if(e.target.style.display === 'none'){
                console.log('shit')
                e.target.style.display = '';
                document.getElementById('melody-container').style.display = 'none';
                document.getElementById('keyboard-container').style.display = 'none';
            }
        }
        else if(e.target.id === 'sequencer-type-melody'){
            console.log(e.target.style)
            if(e.target.style.display === 'none'){
                e.target.style.display = '';
                document.getElementById('drums-container').style.display = 'none';
                document.getElementById('keyboard-container').style.display = 'none';
            }
        }
    });
}
module.exports = {
    Sequencer:Sequencer
}