const sequencer = require('./sequencer.js')

// Drum object, inherit from sequencer
function Drums(){
    sequencer.Sequencer.call(this, 'drums');
}
Drums.prototype = Object.create(sequencer.Sequencer.prototype);

module.exports = {
    Drums:Drums
}