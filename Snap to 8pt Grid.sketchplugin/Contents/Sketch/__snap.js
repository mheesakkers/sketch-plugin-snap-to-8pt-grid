var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/snap.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/snap.js":
/*!*********************!*\
  !*** ./src/snap.js ***!
  \*********************/
/*! exports provided: snap, settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "snap", function() { return snap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

function snap(context) {
  // Document & Selection
  var document = sketch__WEBPACK_IMPORTED_MODULE_0__["Document"].getSelectedDocument();
  var selection = document.selectedLayers; // Run

  if (!selection.isEmpty) {
    // Get setting for grid type
    var amount_point_grid = sketch__WEBPACK_IMPORTED_MODULE_0__["Settings"].documentSettingForKey(document, 'gridType') || 8; // !important Specify type which gets snapped in manifests identifiers

    var commands = [context.command.identifier().replace('snap-', '')]; // Split up if there are multiple types to snap to

    commands = commands[0].split("-"); // Snap

    commands.forEach(function (type) {
      selection.layers.forEach(function (layer) {
        var key = "frame";

        if (type == "lineHeight" || type == "fontSize") {
          key = "style";
        }

        if (layer[key][type]) {
          var offset = layer[key][type] % amount_point_grid;

          if (offset < amount_point_grid * 0.5) {
            layer[key][type] -= offset;
          } else {
            layer[key][type] += amount_point_grid - offset;
          }
        }
      });
    }); // Message

    sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].message("👌Snapped to " + amount_point_grid + "pt grid!");
  } else {
    sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].message("It seems you haven't selected any layers");
  }
}
function settings(context) {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0__["Document"].getSelectedDocument();
  sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].getInputFromUser("Change point grid setting", {
    type: sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].INPUT_TYPE.selection,
    possibleValues: ['2pt Grid', '4pt Grid', '6pt Grid', '8pt Grid', '10pt Grid', '12pt Grid', '16pt Grid'],
    initialValue: (sketch__WEBPACK_IMPORTED_MODULE_0__["Settings"].documentSettingForKey(document, 'gridType') || 8) + 'pt Grid'
  }, function (err, value) {
    if (err) {
      // most likely the user canceled the input
      return;
    }

    var point_value = value.split('pt Grid')[0];
    sketch__WEBPACK_IMPORTED_MODULE_0__["Settings"].setDocumentSettingForKey(document, 'gridType', point_value || 8);
  });
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['snap'] = __skpm_run.bind(this, 'snap');
globalThis['onRun'] = __skpm_run.bind(this, 'default');
globalThis['snap'] = __skpm_run.bind(this, 'snap');
globalThis['snap'] = __skpm_run.bind(this, 'snap');
globalThis['snap'] = __skpm_run.bind(this, 'snap');
globalThis['snap'] = __skpm_run.bind(this, 'snap');
globalThis['snap'] = __skpm_run.bind(this, 'snap');
globalThis['snap'] = __skpm_run.bind(this, 'snap');
globalThis['snap'] = __skpm_run.bind(this, 'snap');
globalThis['settings'] = __skpm_run.bind(this, 'settings')

//# sourceMappingURL=__snap.js.map