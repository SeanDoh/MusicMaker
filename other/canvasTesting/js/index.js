// #region canvas
/* canvas is grid basically
 0____________________
0|_|_|_^_|_|_|_|_|_|_|X
 |_|_|_Y_|_|_|_|_|_|_|
 |<-X->↓_|_|_|_|_|_|_| h
 |_|_|_|     |_|_|_|_| e
 |_|_|_|     |_|_|_|_| i
 |_|_|_|_____|_|_|_|_| g
 |_|_|_|_|_|_|_|_|_|_| h
 |_|_|_|_|_|_|_|_|_|_| t
 |_|_|_|_|_|_|_|_|_|_|
 Y      w i d t h

 Origin is top left (0,0)
 All elements are places relative to this origin
 So top left corner of the square becomes X pixels from left
 and y pixels from top

 basic commands
 fillRect(x, y, width, height)
     Draws a filled rectangle.
 strokeRect(x, y, width, height)
     Draws a rectangular outline.
 clearRect(x, y, width, height)
     Clears the specified rectangular area, making it fully transparent. 
*/
// #endregion canvas

// make grid by drawing small squares repeatedly

// get the canvas from html
const canvas = document.getElementById('canvas');

// get 2d context to draw on canvas with
const ctx = canvas.getContext('2d');

console.log(canvas);
console.log(ctx);

/* since making a grid:
  canvas width = width of single grid square * number of squares horizontally
  canvas height = height of single grid square * number of squares vertically
*/
let squareWidth = 20;
let squareHeight = 20;
let horizontalSquares = 10;
let verticalSquares = 10;
let canvasWidth = canvas.width = squareWidth * horizontalSquares;
let canvasHeight = canvas.height = squareHeight * verticalSquares;

ctx.lineWidth = 1;

// loop through horizontalSquares and verticalSquares and draw the squares
for (let i = 0; i < horizontalSquares; i++) {
  for (let k = 0; k < verticalSquares; k++) {
    ctx.strokeRect(i*squareWidth, k*squareHeight, squareWidth, squareWidth);
  }
}

console.log(canvas.getBoundingClientRect())

// now add a click listener

canvas.addEventListener('click', (e) => {
  console.log(getMousePos(canvas, e));
})

// function to get mouse position relvative to the canvas
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
      x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  };
}