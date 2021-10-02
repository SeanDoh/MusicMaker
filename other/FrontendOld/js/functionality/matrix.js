// This file contains helper functions to create and manage the matrix
// that stores note data for sequencer

let createMatrix = (sounds, barNum, timeSig) => {
  let matrix = [];
  let matrixLength = timeSigCalc(barNum, timeSig);
  for (let i = 0; i < sounds.length; i++) {
    matrix.push([]);
    for (let k = 0; k < matrixLength; k++) {
      matrix[i].push(0);
    }
  }
  return matrix;
}

let clearMatrix = () => {

}

let increaseMartrixColumns = () => {

}

let decreaseMartrixColumns = () => {

}

let timeSigCalc = (barNum, timeSig) => {
  switch (timeSig[1]) {
    case 1:
      return barNum * (timeSig[0] * 16);
    case 2:
      return barNum * (timeSig[0] * 8);
    case 4:
      return barNum * (timeSig[0] * 4);
    case 8:
      return barNum * (timeSig[0] * 2);
    case 16:
      return barNum * timeSig[0];
    default:
      return;
  }
  return;
}

module.exports = {
  createMatrix: createMatrix,
  clearMatrix: clearMatrix,
  increaseMartrixColumns: increaseMartrixColumns,
  decreaseMartrixColumns: decreaseMartrixColumns
}