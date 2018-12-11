/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/components/htmlGen.js":
/*!**********************************!*\
  !*** ./js/components/htmlGen.js ***!
  \**********************************/
/*! exports provided: createGrid, createControls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createGrid\", function() { return createGrid; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createControls\", function() { return createControls; });\n// This file contains helper functions to generate html\n// maybe one day I will use a framework ¯\\_(ツ)_/¯\n\n/*  creates the grid of squares for each sequencer\r\n    type = type of sequencer (drums or melody)\r\n    sounds = list sounds for each row (length of this is numRows)\r\n    measureNum = number of measure\r\n    timeSig = time signature\r\n*/\nvar createGrid = function createGrid(type, sounds, measureNum, timeSig) {\n  var html = [];\n\n  for (var i = 0; i < sounds.length; i++) {\n    html.push(\"\\n                <div class='sequencer-row' id='row\".concat(i, \"-\").concat(type, \"'>\\n                    <div class='row-name' id='row-name\").concat(i, \"-\").concat(type, \"'></div>\\n                    \").concat(createRow(type, measureNum, i, timeSig), \"\\n                    <div class='sequencer-row-clear-\").concat(type, \" fa\").concat(i, \" button-highlight' id='row-clear\").concat(i, \"'><i class='fa fa-times fa\").concat(i, \"'></i></div>\\n                </div>\\n                \"));\n  }\n\n  return html.join('\\n');\n}; // creates the rows for each sequencer\n\n\nvar createRow = function createRow(type, measureNum, rowNum, timeSig) {\n  var gridLength = 0;\n\n  switch (timeSig[1]) {\n    case 1:\n      gridLength = measureNum * (timeSig[0] * 16);\n      break;\n\n    case 2:\n      gridLength = measureNum * (timeSig[0] * 8);\n      break;\n\n    case 4:\n      gridLength = measureNum * (timeSig[0] * 4);\n      break;\n\n    case 8:\n      gridLength = measureNum * (timeSig[0] * 2);\n      break;\n\n    case 16:\n      gridLength = measureNum * timeSig[0];\n      break;\n\n    default:\n      break;\n  }\n\n  var html = [];\n\n  for (var i = 0; i < gridLength; i++) {\n    html.push(\"<div class='grid-\".concat(type, \"' id='sb\").concat(rowNum, \"-\").concat(i, \"-\").concat(type, \"'></div>\"));\n  }\n\n  return html.join('\\n');\n}; // create controls for each sequencer\n\n\nvar createControls = function createControls(type) {\n  return \"\\n            <button class='sequencer-type button-highlight' id='\".concat(type, \"-select'>\").concat(type.charAt(0).toUpperCase() + type.slice(1), \"</button>\\n            <div class='controls-button-container'>\\n                <button class='sequencer-start' id='start-\").concat(type, \"'><i class='fa fa-play'></i></button>\\n                <button class='sequencer-stop' id='stop-\").concat(type, \"'><i class='fa fa-stop'></i></button>\\n                <button class='sequencer-clear' id='clear-\").concat(type, \"'><i class='fa fa-trash'></i></button>\\n            </div>\\n            <div class='controls-sliders'>\\n                <div class='menu-highlight'>\\n                    <button class='sequencer-volume' id='volume-\").concat(type, \"'><i class='fa fa-volume-up' id='sq-vol-\").concat(type, \"'></i></button>\\n                    <input type='range' class='sequencer-volume-slider' id='sequencer-volume-slider-\").concat(type, \"' min='-60' max='0' value='-15'>\\n                </div>\\n                <div class='menu-highlight'>\\n                    <button class='sequencer-measure' id='measure-\").concat(type, \"'><i class='fa fa-braille' aria-hidden='true'></i></button>\\n                    <input type='range' class='sequencer-measure-slider' id='sequencer-measure-slider-\").concat(type, \"' min='1' max='4' value='1'>\\n                </div>                \\n            </div>\\n            \");\n};\n\n\n\n//# sourceURL=webpack:///./js/components/htmlGen.js?");

/***/ }),

/***/ "./js/components/keyboard.js":
/*!***********************************!*\
  !*** ./js/components/keyboard.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var mapClicks = function mapClicks() {\n  // piano show/hide/select button click\n  var drums = document.getElementById('drums-container');\n  var melody = document.getElementById('melody-container');\n  var keyboard = document.getElementById('keyboard-container');\n  document.getElementById('keyboard-select').addEventListener('click', function (e) {\n    keyboard.style.display = 'block';\n    drums.style.display = 'none';\n    melody.style.display = 'none';\n  });\n};\n\nmodule.exports = {\n  mapClicks: mapClicks\n};\n\n//# sourceURL=webpack:///./js/components/keyboard.js?");

/***/ }),

/***/ "./js/components/matrix.js":
/*!*********************************!*\
  !*** ./js/components/matrix.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// This file contains helper functions to create and manage the matrix\n// that stores note data for sequencer\nvar createMatrix = function createMatrix(sounds, measureNum, timeSig) {\n  var matrix = [];\n  var matrixLength = timeSigCalc(measureNum, timeSig);\n\n  for (var i = 0; i < sounds.length; i++) {\n    matrix.push([]);\n\n    for (var k = 0; k < matrixLength; k++) {\n      matrix[i].push(0);\n    }\n  }\n\n  return matrix;\n};\n\nvar clearMatrix = function clearMatrix() {};\n\nvar increaseMartrixColumns = function increaseMartrixColumns() {};\n\nvar decreaseMartrixColumns = function decreaseMartrixColumns() {};\n\nvar timeSigCalc = function timeSigCalc(measureNum, timeSig) {\n  switch (timeSig[1]) {\n    case 1:\n      return measureNum * (timeSig[0] * 16);\n\n    case 2:\n      return measureNum * (timeSig[0] * 8);\n\n    case 4:\n      return measureNum * (timeSig[0] * 4);\n\n    case 8:\n      return measureNum * (timeSig[0] * 2);\n\n    case 16:\n      return measureNum * timeSig[0];\n\n    default:\n      return;\n  }\n\n  return;\n};\n\nmodule.exports = {\n  createMatrix: createMatrix,\n  clearMatrix: clearMatrix,\n  increaseMartrixColumns: increaseMartrixColumns,\n  decreaseMartrixColumns: decreaseMartrixColumns\n};\n\n//# sourceURL=webpack:///./js/components/matrix.js?");

/***/ }),

/***/ "./js/components/miscFns.js":
/*!**********************************!*\
  !*** ./js/components/miscFns.js ***!
  \**********************************/
/*! exports provided: getRow, getCol, addDragElement, removeDragElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRow\", function() { return getRow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCol\", function() { return getCol; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addDragElement\", function() { return addDragElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeDragElement\", function() { return removeDragElement; });\n// For misc functions that don't fit anywhere else cleanly\nvar getRow = function getRow(elementId) {\n  return elementId.match(/\\d+/)[0];\n};\n\nvar getCol = function getCol(elementId) {\n  return elementId.match(/\\d+-\\d+/)[0].slice(2).replace(/-/, '');\n}; // add drag element to grid square when it is turned on\n\n\nvar addDragElement = function addDragElement(htmlElement, type, row, col) {\n  htmlElement.innerHTML = \"<div class='inner-grid-\".concat(type, \"' id='isb\").concat(row, \"-\").concat(col, \"-\").concat(type, \"'></div>\");\n};\n\nvar removeDragElement = function removeDragElement(htmlElement) {\n  htmlElement.innerHTML = '';\n};\n\n\n\n//# sourceURL=webpack:///./js/components/miscFns.js?");

/***/ }),

/***/ "./js/components/netReqs.js":
/*!**********************************!*\
  !*** ./js/components/netReqs.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// somewhat generic xml wrapper function\nfunction networkRequest(type, url, data) {\n  return new Promise(function (resolve, reject) {\n    var req = new XMLHttpRequest();\n    req.open(type, url);\n    req.setRequestHeader('Content-Type', 'application/json');\n\n    req.onreadystatechange = function () {\n      if (req.status != 200) {\n        reject(JSON.parse(req));\n      } else if (req.readyState == 4) {\n        resolve(JSON.parse(req.response));\n      }\n    };\n\n    type == 'GET' ? req.send() : req.send(JSON.stringify(data));\n  });\n}\n\nmodule.exports = {\n  netReq: networkRequest\n};\n\n//# sourceURL=webpack:///./js/components/netReqs.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var drums = __webpack_require__(/*! ./sequencer/drums.js */ \"./js/sequencer/drums.js\");\n\nvar melody = __webpack_require__(/*! ./sequencer/melody.js */ \"./js/sequencer/melody.js\");\n\nvar keyboard = __webpack_require__(/*! ./components/keyboard.js */ \"./js/components/keyboard.js\");\n\nvar sequencer = __webpack_require__(/*! ./sequencer/sequencer.js */ \"./js/sequencer/sequencer.js\");\n\nvar drumSeq = new drums.Drums();\nvar melodySeq = new melody.Melody();\ndrumSeq.create();\nmelodySeq.create();\nkeyboard.mapClicks();\nsequencer.globalMouseup();\n/*document.addEventListener(\"dragstart\", function( e ) {\r\n  console.log(e.target.id)\r\n})\r\ndocument.addEventListener(\"dragend\", function( e ) {\r\n  console.log('shit')\r\n})*/\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ }),

/***/ "./js/sequencer/drums.js":
/*!*******************************!*\
  !*** ./js/sequencer/drums.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var sequencer = __webpack_require__(/*! ./sequencer.js */ \"./js/sequencer/sequencer.js\"); // Drum object, inherit from sequencer\n\n\nfunction Drums() {\n  sequencer.Sequencer.call(this, 'drums', false);\n}\n\nDrums.prototype = Object.create(sequencer.Sequencer.prototype);\nmodule.exports = {\n  Drums: Drums\n};\n\n//# sourceURL=webpack:///./js/sequencer/drums.js?");

/***/ }),

/***/ "./js/sequencer/melody.js":
/*!********************************!*\
  !*** ./js/sequencer/melody.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var sequencer = __webpack_require__(/*! ./sequencer.js */ \"./js/sequencer/sequencer.js\"); // Melody object, inherit from sequencer\n\n\nfunction Melody() {\n  sequencer.Sequencer.call(this, 'melody', true);\n}\n\nMelody.prototype = Object.create(sequencer.Sequencer.prototype);\nmodule.exports = {\n  Melody: Melody\n};\n\n//# sourceURL=webpack:///./js/sequencer/melody.js?");

/***/ }),

/***/ "./js/sequencer/sequencer.js":
/*!***********************************!*\
  !*** ./js/sequencer/sequencer.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var htmlGen = __webpack_require__(/*! ../components/htmlGen.js */ \"./js/components/htmlGen.js\");\n\nvar api = __webpack_require__(/*! ../components/netReqs.js */ \"./js/components/netReqs.js\");\n\nvar matrix = __webpack_require__(/*! ../components/matrix.js */ \"./js/components/matrix.js\");\n\nvar miscFns = __webpack_require__(/*! ../components/miscFns.js */ \"./js/components/miscFns.js\");\n\nvar onColor = 'rgb(60, 62, 187)';\nvar offColor = 'rgb(128, 128, 128)'; // tracks if user is dragging/expanding a grid square horizontally\n// needs to be global for document eventlistener for mouseup\n\nvar isDragging = false; // NOTE NOT SURE HOW TO GET ARROW FUNCTIONS\n// TO WORK WITH PROTOTYPAL INHERITANCE\n// sequencer object\n\nfunction Sequencer(type, isHidden) {\n  this.type = type; // type of sequencer, percussion or melodic\n\n  this.matrix = []; // 2d array for story data of sequencer grid\n\n  this.sounds = [1, 2, 3, 4, 5, 6, 7, 8, 9];\n  this.measureLength = 1;\n  this.isHidden = isHidden;\n  this.isPlaying = false;\n} // creates grid of squares\n// generate HTML with helper functions, then add to the DOM\n\n\nSequencer.prototype.create = function () {\n  var grid = htmlGen.createGrid(this.type, this.sounds, this.measureLength, [4, 4]);\n  this.matrix = matrix.createMatrix(this.sounds, this.measureLength, [4, 4]);\n  var controls = htmlGen.createControls(this.type);\n  document.getElementById(this.type + '-grid').innerHTML = grid;\n  document.getElementById(this.type + '-controls').innerHTML = controls;\n  this.mapClicks();\n};\n\nSequencer.prototype.mapClicks = function () {\n  var _this = this;\n\n  // buttons for switching between sequencers\n  var drums = document.getElementById('drums-container');\n  var melody = document.getElementById('melody-container');\n  var keyboard = document.getElementById('keyboard-container');\n  document.getElementById(this.type + '-select').addEventListener('click', function (e) {\n    if (e.target.id === 'drums-select') {\n      drums.style.display = 'block';\n      melody.style.display = 'none';\n      keyboard.style.display = 'none';\n    } else if (e.target.id === 'melody-select') {\n      melody.style.display = 'block';\n      drums.style.display = 'none';\n      keyboard.style.display = 'none';\n    }\n  }); // grid clicks\n  // get list of all grid elements, loop through them and add event listeners\n\n  var mouseEnteredUnclicked = false; // tracks status of mouse entering and leaving\n\n  var gridElements = document.getElementsByClassName('grid-' + this.type);\n\n  for (var i = 0; i < gridElements.length; i++) {\n    // click listener\n    gridElements[i].addEventListener('click', function (e) {\n      // there's nested div inside each grid element, so need to check for that\n      if (e.target.id.charAt(0) != 'i') {\n        var state = getComputedStyle(e.target).getPropertyValue('background-color');\n        var col = miscFns.getCol(e.target.id);\n        var row = miscFns.getRow(e.target.id);\n\n        if (state === offColor) {\n          e.target.style.backgroundColor = onColor;\n          miscFns.addDragElement(e.target, _this.type, row, col);\n          _this.matrix[row][col] = 1;\n        } else {\n          e.target.style.backgroundColor = offColor;\n          miscFns.removeDragElement(e.target);\n          _this.matrix[row][col] = 0;\n        }\n      }\n    }); // mouseover and out listeners, needs to use tracking from above, mouseEnteredClicked\n\n    gridElements[i].addEventListener('mouseover', function (e) {\n      // need to check is user is dragging, and for inner element\n      if (isDragging) {\n        return;\n      } else if (e.target.id.charAt(0) != 'i') {\n        var state = getComputedStyle(e.target).getPropertyValue('background-color');\n        var col = miscFns.getCol(e.target.id);\n        var row = miscFns.getRow(e.target.id); // if mouse enters and is unclicked\n\n        if (e.buttons === 0 && (state === offColor || onColor)) mouseEnteredUnclicked = true; // if mouse enters and is clicked and bg is off\n        else if (e.buttons === 1 && state === offColor) {\n            e.target.style.backgroundColor = onColor;\n            _this.matrix[row][col] = 1;\n            miscFns.addDragElement(e.target, _this.type, row, col);\n            mouseEnteredUnclicked = false;\n          } // if mouse enters and is clicked and bg is on\n          else if (e.buttons === 1 && state === onColor) {\n              e.target.style.backgroundColor = offColor;\n              miscFns.removeDragElement(e.target);\n              _this.matrix[row][col] = 0;\n              mouseEnteredUnclicked = false;\n            }\n      }\n    });\n    gridElements[i].addEventListener('mouseout', function (e) {\n      // need to check is user is dragging, and for inner element\n      if (isDragging) {\n        return;\n      } else if (e.target.id.charAt(0) != 'i') {\n        var state = getComputedStyle(e.target).getPropertyValue('background-color');\n        var col = miscFns.getCol(e.target.id);\n        var row = miscFns.getRow(e.target.id); // if mouse leaves and is clicked and bg is off\n\n        if (e.buttons === 1 && state === offColor && mouseEnteredUnclicked) {\n          e.target.style.backgroundColor = onColor;\n          miscFns.addDragElement(e.target, _this.type, row, col);\n          _this.matrix[row][col] = 1;\n          mouseEnteredUnclicked = false;\n        } // if mouse leaves and is clicked and bg is on\n        else if (e.buttons === 1 && state === onColor && mouseEnteredUnclicked) {\n            e.target.style.backgroundColor = offColor;\n            miscFns.removeDragElement(e.target);\n            _this.matrix[row][col] = 0;\n            mouseEnteredUnclicked = false;\n          }\n      }\n    });\n  }\n\n  var startingX = 0;\n  var newX = 0;\n  var newWidth = 0;\n  var extendElement = '';\n  var originalWidth = ''; // mouse listener on grid containers\n\n  document.getElementById(\"\".concat(this.type, \"-grid\")).addEventListener('mousedown', function (e) {\n    startingX = 0;\n\n    if (e.target.id.charAt(0) === 'i') {\n      extendElement = e.target.parentElement;\n      originalWidth = getComputedStyle(extendElement).getPropertyValue('width');\n      isDragging = true;\n      startingX = e.clientX;\n    }\n  });\n  document.getElementById(\"\".concat(this.type, \"-grid\")).addEventListener('mouseup', function (e) {\n    if (isDragging) {\n      isDragging = false; //endX = e.clientX;\n      //newWidth = endX - startingX;\n      //console.log(extendElement);\n      //extendElement.style.width = newWidth.toString() + 'px';\n    }\n  });\n  document.getElementById(\"\".concat(this.type, \"-grid\")).addEventListener('mousemove', function (e) {\n    if (isDragging) {\n      newX = e.clientX;\n      newWidth = newX - startingX;\n      extendElement.style.width = newWidth.toString() + 'px';\n      console.log(e.clientX);\n    }\n  }); // grid drags\n\n  var innerGridElements = document.getElementsByClassName('inner-grid-' + this.type);\n\n  for (var _i = 0; _i < innerGridElements.length; _i++) {\n    innerGridElements[_i].addEventListener('ondrag', function (e) {\n      console.log('test');\n    });\n  }\n}; // eventlistener for whole document if when dragging, user leaves the sequencer container\n\n\nglobalMouseup = function globalMouseup() {\n  document.addEventListener('mouseup', function (e) {\n    isDragging = false;\n  });\n};\n\nmodule.exports = {\n  Sequencer: Sequencer,\n  globalMouseup: globalMouseup\n};\n\n//# sourceURL=webpack:///./js/sequencer/sequencer.js?");

/***/ })

/******/ });