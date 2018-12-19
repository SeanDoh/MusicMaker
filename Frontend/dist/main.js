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

/***/ "./js/functionality/htmlGen.js":
/*!*************************************!*\
  !*** ./js/functionality/htmlGen.js ***!
  \*************************************/
/*! exports provided: createGrid, createControls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createGrid\", function() { return createGrid; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createControls\", function() { return createControls; });\n// This file contains helper functions to generate html\nvar miscFns = __webpack_require__(/*! ./miscFns.js */ \"./js/functionality/miscFns.js\");\n/*  creates the grid of squares for each sequencer\r\n    type = type of sequencer (drums or melody)\r\n    sounds = list sounds for each row (length of this is numRows)\r\n    measureNum = number of measure\r\n    timeSig = time signature\r\n*/\n\n\nvar createGrid = function createGrid(type, sounds, measureNum, timeSig) {\n  var html = [];\n\n  for (var i = 0; i < sounds.length; i++) {\n    html.push(\"\\n            <div class='sequencer-row' id='row\".concat(i, \"-\").concat(type, \"'>\\n                <div class='row-name' id='row-name\").concat(i, \"-\").concat(type, \"'></div>\\n                \").concat(createRow(type, measureNum, i, timeSig), \"\\n            </div>\\n            \") //<div class='sequencer-row-clear-${type} fa${i} button-highlight' id='row-clear${i}'><i class='fa fa-times fa${i}'></i></div>\n    );\n  }\n\n  return html.join('\\n');\n}; // creates the rows for each sequencer\n\n\nvar createRow = function createRow(type, measureNum, rowNum, timeSig) {\n  var gridLength = miscFns.calcGridLenth(timeSig, measureNum);\n  var html = [];\n\n  for (var i = 0; i < gridLength; i++) {\n    html.push(\"<div class='grid-\".concat(type, \"' id='sb\").concat(rowNum, \"-\").concat(i, \"-\").concat(type, \"'></div>\"));\n  }\n\n  return html.join('\\n');\n}; // create controls for each sequencer\n\n\nvar createControls = function createControls(type) {\n  return \"\\n            <button class='sequencer-type button-highlight' id='\".concat(type, \"-select'>\").concat(type.charAt(0).toUpperCase() + type.slice(1), \"</button>\\n            <div class='controls-button-container'>\\n                <button class='sequencer-start' id='start-\").concat(type, \"'><i class='fa fa-play'></i></button>\\n                <button class='sequencer-stop' id='stop-\").concat(type, \"'><i class='fa fa-stop'></i></button>\\n                <button class='sequencer-clear' id='clear-\").concat(type, \"'><i class='fa fa-trash'></i></button>\\n            </div>\\n            <div class='controls-sliders'>\\n                <div class='menu-highlight'>\\n                    <button class='sequencer-volume' id='volume-\").concat(type, \"'><i class='fa fa-volume-up' id='sq-vol-\").concat(type, \"'></i></button>\\n                    <input type='range' class='sequencer-volume-slider' id='sequencer-volume-slider-\").concat(type, \"' min='-60' max='0' value='-15'>\\n                </div>\\n                <div class='menu-highlight'>\\n                    <button class='sequencer-measure' id='measure-\").concat(type, \"'><i class='fa fa-braille' aria-hidden='true'></i></button>\\n                    <input type='range' class='sequencer-measure-slider' id='sequencer-measure-slider-\").concat(type, \"' min='1' max='4' value='1'>\\n                </div>                \\n            </div>\\n            \");\n};\n\n\n\n//# sourceURL=webpack:///./js/functionality/htmlGen.js?");

/***/ }),

/***/ "./js/functionality/keyboard.js":
/*!**************************************!*\
  !*** ./js/functionality/keyboard.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var mapClicks = function mapClicks() {\n  // piano show/hide/select button click\n  var drums = document.getElementById('drums-container');\n  var melody = document.getElementById('melody-container');\n  var keyboard = document.getElementById('keyboard-container');\n  document.getElementById('keyboard-select').addEventListener('click', function (e) {\n    keyboard.style.display = 'block';\n    drums.style.display = 'none';\n    melody.style.display = 'none';\n  });\n};\n\nmodule.exports = {\n  mapClicks: mapClicks\n};\n\n//# sourceURL=webpack:///./js/functionality/keyboard.js?");

/***/ }),

/***/ "./js/functionality/matrix.js":
/*!************************************!*\
  !*** ./js/functionality/matrix.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// This file contains helper functions to create and manage the matrix\n// that stores note data for sequencer\nvar createMatrix = function createMatrix(sounds, measureNum, timeSig) {\n  var matrix = [];\n  var matrixLength = timeSigCalc(measureNum, timeSig);\n\n  for (var i = 0; i < sounds.length; i++) {\n    matrix.push([]);\n\n    for (var k = 0; k < matrixLength; k++) {\n      matrix[i].push(0);\n    }\n  }\n\n  return matrix;\n};\n\nvar clearMatrix = function clearMatrix() {};\n\nvar increaseMartrixColumns = function increaseMartrixColumns() {};\n\nvar decreaseMartrixColumns = function decreaseMartrixColumns() {};\n\nvar timeSigCalc = function timeSigCalc(measureNum, timeSig) {\n  switch (timeSig[1]) {\n    case 1:\n      return measureNum * (timeSig[0] * 16);\n\n    case 2:\n      return measureNum * (timeSig[0] * 8);\n\n    case 4:\n      return measureNum * (timeSig[0] * 4);\n\n    case 8:\n      return measureNum * (timeSig[0] * 2);\n\n    case 16:\n      return measureNum * timeSig[0];\n\n    default:\n      return;\n  }\n\n  return;\n};\n\nmodule.exports = {\n  createMatrix: createMatrix,\n  clearMatrix: clearMatrix,\n  increaseMartrixColumns: increaseMartrixColumns,\n  decreaseMartrixColumns: decreaseMartrixColumns\n};\n\n//# sourceURL=webpack:///./js/functionality/matrix.js?");

/***/ }),

/***/ "./js/functionality/miscFns.js":
/*!*************************************!*\
  !*** ./js/functionality/miscFns.js ***!
  \*************************************/
/*! exports provided: getRow, getCol, addDragElement, removeDragElement, calcGridLenth, createTopGridElement, calcNewId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRow\", function() { return getRow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCol\", function() { return getCol; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addDragElement\", function() { return addDragElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeDragElement\", function() { return removeDragElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calcGridLenth\", function() { return calcGridLenth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createTopGridElement\", function() { return createTopGridElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calcNewId\", function() { return calcNewId; });\n// For misc functions that don't fit anywhere else cleanly\nvar getRow = function getRow(elementId) {\n  return parseInt(elementId.match(/\\d+/)[0], 10);\n};\n\nvar getCol = function getCol(elementId) {\n  return parseInt(elementId.match(/\\d+-\\d+/)[0].slice(2).replace(/-/, ''), 10);\n}; // create square on top of the grid\n\n\nvar createTopGridElement = function createTopGridElement(type, row, col, refOffsetTop, refOffsetLeft, gridElementHeight, gridElementWidth) {\n  var newGridDiv = document.createElement('div');\n  newGridDiv.setAttribute('id', \"tsb\".concat(row, \"-\").concat(col, \"-\").concat(type));\n  newGridDiv.className = \"top-grid-\".concat(type);\n  newGridDiv.style.top = refOffsetTop + gridElementHeight * row + 'px';\n  newGridDiv.style.left = refOffsetLeft + gridElementWidth * col + 'px';\n  newGridDiv.innerHTML = \"\\n  <div class='inner-drag-\".concat(type, \"-left' id='isb\").concat(row, \"-\").concat(col, \"-\").concat(type, \"-left'></div>\\n  <div class='inner-drag-\").concat(type, \"-right' id='isb\").concat(row, \"-\").concat(col, \"-\").concat(type, \"-right'></div>\\n  \");\n  document.getElementById(\"\".concat(type, \"-grid\")).appendChild(newGridDiv);\n}; // add drag element to grid square when it is turned on\n\n\nvar addDragElement = function addDragElement(htmlElement, type, row, col) {\n  htmlElement.innerHTML = \"<div class='inner-drag-\".concat(type, \"' id='isb\").concat(row, \"-\").concat(col, \"-\").concat(type, \"'></div>\");\n};\n\nvar removeDragElement = function removeDragElement(htmlElement) {\n  htmlElement.innerHTML = '';\n};\n\nvar calcNewId = function calcNewId(htmlElement, refWidth, refHeight, refLeft, refTop, type) {\n  var left = parseInt(htmlElement.style.left, 10);\n  var top = parseInt(htmlElement.style.top, 10);\n  var row = Math.floor((top - refTop) / refHeight);\n  var col = Math.floor(left / refWidth);\n  htmlElement.id = \"tsb\".concat(row, \"-\").concat(col, \"-\").concat(type);\n  htmlElement.innerHTML = \"\\n  <div class='inner-drag-\".concat(type, \"-left' id='isb\").concat(row, \"-\").concat(col, \"-\").concat(type, \"-left'></div>\\n  <div class='inner-drag-\").concat(type, \"-right' id='isb\").concat(row, \"-\").concat(col, \"-\").concat(type, \"-right'></div>\\n  \"); //console.log(htmlElement.offsetLeft + \" \" + htmlElement.offsetTop)\n}; // calculate grid lenght based on time sig\n\n\nvar calcGridLenth = function calcGridLenth(timeSig, measureNum) {\n  switch (timeSig[1]) {\n    case 1:\n      return measureNum * (timeSig[0] * 16);\n\n    case 2:\n      return measureNum * (timeSig[0] * 8);\n\n    case 4:\n      return measureNum * (timeSig[0] * 4);\n\n    case 8:\n      return measureNum * (timeSig[0] * 2);\n\n    case 16:\n      return measureNum * timeSig[0];\n\n    default:\n      break;\n  }\n};\n\n\n\n//# sourceURL=webpack:///./js/functionality/miscFns.js?");

/***/ }),

/***/ "./js/functionality/netReqs.js":
/*!*************************************!*\
  !*** ./js/functionality/netReqs.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// somewhat generic xml wrapper function\nfunction networkRequest(type, url, data) {\n  return new Promise(function (resolve, reject) {\n    var req = new XMLHttpRequest();\n    req.open(type, url);\n    req.setRequestHeader('Content-Type', 'application/json');\n\n    req.onreadystatechange = function () {\n      if (req.status != 200) {\n        reject(JSON.parse(req));\n      } else if (req.readyState == 4) {\n        resolve(JSON.parse(req.response));\n      }\n    };\n\n    type == 'GET' ? req.send() : req.send(JSON.stringify(data));\n  });\n}\n\nmodule.exports = {\n  netReq: networkRequest\n};\n\n//# sourceURL=webpack:///./js/functionality/netReqs.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var drums = __webpack_require__(/*! ./sequencer/drums.js */ \"./js/sequencer/drums.js\");\n\nvar melody = __webpack_require__(/*! ./sequencer/melody.js */ \"./js/sequencer/melody.js\");\n\nvar keyboard = __webpack_require__(/*! ./functionality/keyboard.js */ \"./js/functionality/keyboard.js\");\n\nvar sequencer = __webpack_require__(/*! ./sequencer/sequencer.js */ \"./js/sequencer/sequencer.js\");\n\nvar drumSeq = new drums.Drums();\nvar melodySeq = new melody.Melody();\ndrumSeq.create();\nmelodySeq.create();\nkeyboard.mapClicks(); //sequencer.globalMouseup();\n\nmakeDragable('#sequencer-info', '#app');\ndocument.addEventListener('mouseup', function (e) {\n  drumSeq.unDrag();\n  melodySeq.unDrag();\n});\n\nfunction makeDragable(dragHandle, dragTarget) {\n  var dragObj = null; //object to be moved\n\n  var xOffset = 0; //used to prevent dragged object jumping to mouse location\n\n  var yOffset = 0;\n  document.querySelector(dragHandle).addEventListener(\"mousedown\", startDrag, true);\n  document.querySelector(dragHandle).addEventListener(\"touchstart\", startDrag, true);\n  /*sets offset parameters and starts listening for mouse-move*/\n\n  function startDrag(e) {\n    e.preventDefault();\n    e.stopPropagation();\n    dragObj = document.querySelector(dragTarget); //dragObj.style.position = \"absolute\";\n\n    var rect = dragObj.getBoundingClientRect();\n\n    if (e.type == \"mousedown\") {\n      xOffset = e.clientX - rect.left; //clientX and getBoundingClientRect() both use viewable area adjusted when scrolling aka 'viewport'\n\n      yOffset = e.clientY - rect.top;\n      window.addEventListener('mousemove', dragObject, true);\n    } else if (e.type == \"touchstart\") {\n      xOffset = e.targetTouches[0].clientX - rect.left;\n      yOffset = e.targetTouches[0].clientY - rect.top;\n      window.addEventListener('touchmove', dragObject, true);\n    }\n  }\n  /*Drag object*/\n\n\n  function dragObject(e) {\n    e.preventDefault();\n    e.stopPropagation();\n\n    if (dragObj == null) {\n      return; // if there is no object being dragged then do nothing\n    } else if (e.type == \"mousemove\") {\n      dragObj.style.left = e.clientX - xOffset + \"px\"; // adjust location of dragged object so doesn't jump to mouse position\n\n      dragObj.style.top = e.clientY - yOffset + \"px\";\n    } else if (e.type == \"touchmove\") {\n      dragObj.style.left = e.targetTouches[0].clientX - xOffset + \"px\"; // adjust location of dragged object so doesn't jump to mouse position\n\n      dragObj.style.top = e.targetTouches[0].clientY - yOffset + \"px\";\n    }\n  }\n  /*End dragging*/\n\n\n  document.onmouseup = function (e) {\n    if (dragObj) {\n      dragObj = null;\n      window.removeEventListener('mousemove', dragObject, true);\n      window.removeEventListener('touchmove', dragObject, true);\n    }\n  };\n}\n\n//# sourceURL=webpack:///./js/index.js?");

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

eval("var htmlGen = __webpack_require__(/*! ../functionality/htmlGen.js */ \"./js/functionality/htmlGen.js\");\n\nvar api = __webpack_require__(/*! ../functionality/netReqs.js */ \"./js/functionality/netReqs.js\");\n\nvar matrix = __webpack_require__(/*! ../functionality/matrix.js */ \"./js/functionality/matrix.js\");\n\nvar miscFns = __webpack_require__(/*! ../functionality/miscFns.js */ \"./js/functionality/miscFns.js\");\n\nvar onColor = 'rgb(60, 62, 187)';\nvar offColor = 'rgb(128, 128, 128)';\nvar gridElementWidth = 0;\nvar gridElementHeight = 0; // NOTE NOT SURE HOW TO GET ARROW FUNCTIONS\n// TO WORK WITH PROTOTYPAL INHERITANCE\n// sequencer object\n\nfunction Sequencer(type, isHidden) {\n  this.type = type; // type of sequencer, percussion or melodic\n\n  this.matrix = []; // 2d array for story data of sequencer grid\n\n  this.sounds = [1, 2, 3, 4, 5, 6, 7, 8, 9];\n  this.timeSig = [4, 4];\n  this.measureLength = 1;\n  this.gridLength = 0; // number of columns in grid\n\n  this.gridWidth = 0; // width of grid container in px\n\n  this.isHidden = isHidden;\n  this.isPlaying = false;\n  this.refLeft = 0;\n  this.refRightmostLeft = 0;\n  this.refRight = 0;\n  this.refTop = 0;\n  this.refBottom = 0;\n  this.gridElementWidth = 0; // original width\n\n  this.gridElementHeight = 0; // original height\n\n  this.dragGridElementWidth = 0; // temp width reference for expansion\n\n  this.moveDrag = false; // trackin 4 draggin\n\n  this.leftDrag = false;\n  this.rightDrag = false;\n  this.dragElement = '';\n  this.gridX = 0;\n  this.gridY = 0;\n  this.refClientX = 0; // store clientX on drag to compare back to how much it changed\n\n  this.refClientY = 0; // ' ' but y\n\n  this.ogDragLeftRefX = 0; // drag left reference left coord before expanding\n} // creates grid of squares\n// generate HTML with helper functions, then add to the DOM\n\n\nSequencer.prototype.create = function () {\n  var grid = htmlGen.createGrid(this.type, this.sounds, this.measureLength, [4, 4]);\n  this.matrix = matrix.createMatrix(this.sounds, this.measureLength, [4, 4]);\n  var controls = htmlGen.createControls(this.type);\n  document.getElementById(this.type + '-grid').innerHTML = grid;\n  document.getElementById(this.type + '-controls').innerHTML = controls;\n  this.gridLength = miscFns.calcGridLenth(this.timeSig, this.measureLength);\n  var tempLeftGridElement = document.getElementById(\"sb0-0-drums\");\n  var tempRightGridElement = document.getElementById(\"sb0-\".concat(this.gridLength - 1, \"-drums\"));\n  var tempBottomGridElement = '';\n  this.gridElementWidth = parseInt(getComputedStyle(tempLeftGridElement).getPropertyValue('width'), 10);\n  this.gridElementHeight = parseInt(getComputedStyle(tempLeftGridElement).getPropertyValue('height'), 10);\n  this.refLeft = tempLeftGridElement.offsetLeft;\n  this.refRightmostLeft = tempRightGridElement.offsetLeft;\n  this.refRight = this.refRightmostLeft + this.gridElementWidth + this.refLeft - 1;\n  this.refTop = tempLeftGridElement.offsetTop; // set temp bottom reference per sequencer type (melody is different row length than drums)\n\n  if (this.type === 'drums') tempBottomGridElement = document.getElementById(\"sb\".concat(this.sounds.length - 1, \"-0-drums\"));else tempBottomGridElement = document.getElementById(\"sb\".concat(this.sounds.length - 1, \"-0-melody\"));\n  this.refBottom = tempBottomGridElement.offsetTop; // set grid container width for reference when expanding\n\n  this.gridWidth = this.gridLength * this.gridElementWidth;\n  this.mapClicks();\n}; // set dragging trackers to falsey\n\n\nSequencer.prototype.unDrag = function () {\n  // BUG - the width of the element sometimes hangs over the edge\n  // Temp fix - on mouseup, shrink size\n  if (this.dragElement != '') {\n    var tempWidth = !this.dragElement.style.width ? this.gridElementWidth : parseInt(this.dragElement.style.width, 10);\n    var dragElementRight = parseInt(this.dragElement.style.left, 10) + tempWidth + this.refLeft - 1;\n\n    if (tempWidth > this.gridElementWidth && dragElementRight > this.refRight) {\n      this.dragElement.style.width = tempWidth - (dragElementRight - this.refRight) + 'px';\n    }\n  }\n\n  this.moveDrag = false;\n  this.leftDrag = false;\n  this.rightDrag = false;\n  this.dragElement = '';\n  this.gridX = 0;\n  this.gridY = 0;\n  this.refClientX = 0;\n  this.refClientY = 0;\n};\n\nSequencer.prototype.mapClicks = function () {\n  var _this = this;\n\n  // buttons for switching between sequencers\n  var drums = document.getElementById('drums-container');\n  var melody = document.getElementById('melody-container');\n  var keyboard = document.getElementById('keyboard-container');\n  document.getElementById(\"\".concat(this.type, \"-select\")).addEventListener('click', function (e) {\n    if (e.target.id === 'drums-select') {\n      drums.style.display = 'block';\n      melody.style.display = 'none';\n      keyboard.style.display = 'none';\n    } else if (e.target.id === 'melody-select') {\n      melody.style.display = 'block';\n      drums.style.display = 'none';\n      keyboard.style.display = 'none';\n    }\n  }); // when grid clicked, add new element on top of it with position:absolute\n  // and then position the element in reference to the top left grid via\n  // column and row numbers stored via ID of the html element of the grid\n\n  document.getElementById(\"\".concat(this.type, \"-grid\")).addEventListener('dblclick', function (e) {\n    // get coords of top left grid element for reference\n    if (e.target.id.slice(0, 2) === 'sb') {\n      var row = miscFns.getRow(e.target.id);\n      var col = miscFns.getCol(e.target.id);\n      miscFns.createTopGridElement(_this.type, row, col, _this.refTop, _this.refLeft, _this.gridElementHeight, _this.gridElementWidth);\n    } else if (e.target.id.slice(0, 3) === 'tsb') e.target.remove();\n  });\n  document.getElementById(\"\".concat(this.type, \"-grid\")).addEventListener('mousedown', function (e) {\n    var expandDirection = e.target.id.match(/\\b(left|right)/g); // move square around\n\n    if (e.target.id.slice(0, 3) === 'tsb') {\n      console.log('move');\n      _this.moveDrag = true;\n      _this.dragElement = e.target;\n      _this.gridX = parseInt(getComputedStyle(e.target).getPropertyValue('left'), 10);\n      _this.gridY = parseInt(getComputedStyle(e.target).getPropertyValue('top'), 10);\n      _this.refClientX = Math.floor(e.clientX / _this.gridElementWidth);\n      _this.refClientY = Math.floor(e.clientY / _this.gridElementHeight);\n    } else if (expandDirection != null) {\n      // DRAG RIGHT INIT\n      if (expandDirection[0] === 'right') {\n        console.log('right');\n        _this.rightDrag = true;\n        _this.dragElement = e.target.parentNode;\n        _this.dragGridElementWidth = parseInt(getComputedStyle(_this.dragElement).getPropertyValue('width'), 10);\n        _this.refClientX = e.clientX;\n      } // DRAG LEFT INIT\n      else {\n          console.log('left');\n          _this.leftDrag = true;\n          _this.dragElement = e.target.parentNode;\n          _this.ogDragLeftRefX = parseInt(_this.dragElement.style.left, 10);\n        }\n    }\n  }); // when moving a grid element, its top limit is \n\n  document.addEventListener('mousemove', function (e) {\n    // move grid element\n    if (_this.moveDrag) {\n      // width of element being dragged\n      // used for resizing the drag element if it goes over the edge of the grid container\n      var tempWidth = !_this.dragElement.style.width ? _this.gridElementWidth : parseInt(_this.dragElement.style.width, 10); // new coordinates\n\n      var newLeft = (Math.floor(e.clientX / _this.gridElementWidth) - _this.refClientX) * _this.gridElementWidth + _this.gridX;\n\n      var newTop = (Math.floor(e.clientY / _this.gridElementHeight) - _this.refClientY) * _this.gridElementHeight + _this.gridY; // right coords of dragElement\n      // used for resizing the drag element if it goes over the edge of the grid container\n\n\n      var dragElementRight = parseInt(_this.dragElement.style.left, 10) + tempWidth + _this.refLeft - 1; // HORIZONTAL MOVEMENT\n      // right limit\n\n      if (newLeft > _this.refRightmostLeft) {\n        _this.dragElement.style.width = _this.gridElementWidth + 'px';\n        _this.dragElement.style.left = _this.refRightmostLeft + 'px';\n      } // left limit\n      else if (newLeft < _this.refLeft) _this.dragElement.style.left = _this.refLeft + 'px'; // left(the DOM value left) within grid\n        else {\n            // shrink the width of the grid element if its width goes over the edge of the \n            // grid container\n            // BUG - the width of the element sometimes hangs over the edge\n            // Temp fix - on mouseup, attempt the same shrink below - see mouseup listener\n            if (tempWidth > _this.gridElementWidth && dragElementRight > _this.refRight) {\n              _this.dragElement.style.width = tempWidth - (dragElementRight - _this.refRight) + 'px';\n            }\n\n            _this.dragElement.style.left = newLeft + 'px';\n          } // VERTICAL MOVEMENT\n      // top limit\n\n\n      if (newTop < _this.refTop) _this.dragElement.style.top = _this.refTop + 'px'; // bottom limit\n      else if (newTop > _this.refBottom) _this.dragElement.style.top = _this.refBottom + 'px'; // top within grid\n        else {\n            _this.dragElement.style.top = newTop + 'px';\n          } // calculate new ID for the grid element based on its new position\n\n      miscFns.calcNewId(_this.dragElement, _this.gridElementWidth, _this.gridElementHeight, _this.refLeft, _this.refTop, _this.type);\n    } // expand right\n    // increase size\n    else if (_this.rightDrag) {\n        var newWidth = e.clientX - _this.refClientX + _this.dragGridElementWidth; // min size limit\n\n        if (newWidth < _this.gridElementWidth) _this.dragElement.style.width = _this.gridElementWidth + 'px';else {\n          var col = miscFns.getCol(_this.dragElement.id);\n          var maxRight = _this.gridWidth - col * _this.gridElementWidth; // max size limit\n\n          if (newWidth > maxRight) _this.dragElement.style.width = maxRight + 'px'; // within limits\n          else _this.dragElement.style.width = newWidth + 'px';\n        }\n      } // expand left\n      // move to left and expand right\n      else if (_this.leftDrag) {\n          var _newLeft = (Math.floor(e.clientX / _this.gridElementWidth) - _this.refClientX) * _this.gridElementWidth + _this.refLeft;\n\n          var _tempWidth = !_this.dragElement.style.width ? _this.gridElementWidth : parseInt(_this.dragElement.style.width, 10);\n\n          console.log(_this.dragElement.style.width);\n\n          var _newWidth = _tempWidth + (_this.ogDragLeftRefX - _newLeft); // left limit\n\n\n          if (_newLeft < _this.refLeft) _this.dragElement.style.left = _this.refLeft + 'px'; // originial position limit (i.e. dont move the element further right than it was originally)\n          else if (_newLeft > _this.ogDragLeftRefX) {// don't do anything?\n            } else {\n              _this.dragElement.style.left = _newLeft + 'px';\n              _this.dragElement.style.width = _newWidth + 'px';\n            }\n        }\n  }); // #region shit\n  // #endregion shit\n};\n\nmodule.exports = {\n  Sequencer: Sequencer\n  /*,\r\n  globalMouseup:globalMouseup*/\n\n};\n\n//# sourceURL=webpack:///./js/sequencer/sequencer.js?");

/***/ })

/******/ });