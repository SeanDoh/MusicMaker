const drums = require('./sequencer/drums.js');
const melody = require('./sequencer/melody.js');


let drumSeq = new drums.Drums();
let melodySeq = new melody.Melody();
drumSeq.create();
melodySeq.create();