/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var DOMNodeCollection = __webpack_require__(1);

	window.$l = function (selector) {
	  var result;
	  var theArray = [];
	  var functionQueue = [];

	  if (selector instanceof Function) {
	    functionQueue.push(selector);
	    document.addEventListener("DOMContentLoaded", function(event) {
	      for (var i = 0; i < functionQueue.length; i++) {
	        functionQueue[i]();
	      }
	    });
	    return;
	  }

	  if (selector instanceof HTMLElement) {
	    theArray.push(selector);
	    result = theArray;
	  } else {
	    var nodeList = document.querySelectorAll(selector);
	    result = Array.prototype.slice.call(nodeList);
	  }

	  return new DOMNodeCollection(result);
	};

	window.$l.extend = function () {
	  var args = [].slice.call(arguments);
	  return Object.assign.apply(null, args);
	};

	window.$l.ajax = function (opts) {
	  var defaults = {
	    method: "GET",
	    url: window.location.pathname,
	    success: function(data) {
	        console.log("We have your data!");
	        console.log(data);
	      },
	    error: function() {
	        console.error("An error occured.");
	      },
	    data: "",
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	  };

	  var defOpts = $l.extend(defaults, opts);
	  var xhr = new XMLHttpRequest();
	  xhr.open(defOpts.method, defOpts.url);
	  xhr.onload = function() {
	    console.log(xhr.status);
	    console.log(xhr.responseType);
	    console.log(xhr.response);
	  };
	  xhr.send();
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	function DOMNodeCollection(array) {
	  this.elements = array;
	}

	DOMNodeCollection.prototype.html = function (string) {
	    if (string){
	      for (var i = 0; i < this.elements.length; i++) {
	        this.elements[i].innerHTML =  string;
	      }
	      return this;
	    }
	  return this.elements[0].innerHTML;
	};

	DOMNodeCollection.prototype.empty = function () {
	  this.html("");
	};

	DOMNodeCollection.prototype.append = function (arg) {
	  var newHTML = arg;

	  if (arg instanceof DOMNodeCollection) {
	    newHTML = "";
	    for (var j = 0; j < arg.elements.length; j++) {
	      newHTML += arg.elements[j].outerHTML;
	    }
	  } else if (arg instanceof HTMLElement) {
	    newHTML = arg.outerHTML;
	  }

	  for (var i = 0; i < this.elements.length; i++) {
	    this.elements[i].innerHTML += newHTML;
	  }
	};

	DOMNodeCollection.prototype.attr = function (attrName, value) {
	  if (value !== undefined) {
	    for (var i = 0; i < this.elements.length; i++) {
	      this.elements[i].setAttribute(attrName, value);
	    }
	    return this;
	  }
	  return this.elements[0].getAttribute(attrName);
	};

	DOMNodeCollection.prototype.addClass = function (className) {
	  var newAttr = className;
	  if (this.attr("class")){
	    newAttr = this.attr("class") + " " + className;
	  }
	  this.attr("class", newAttr);
	  return this;
	};

	DOMNodeCollection.prototype.removeClass = function (className) {
	  var remove = "";
	  if (className){
	    var classes = this.elements[0].getAttribute("class").split(" ");
	    var index = classes.indexOf(className);
	    if (index === -1) { return; }

	    classes.splice(index, 1);
	    remove = classes.join(" ");
	  }

	  this.attr("class", remove);
	};

	DOMNodeCollection.prototype.children = function () {
	  var childrens = [];
	  var nodes;
	  for (var i = 0; i < this.elements.length; i++) {
	    nodes = Array.prototype.slice.call(this.elements[i].children);
	    childrens = childrens.concat(nodes);
	  }

	  return new DOMNodeCollection(childrens);
	};

	DOMNodeCollection.prototype.parent = function () {
	  var parents = [];

	  for (var i = 0; i < this.elements.length; i++) {
	    parents = parents.concat(this.elements[i].parentElement);
	  }

	  return new DOMNodeCollection(parents);
	};

	DOMNodeCollection.prototype.find = function (selector) {
	  var result = [];
	  var nodes;
	  for (var i = 0; i < this.elements.length; i++) {
	    nodes = Array.prototype.slice.call(this.elements[i].querySelectorAll(selector));
	    result = result.concat(nodes);
	  }
	  return new DOMNodeCollection(result);
	};

	DOMNodeCollection.prototype.remove = function () {
	  this.empty();
	  for (var i = 0; i < this.elements.length; i++) {
	    this.elements[i].remove();
	  }
	};

	DOMNodeCollection.prototype.on = function (eventName, callback) {
	  for (var i = 0; i < this.elements.length; i++) {
	    this.elements[i].addEventListener(eventName, callback);
	  }
	};

	DOMNodeCollection.prototype.off = function (eventName, callback) {
	  for (var i = 0; i < this.elements.length; i++) {
	    this.elements[i].removeEventListener(eventName, callback);
	  }
	};

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);