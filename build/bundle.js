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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var buildResultsList = exports.buildResultsList = function buildResultsList(data) {
  // make sure previous list is removed for the new one to appear in place
  $(".results-list").remove();

  // Print which page you're at along with the info how many pages there are
  var pageSize = parseInt(currentParams[2].slice(currentParams[2].indexOf("=") + 1));
  var lastPage;
  if (pageSize === 100) lastPage = 656;else lastPage = 66;
  $(".list-control-page-num").html("Page " + currentParams[1].slice(currentParams[1].indexOf("=") + 1) + "/" + lastPage);

  // create a list and append it to root element in the HTML file
  jQuery("<ul/>", {
    class: "results-list"
  }).appendTo('#root');

  // create list items from the data property and append them to the list
  data.map(function (item) {
    var listItem = document.createElement("li");
    listItem.innerHTML = "<span class='name'>" + item.name + "</span><span class='acronym'>Acronym: " + item.acronym + "</span><span class='id'>ID: " + item.id + "</span>";

    return $(".results-list").append(listItem);
  });

  // add a class to all list items
  $(".results-list > li").addClass("results-list-item");
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// logic of list control buttons to change pages
var changePage = exports.changePage = function changePage(addition) {
  // we extract the current page number and the page size from currentParams global variable that is passed to the AJAX call
  var currentPage = parseInt(currentParams[1].slice(currentParams[1].indexOf("=") + 1));
  var pageSize = parseInt(currentParams[2].slice(currentParams[2].indexOf("=") + 1));
  var newPage, lastPage;

  // determine what number is the last page based on the page size
  if (pageSize === 100) lastPage = 656;else if (pageSize === 1000) lastPage = 66;

  // check if it's a call from first/last page buttons
  if (typeof addition === "string") {
    if (addition === "first") {
      currentParams[1] = currentParams[1].slice(0, 5).concat(1);

      connectAjax("http://rt.ex7.pl/get-data", buildResultsList, currentParams);
      $(".list-control-page-num").html("Page 1/" + lastPage);

      return;
    } else if (addition === "last") {
      newPage = lastPage;

      currentParams[1] = currentParams[1].slice(0, 5).concat(newPage);

      connectAjax("http://rt.ex7.pl/get-data", buildResultsList, currentParams);
      $(".list-control-page-num").html("Page " + newPage + "/" + lastPage);

      return;
    }
  }

  // if it's not then it's a call from prev/next page buttons, so determine what should be the following page
  if (currentPage <= 1) {
    if (addition < 0) {
      newPage = lastPage;
    } else newPage = currentPage + addition;
  } else if (currentPage >= lastPage) {
    if (addition > 0) newPage = 1;else newPage = currentPage + addition;
  } else newPage = currentPage + addition;

  currentParams[1] = currentParams[1].slice(0, 5).concat(newPage);

  connectAjax("http://rt.ex7.pl/get-data", buildResultsList, currentParams);
  $(".list-control-page-num").html("Page " + newPage + "/" + lastPage);
};

var changePageSize = exports.changePageSize = function changePageSize(amount) {
  var lastPage;

  if (amount === 100) lastPage = 656;else lastPage = 66;

  currentParams[2] = currentParams[2].slice(0, 10).concat(amount);

  currentParams[1] = currentParams[1].slice(0, 5).concat(1);

  connectAjax("http://rt.ex7.pl/get-data", buildResultsList, currentParams);
  $(".list-control-page-num").html("Page 1/" + lastPage);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var connectAjax = exports.connectAjax = function connectAjax(url, callback, params) {
  function updateUrlParams(urlParams) {
    for (var i = 0; i < urlParams.length; i++) {
      currentParams = urlParams;
      i === 0 ? url += "?" + urlParams[0] : url += "&" + urlParams[i];
    }
  }

  updateUrlParams(params);

  $.post(url, function (data) {
    callback(data);
  });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _buildResultsList = __webpack_require__(0);

var _buildResultsList2 = _interopRequireDefault(_buildResultsList);

var _changePage = __webpack_require__(1);

var _changePage2 = _interopRequireDefault(_changePage);

var _connectAjax = __webpack_require__(2);

var _connectAjax2 = _interopRequireDefault(_connectAjax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentParams = ["sort_order=asc", "page=1", "page_size=100", "filter="];

$(document).ready(function () {
  (0, _connectAjax2.default)('http://rt.ex7.pl/get-data', _buildResultsList2.default, currentParams);
});

// add changePage function to the buttons
$(".list-control-prev").on("click", function () {
  (0, _changePage2.default)(-1);
});

$(".list-control-next").on("click", function () {
  (0, _changePage2.default)(1);
});

$(".list-control-first").on("click", function () {
  (0, _changePage2.default)("first");
});

$(".list-control-last").on("click", function () {
  (0, _changePage2.default)("last");
});

$(".page-size-small").on("click", function () {
  (0, _changePage2.default)(100);
});

$(".page-size-big").on("click", function () {
  (0, _changePage2.default)(1000);
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map