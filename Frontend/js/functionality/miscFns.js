// For misc functions that don't fit anywhere else cleanly

let getRow = (elementId) => {
  return parseInt(elementId.match(/\d+/)[0], 10);
}
let getCol = (elementId) => {
  return parseInt(elementId.match(/\d+-\d+/)[0].slice(2).replace(/-/, ''), 10);
}
// create square on top of the grid
let createTopGridElement = (type, row, col, refOffsetTop, refOffsetLeft, gridElementHeight, gridElementWidth) => {
  let newGridDiv = document.createElement('div');
  newGridDiv.setAttribute('id', `tsb${row}-${col}-${type}`);
  newGridDiv.className = `top-grid-${type}`;
  newGridDiv.style.top = refOffsetTop + (gridElementHeight * row) + 'px';
  newGridDiv.style.left = refOffsetLeft + (gridElementWidth * col) + 'px';
  newGridDiv.innerHTML = 
  `
  <div class='inner-drag-${type}-left' id='isb${row}-${col}-${type}-left'></div>
  <div class='inner-drag-${type}-right' id='isb${row}-${col}-${type}-right'></div>
  `
  document.getElementById(`${type}-grid`).appendChild(newGridDiv);
}

// add drag element to grid square when it is turned on
let addDragElement = (htmlElement, type, row, col) => {
  htmlElement.innerHTML = `<div class='inner-drag-${type}' id='isb${row}-${col}-${type}'></div>`;
}
let removeDragElement = (htmlElement) => {
  htmlElement.innerHTML = '';
}

let calcNewId = (htmlElement, refWidth, refHeight, refLeft, refTop, type) => {
  let left = parseInt(htmlElement.style.left, 10);
  let top = parseInt(htmlElement.style.top, 10);
  let row = Math.floor((top - refTop)/refHeight);
  let col = Math.floor(left/refWidth);
  htmlElement.id = `tsb${row}-${col}-${type}`
  htmlElement.innerHTML = 
  `
  <div class='inner-drag-${type}-left' id='isb${row}-${col}-${type}-left'></div>
  <div class='inner-drag-${type}-right' id='isb${row}-${col}-${type}-right'></div>
  `
  //console.log(htmlElement.offsetLeft + " " + htmlElement.offsetTop)
}

// calculate grid lenght based on time sig
let calcGridLenth = (timeSig, measureNum) => {
  switch (timeSig[1]) {
    case 1:
      return measureNum * (timeSig[0] * 16);
    case 2:
      return measureNum * (timeSig[0] * 8);
    case 4:
      return measureNum * (timeSig[0] * 4);
    case 8:
      return measureNum * (timeSig[0] * 2);
    case 16:
      return measureNum * timeSig[0];
    default:
      break;
  }
}

export {
  getRow,
  getCol,
  addDragElement,
  removeDragElement,
  calcGridLenth,
  createTopGridElement,
  calcNewId
};