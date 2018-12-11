const drums = require('./sequencer/drums.js');
const melody = require('./sequencer/melody.js');
const keyboard = require('./components/keyboard.js');
const sequencer = require('./sequencer/sequencer.js')

let drumSeq = new drums.Drums();
let melodySeq = new melody.Melody();
drumSeq.create();
melodySeq.create();
keyboard.mapClicks();
sequencer.globalMouseup();
/*document.addEventListener("dragstart", function( e ) {
  console.log(e.target.id)
})
document.addEventListener("dragend", function( e ) {
  console.log('shit')
})*/