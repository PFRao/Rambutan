var DOMNodeCollection = require('./dom_node_collection');

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

window.$l.create = function (string, className) {
  var classes = Array.prototype.slice.call(arguments, 2);
  var element = document.createElement(string);
  element.className = className;

  classes.forEach(function (nextClass) {
    element.className += " " + nextClass;
  });

  return element;
};

window.$l.createWithId = function (string, idName) {
  var element = document.createElement(string);
  element.id = idName;

  return element;
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
