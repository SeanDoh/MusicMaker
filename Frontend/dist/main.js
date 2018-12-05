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

/***/ "./js/html/htmlGen.js":
/*!****************************!*\
  !*** ./js/html/htmlGen.js ***!
  \****************************/
/*! exports provided: createGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createGrid\", function() { return createGrid; });\n// This file contains helper functions to generate html\n// maybe one day I will use a framework ¯\\_(ツ)_/¯\n\n/*  type = type of sequencer (drums or melody)\r\n    sounds = list sounds for each row (length of this is numRows)\r\n    measureNum = number of measure\r\n    timeSig = time signature\r\n*/\nvar createGrid = function createGrid(type, sounds, measureNum, timeSig) {\n  console.log('enter');\n  var html = [];\n\n  for (var i = 0; i < sounds.length; i++) {\n    html.push(\"\\n                <div class='sequencer-row' id='row\".concat(i, \"-\").concat(type, \"'>\\n                    <div class='row-name' id='row-name\").concat(i, \"-\").concat(type, \"'></div>\\n                    \").concat(createRow(type, measureNum, i, timeSig), \"\\n                    <div class='sequencer-row-clear-\").concat(type, \" fa\").concat(i, \"' id='row-clear\").concat(i, \"'><i class='fa fa-times fa\").concat(i, \"'></i></div>\\n                </div>\\n                \"));\n  }\n\n  return html.join('\\n');\n};\n\nvar createRow = function createRow(type, measureNum, rowNum, timeSig) {\n  var gridLength = 0;\n\n  switch (timeSig[1]) {\n    case 1:\n      gridLength = measureNum * (timeSig[0] * 16);\n      break;\n\n    case 2:\n      gridLength = measureNum * (timeSig[0] * 8);\n      break;\n\n    case 4:\n      gridLength = measureNum * (timeSig[0] * 4);\n      break;\n\n    case 8:\n      gridLength = measureNum * (timeSig[0] * 2);\n      break;\n\n    case 16:\n      gridLength = measureNum * timeSig[0];\n      break;\n\n    default:\n      break;\n  }\n\n  var html = [];\n\n  for (var i = 0; i < gridLength; i++) {\n    html.push(\"<div class='beat-\".concat(type, \"' id='sb\").concat(rowNum, \"-\").concat(i, \"-\").concat(type, \"'></div>\"));\n  }\n\n  return html.join('\\n');\n};\n\n\n\n//# sourceURL=webpack:///./js/html/htmlGen.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var drums = __webpack_require__(/*! ./sequencer/drums.js */ \"./js/sequencer/drums.js\");\n\nvar melody = __webpack_require__(/*! ./sequencer/melody.js */ \"./js/sequencer/melody.js\");\n\nvar drumSeq = new drums.Drums();\nvar melodySeq = new melody.Melody();\ndrumSeq.create();\nmelodySeq.create();\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ }),

/***/ "./js/sequencer/drums.js":
/*!*******************************!*\
  !*** ./js/sequencer/drums.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var sequencer = __webpack_require__(/*! ./sequencer.js */ \"./js/sequencer/sequencer.js\"); // Drum object, inherit from sequencer\n\n\nfunction Drums() {\n  sequencer.Sequencer.call(this, 'drums');\n}\n\nDrums.prototype = Object.create(sequencer.Sequencer.prototype);\nmodule.exports = {\n  Drums: Drums\n};\n\n//# sourceURL=webpack:///./js/sequencer/drums.js?");

/***/ }),

/***/ "./js/sequencer/melody.js":
/*!********************************!*\
  !*** ./js/sequencer/melody.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var sequencer = __webpack_require__(/*! ./sequencer.js */ \"./js/sequencer/sequencer.js\"); // Melody object, inherit from sequencer\n\n\nfunction Melody() {\n  sequencer.Sequencer.call(this, 'melody');\n}\n\nMelody.prototype = Object.create(sequencer.Sequencer.prototype);\nmodule.exports = {\n  Melody: Melody\n};\n\n//# sourceURL=webpack:///./js/sequencer/melody.js?");

/***/ }),

/***/ "./js/sequencer/sequencer.js":
/*!***********************************!*\
  !*** ./js/sequencer/sequencer.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var htmlGen = __webpack_require__(/*! ../html/htmlGen.js */ \"./js/html/htmlGen.js\"); // NOTE NOT SURE HOW TO GET ARROW FUNCTIONS\n// TO WORK WITH PROTOTYPAL INHERITANCE\n// sequencer object\n\n\nfunction Sequencer(type) {\n  this.type = type; // type of sequencer, percussion or melodic\n\n  this.matrix = []; // 2d array for story data of sequencer grid\n\n  this.sounds = [1, 2, 3, 4, 5, 6, 7, 8, 9];\n  this.isHidden = false;\n  this.isPlaying = false;\n}\n\nSequencer.prototype.create = function () {\n  var grid = htmlGen.createGrid(this.type, this.sounds, 1, [4, 4]);\n  document.getElementById(this.type + '-grid').innerHTML = grid;\n};\n\nmodule.exports = {\n  Sequencer: Sequencer\n};\n\n//# sourceURL=webpack:///./js/sequencer/sequencer.js?");

/***/ })

/******/ });