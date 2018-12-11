const drums = require('./sequencer/drums.js');
const melody = require('./sequencer/melody.js');
const keyboard = require('./components/keyboard.js');

let drumSeq = new drums.Drums();
let melodySeq = new melody.Melody();
drumSeq.create();
melodySeq.create();
keyboard.mapClicks();