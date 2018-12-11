// For misc functions that don't fit anywhere else cleanly

let getRow = (elementId) => {
  return elementId.match(/\d+/)[0];
}
let getCol = (elementId) => {
  return elementId.match(/\d+-\d+/)[0].slice(2).replace(/-/, '');
}
// add drag element to grid square when it is turned on
let addDragElement = (htmlElement, type, row, col) => {
  htmlElement.innerHTML = `<div class='inner-grid-${type}' id='isb${row}-${col}-${type}'></div>`;
}
let removeDragElement = (htmlElement) => {
  htmlElement.innerHTML = '';
}

export {getRow, getCol, addDragElement, removeDragElement};