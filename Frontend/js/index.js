const sequencer = require('./sequencer/sequencer.js');

let drumSeq = new sequencer.Drums();
let melodySeq = new sequencer.Melody();
drumSeq.create();
melodySeq.create();