const grid = require('./grid.js');

let app = document.getElementById('app');

let drums = new grid.Grid('drums', 40, 10, 20, 20);
app.append(drums.create());