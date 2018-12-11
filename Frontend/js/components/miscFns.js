// For misc functions that don't fit anywhere else cleanly

let getRow = (elementId) => {
  return elementId.match(/\d+/)[0];
}
let getCol = (elementId) => {
  return elementId.match(/\d+-\d+/)[0].slice(2).replace(/-/, '');
}

export {getRow, getCol};