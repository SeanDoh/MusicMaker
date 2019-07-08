const drums = require('./sequencer/drums.js');
const melody = require('./sequencer/melody.js');
const keyboard = require('./functionality/keyboard.js');
const sequencer = require('./sequencer/sequencer.js');

let drumSeq = new drums.Drums();
let melodySeq = new melody.Melody();
drumSeq.create();
melodySeq.create();
keyboard.mapClicks();
//sequencer.globalMouseup();
makeDragable('#sequencer-info', '#app');
/*document.addEventListener('mouseup', (e) => {
  drumSeq.unDrag();
  melodySeq.unDrag();
});*/
function makeDragable(dragHandle, dragTarget) {
  let dragObj = null; //object to be moved
  let xOffset = 0; //used to prevent dragged object jumping to mouse location
  let yOffset = 0;

  document.querySelector(dragHandle).addEventListener("mousedown", startDrag, true);
  document.querySelector(dragHandle).addEventListener("touchstart", startDrag, true);

  /*sets offset parameters and starts listening for mouse-move*/
  function startDrag(e) {
      e.preventDefault();
      e.stopPropagation();
      dragObj = document.querySelector(dragTarget);
      //dragObj.style.position = "absolute";
      let rect = dragObj.getBoundingClientRect();

      if (e.type == "mousedown") {
          xOffset = e.clientX - rect.left; //clientX and getBoundingClientRect() both use viewable area adjusted when scrolling aka 'viewport'
          yOffset = e.clientY - rect.top;
          window.addEventListener('mousemove', dragObject, true);
      } else if (e.type == "touchstart") {
          xOffset = e.targetTouches[0].clientX - rect.left;
          yOffset = e.targetTouches[0].clientY - rect.top;
          window.addEventListener('touchmove', dragObject, true);
      }
  }

  /*Drag object*/
  function dragObject(e) {
      e.preventDefault();
      e.stopPropagation();

      if (dragObj == null) {
          return; // if there is no object being dragged then do nothing
      } else if (e.type == "mousemove") {
          dragObj.style.left = e.clientX - xOffset + "px"; // adjust location of dragged object so doesn't jump to mouse position
          dragObj.style.top = e.clientY - yOffset + "px";
      } else if (e.type == "touchmove") {
          dragObj.style.left = e.targetTouches[0].clientX - xOffset + "px"; // adjust location of dragged object so doesn't jump to mouse position
          dragObj.style.top = e.targetTouches[0].clientY - yOffset + "px";
      }
  }

  /*End dragging*/
  document.onmouseup = function (e) {
      if (dragObj) {
          dragObj = null;
          window.removeEventListener('mousemove', dragObject, true);
          window.removeEventListener('touchmove', dragObject, true);
      }
  }
}