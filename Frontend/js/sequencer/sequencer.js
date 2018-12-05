let htmlGen = require('../html/htmlGen.js');

function Sequencer(type){
    this.type = type;           // type of sequencer, percussion or melodic
    this.matrix = [];           // 2d array for story data of sequencer grid
    this.sounds = [1,2,3,4,5,6,7,8,9];
    this.isHidden = false;
    this.isPlaying = false;
}

Sequencer.prototype.create = function(){
    let grid = htmlGen.createGrid(this.type, this.sounds, 16, [4,4]);
    document.getElementById(this.type + '-grid').innerHTML = grid;
}

function Drums(){
    Sequencer.call(this, 'drums');
}

Drums.prototype = Object.create(Sequencer.prototype);

function Melody(){
    Sequencer.call(this, 'melody');
}

Melody.prototype = Object.create(Sequencer.prototype);

module.exports = {
    Drums:Drums,
    Melody:Melody
}