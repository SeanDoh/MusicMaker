let gridHeight = 10;    // number of squares vertical
let gridWidth = 10;     // number of squares horizontal
let squareHeight = 10;  // pixel heigh of a square
let squareWidth = 20;   // pixel width of a square
let topLimit = (gridHeight * squareHeight) - squareHeight;
let leftLimit = (gridWidth * squareWidth) - squareWidth;

let dragElement = '';   // store active square reference here when moving a square
let dragElementOrigin = { x: '', y: '' }; // origin to reset to if drop spot is taken when moving a square
let isDragging = false; // track if you are dragging a square here

let expandElement = ''; // store active square reference here when expanding a square
let expandElementOrigin = { x: '', y: '' };
let isExpanding = false;
let isExpandingLeft = false;
let isExandingRight = false;

document.addEventListener('mousemove', processDragging);
document.addEventListener('mouseup', processMouseup);
// create grid, append to app, add listeners
let grid = createGrid(gridHeight, gridWidth, squareWidth, squareHeight, 'grid-drums');
document.getElementById('app').append(grid.html);
grid.html.addEventListener('dblclick', processGridDblClicks);
grid.html.addEventListener('mousedown', processGridClicks);


function createGrid(gridHeight, gridWidth, squareWidth, squareHeight, id) {

  let grid = document.createElement('div');
  grid.setAttribute('class', 'grid');
  grid.setAttribute('id', id);

  for (let i = 0; i < gridHeight; i++) {

    let gridRow = document.createElement('div');
    gridRow.setAttribute('class', 'grid-row');
    gridRow.setAttribute('id', `grid-row-${i}`);

    for (let k = 0; k < gridWidth; k++) {

      let gridSquare = document.createElement('div');
      gridSquare.setAttribute('class', 'grid-square');
      gridSquare.setAttribute('id', `grid-square-r${i}-c${k}`);
      gridSquare.style.height = squareHeight + 'px';
      gridSquare.style.width = squareWidth + 'px';

      gridRow.append(gridSquare);
    }
    grid.append(gridRow);
  }

  return {
    html: grid
  };
}

// add an active square to the grid
// and remove active square from grid
// needs width and height of grid
function processGridDblClicks(e) {
  let gridReference = document.getElementById('grid-drums');
  // XY relative to grid html element
  let mouseXY = getMouseXY(gridReference, squareWidth, squareHeight, e);
  let activeSquareList = document.getElementsByClassName('grid-square-active');

  // if you click on existing active square, delete it
  if (/active/g.test(e.target.id)) {
    e.target.parentNode.removeChild(e.target);
  }
  // if you click on expand element of active square
  // delete that bad larry's parent
  else if (/expand/g.test(e.target.id)){
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }
  // else try and place a new one
  else {
    // first, check if there are active squares
    // if there are no active square, add an active square
    if (activeSquareList.length < 1) {
      //console.log('test')
      gridReference.append(makeActiveSquare(mouseXY, squareHeight, squareWidth));
    }
    // else, loop through the active square list and compare its XY (from ID) against mouseXY
    else {
      let activeSquareMatch = false;  // tracking if there are matching active squares
      for (let i = 0; i < activeSquareList.length; i++) {
        let regex = activeSquareList[i].id.match(/\d/g);
        let activeSquareCoordinates = {
          x: parseInt(regex[1], 10),
          y: parseInt(regex[0], 10)
        }
        // if we match an active square, break and don't make a new one
        if (JSON.stringify(activeSquareCoordinates) === JSON.stringify(mouseXY)) {
          activeSquareMatch = true;
          break;
        }
      }
      // after scanning all the active squares, if there wasn't a match, then make a new square
      if (!activeSquareMatch) {
        gridReference.append(makeActiveSquare(mouseXY, squareHeight, squareWidth));
      }
    }
  }
}

// start moving an active square here
// start expanding an active square here
function processGridClicks(e) {
  e.preventDefault();
  let gridReference = document.getElementById('grid-drums');
  // XY relative to grid html element
  let mouseXY = getMouseXY(gridReference, squareWidth, squareHeight, e);

  // to figure out what active square you clicked
  // scan all active squares, and compare it's coordinats to the mouseXY
  let activeSquareList = document.getElementsByClassName('grid-square-active');
  for (let i = 0; i < activeSquareList.length; i++) {
    let regex = activeSquareList[i].id.match(/\d/g);
    let activeSquareCoordinates = {
      x: parseInt(regex[1], 10),
      y: parseInt(regex[0], 10)
    }
    // found active square that matches the current mousexy
    if (JSON.stringify(activeSquareCoordinates) === JSON.stringify(mouseXY)) {
      // now need to check if we are moving the element or expanding it
      if (/expand/g.test(e.target.id)) {
        isExpanding = true;
        expandElement = activeSquareList[i];
        expandElement.id = 'expand-' + expandElement.id;
        expandElementOrigin = activeSquareCoordinates;
        if(/left/g.test(e.target.id)){
          isExpandingLeft = true;
        }
        else{
          isExandingRight = true;
        }
        break;
      }
      else {
        dragElement = activeSquareList[i];
        dragElement.id = 'drag-' + dragElement.id;
        dragElementOrigin = activeSquareCoordinates;
        isDragging = true;
        break;
      }
    }
  }
}

function processDragging(e) {
  // need preventDefault or weird behavior
  // because user can select and drag which messes up click event processing
  e.preventDefault();

  // if you're dragging an active square
  if (isDragging) {
    // if you are moving inside the grid
    // change the coordinates of the dragging element as you move.
    if (/grid/g.test(e.target.id)) {
      let gridReference = document.getElementById('grid-drums');
      let mouseXY = getMouseXY(gridReference, squareWidth, squareHeight, e);
      // some issue when dragging down, it might show the active square
      // outside the bounds of the grid, so check the grid limits
      // defined globally
      if ((mouseXY.y * squareHeight) > topLimit) {
        dragElement.style.top = topLimit + 'px';
      }
      else {
        dragElement.style.top = (mouseXY.y * squareHeight) + 'px';
      }
      if((mouseXY.x * squareWidth) > leftLimit){
        dragElement.style.left = leftLimit + 'px';
      }
      else{
        dragElement.style.left = (mouseXY.x * squareWidth) + 'px';
      }
      // add drag to ID so we can match on mouseup
      dragElement.setAttribute('id', `drag-grid-square-active-r${mouseXY.y}-c${mouseXY.x}`);
    }
  }

  // if you're expanding an active square
  if (isExpanding){

    let gridReference = document.getElementById('grid-drums');
    let mouseXY = getMouseXY(gridReference, squareWidth, squareHeight, e);

    if(isExandingRight){

      let expandSize = (mouseXY.x - expandElementOrigin.x) + 1;
      let newWidth = ''

      // if mouse x is outside the grid, limit the max width of the active square
      if(mouseXY.x > gridWidth - 1){
        expandSize = ((gridWidth - 1) - expandElementOrigin.x) + 1;
      }
      // else if mouse x is less that origin position, limit min width of active square
      else if(mouseXY.x < expandElementOrigin.x){
        expandSize = 1;
      }

      // after checking above, compute new width, and assign it to the active square.
      newWidth = squareWidth * expandSize;
      expandElement.style.width = newWidth + 'px';
    }
    else{

      let expandSize = (expandElementOrigin.x - mouseXY.x) + 1;
      let newWidth = '';
      let newLeft = mouseXY.x * squareWidth;

      // when moving left, first, set the new left of the active square
      // but first, check that the mouse is still inside the grid
      if(mouseXY.x < 0){
        newLeft = 0;
        expandSize = expandElementOrigin.x + 1;
      }
      else if (mouseXY.x > expandElementOrigin.x){
        newLeft = expandElementOrigin.x * squareWidth;
        expandSize = 1;
      }
      newWidth = squareWidth * expandSize;
      expandElement.style.left = newLeft + 'px';
      // and then set it's width
      expandElement.style.width = newWidth + 'px';
      
      expandElement.id = expandElement.id.slice(0,-1) + mouseXY.x.toString();
    }
  }
}

function processMouseup(e) {

  let gridReference = document.getElementById('grid-drums');
  let mouseXY = getMouseXY(gridReference, squareWidth, squareHeight, e);

  // if dragging element on mouseup
  // check if active square is already there
  // if it is, replace with draggin square
  if (isDragging) {

    // but before we do that, check if mouse is in the grid
    // or if mouse is on a expand element
    // if we are, proceed
    if (/grid/g.test(e.target.id) || /expand/g.test(e.target.id)) {

      // if current mouse position doesn't match origin, proceed
      if (!(JSON.stringify(mouseXY) === JSON.stringify(dragElementOrigin))) {

        let activeSquareList = document.getElementsByClassName('grid-square-active');

        // tracking if no matches
        // if there is a match, replace the matched square
        // with the dragging square
        let activeSquareMatch = false;

        // loop through all the active squares
        for (let i = 0; i < activeSquareList.length; i++) {

          // use regex to get numbers from the ID we set earlier
          let regex = activeSquareList[i].id.match(/\d/g);
          let activeSquareCoordinates = {
            x: parseInt(regex[1], 10),
            y: parseInt(regex[0], 10)
          }
          if (JSON.stringify(activeSquareCoordinates) === JSON.stringify(mouseXY)) {

            // we added drag to the ID earlier so we can match it here
            if (!(/drag/g.test(activeSquareList[i].id))) {
              // remove the matched square
              activeSquareList[i].parentNode.removeChild(activeSquareList[i]);
              dragElement.id = dragElement.id.slice(5);
              dragElementOrigin = { x: '', y: '' };
              dragElement = '';
              isDragging = false;
              activeSquareMatch = true;
              break;
            }
          }
        }
        // if no matches, the dragElement can stay in place
        if (!activeSquareMatch) {
          dragElement.id = dragElement.id.slice(5);
          dragElementOrigin = { x: '', y: '' };
          dragElement = '';
          isDragging = false;
        }
      }
      // else, just leave the drag element be
      else {
        dragElement.id = dragElement.id.slice(5);
        dragElement.style.left = (dragElementOrigin.x * squareWidth) + 'px';
        dragElement.style.top = (dragElementOrigin.y * squareHeight) + 'px';
        dragElementOrigin = { x: '', y: '' };
        dragElement = '';
        isDragging = false;
      }
    }
    // if we are not in the grid, just reset the position of the square
    // too much work otherwise
    else {
      dragElement.id = `grid-square-active-r${dragElementOrigin.y}-c${dragElementOrigin.x}`
      dragElement.style.left = (dragElementOrigin.x * squareWidth) + 'px';
      dragElement.style.top = (dragElementOrigin.y * squareHeight) + 'px';
      console.log(dragElement.style.left)
      console.log(dragElement.style.top)
      dragElementOrigin = { x: '', y: '' };
      dragElement = '';
      isDragging = false;
    }
  }

  if (isExpanding) {
    expandElement.id = expandElement.id.slice(7);
    expandElement = '';
    expandElementOrigin = { x: '', y: '' };
    isExpanding = false;
    isExpandingLeft = false;
    isExandingRight = false;
  }
}

// make an active square
function makeActiveSquare(mouseXY, squareHeight, squareWidth) {
  let activeSquare = document.createElement('div');
  activeSquare.setAttribute('class', 'grid-square-active');
  activeSquare.setAttribute('id', `grid-square-active-r${mouseXY.y}-c${mouseXY.x}`);
  activeSquare.setAttribute('style', `height: ${squareHeight}px;
                                      width: ${squareWidth}px;
                                      top: ${mouseXY.y * squareHeight}px;
                                      left: ${mouseXY.x * squareWidth}px;`);
  activeSquare.style.height = squareHeight + 'px';
  activeSquare.style.width = squareWidth + 'px';
  activeSquare.style.top = (mouseXY.y * squareHeight) + 'px';
  activeSquare.style.left = (mouseXY.x * squareWidth) + 'px';

  let leftExpand = document.createElement('div');
  leftExpand.setAttribute('class', 'left-expand expand');
  leftExpand.setAttribute('id', `left-expand-r${mouseXY.y}-c${mouseXY.x}`);

  let rightExpand = document.createElement('div');
  rightExpand.setAttribute('class', 'right-expand expand');
  rightExpand.setAttribute('id', `right-expand-r${mouseXY.y}-c${mouseXY.x}`);

  activeSquare.append(leftExpand);
  activeSquare.append(rightExpand);

  return activeSquare;
}

// get the X and Y position of the mouse in the grid
// returns Object of Ints
// Uses getBoundingClientRect() to get the coordinates of the corners of the grid
// relative to the viewport, and then calculates the X and Y position in the grid
// based off the width and height of an individual grid square and the coordinates
// of the mouse click event
function getMouseXY(gridReference, squareWidth, squareHeight, evt) {
  let rect = gridReference.getBoundingClientRect();
  let width = parseInt(window.getComputedStyle(gridReference).width, 10);
  let height = parseInt(window.getComputedStyle(gridReference).height, 10);
  return {
    x: Math.floor(((evt.clientX - rect.left) / (rect.right - rect.left) * width) / squareWidth),
    y: Math.floor(((evt.clientY - rect.top) / (rect.bottom - rect.top) * height) / squareHeight)
  };
}