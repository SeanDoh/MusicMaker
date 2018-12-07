const sequencer = require('./sequencer.js')

// Melody object, inherit from sequencer
function Melody(){
    sequencer.Sequencer.call(this, 'melody', true);
}
Melody.prototype = Object.create(sequencer.Sequencer.prototype);

module.exports = {
    Melody:Melody
}