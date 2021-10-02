const $ = require('jquery');

// generate an empty matrix of numDrums x length
function createMatrix(length, numDrums) {
    let newMatrix = [];
    for (let i = 0; i < numDrums; i++) {
        newMatrix.push([]);
        for (let k = 0; k < length; k++) {
            newMatrix[i].push(0);
        }
    }
    return newMatrix;
}
// call to reset matrix
function clearMatrix(matrix) {
    let newMatrix = matrix;
    for (let i = 0; i < newMatrix.length; i++) {
        for (let k = 0; k < newMatrix[0].length; k++) {
            newMatrix[i][k] = 0;
        }
    }
    return newMatrix;
}
// call to clear single row of matrix
function clearMatrixRow(matrix, row, measureLength, type) {
    let newMatrix = matrix;
    for (let i = 0; i < measureLength; i++) {
        $('#sb' + row + '-' + i + '-' + type).css('background-color', 'rgb(116, 112, 133)');
        $('#sb' + row + '-' + i + '-' + type).addClass('shadow');
        newMatrix[row][i] = 0;
    }
    return newMatrix;
}
// increase/decrease size of matrix if measure length increases
function increaseMatrixLengthHorizontal(matrix, length) {
    let newMatrix = matrix;
    for (let i = 0; i < newMatrix.length; i++) {
        for (let k = 0; k < length; k++) {
            if (k >= newMatrix[i].length) {
                newMatrix[i].push(0);
            }
        }
    }
    return newMatrix;
}
function decreaseMatrixLengthHorizontal(matrix, length) {
    let newMatrix = matrix;
    for (let i = 0; i < newMatrix.length; i++) {
        for (let k = newMatrix[i].length; k > length; k--) {
            if (k >= length) {
                newMatrix[i].splice(-1, 1);
            }
        }
    }
    return newMatrix;
}
function increaseMatrixLengthVertical(matrix, vertLength, horzLength) {
    let newMatrix = matrix;
    for (let i = 0; i <= vertLength; i++) {
        if (i >= newMatrix.length){
            newMatrix.push([]);
            for (let k = 0; k < horzLength; k++) {
                newMatrix[i].push(0)
            }
        }
    }
    return newMatrix;
}
function decreaseMatrixLengthVertical(matrix, vertLength) {
    let newMatrix = matrix;
    for (let i = newMatrix.length; i > vertLength; i--) {
        newMatrix = newMatrix.slice(0,-1);
    }
    return newMatrix;
}
function createEmptyPartEvents(measureLength) {
    let events = [];
    for (let i = 0; i < measureLength; i++) {
        events.push({time:'0:0:'+ i,note:'C3'});
    }
    return events;
}

module.exports = {
    createMatrix: createMatrix,
    clearMatrix: clearMatrix,
    clearMatrixRow: clearMatrixRow,
    increaseMatrixLengthHorizontal: increaseMatrixLengthHorizontal,
    decreaseMatrixLengthHorizontal: decreaseMatrixLengthHorizontal,
    increaseMatrixLengthVertical:increaseMatrixLengthVertical,
    decreaseMatrixLengthVertical:decreaseMatrixLengthVertical,
    createEmptyPartEvents: createEmptyPartEvents
}