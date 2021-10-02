const $ = require("jQuery");

// generate an empty matrix of numDrums x length
function generateMatrix(length, numDrums) {
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
function clearMatrixRow(matrix, row, measureLength) {
    let newMatrix = matrix;
    for (let i = 0; i < measureLength; i++) {
        $("#b" + row + "-" + i).css("background-color", "rgb(116, 112, 133)");
        $("#b" + row + "-" + i).addClass("shad");
        newMatrix[row][i] = 0;
    }
    return newMatrix;
}
// increase/decrease size of matrix if measure length increases
function increaseMatrixLength(matrix, length){
    let newMatrix = matrix;
    for(let i = 0; i < newMatrix.length; i++){
        for (let k = 0; k < length; k++){
            if (k >= newMatrix[i].length){
                newMatrix[i].push(0);
            }
        }
    }
    return newMatrix;
}
function decreaseMatrixLength(matrix, length){
    let newMatrix = matrix;
    for(let i = 0; i < newMatrix.length; i++){
        for (let k = newMatrix[i].length; k > length; k--){
            if (k >= length){
                newMatrix[i].splice(-1,1);
            }
        }
    }
    return newMatrix;
}

module.exports = {
    generateMatrix:generateMatrix,
    clearMatrix:clearMatrix,
    clearMatrixRow:clearMatrixRow,
    increaseMatrixLength:increaseMatrixLength,
    decreaseMatrixLength:decreaseMatrixLength
}