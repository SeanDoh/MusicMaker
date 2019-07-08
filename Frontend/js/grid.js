function Grid(type, gridWidth, gridHeight, squareWidth, squareHeight) {
  this.html = '';
  this.type = type; // DRUMS or MELODY
  this.gridWidth = gridWidth;
  this.gridHeight = gridHeight;
  this.squareWidth = squareWidth;
  this.squareHeight = squareHeight;
}

// creates an HTML element representing the grid
Grid.prototype.create = function () {
  let grid = document.createElement('div');
  grid.setAttribute('class', 'grid');
  grid.setAttribute('id', `grid-${this.type}`);
  grid.style.width = this.gridWidth * this.squareWidth + 'px';
  grid.style.height = this.gridHeight * this.squareHeight + 'px';
  this.html = grid;
  return grid;
}

module.exports = {
  Grid: Grid
}