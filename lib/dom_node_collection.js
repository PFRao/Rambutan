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

DOMNodeCollection.prototype.val = function () {
  // var theElement = this.elements[0];
  return this.elements[0].value;
};

DOMNodeCollection.prototype.append = function () {
  var newHTMLs = Array.prototype.slice.call(arguments, 0);
  newHTMLs.forEach(function (newHTML) {
    if (newHTML instanceof DOMNodeCollection) {
      var triggers = "";
      for (var j = 0; j < newHTML.elements.length; j++) {
        triggers += newHTML.elements[j].outerHTML;
      }
      newHTML = triggers;
    } else if (newHTML instanceof HTMLElement) {
      newHTML = newHTML.outerHTML;
    }

    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].innerHTML += newHTML;
    }
  }.bind(this));
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

DOMNodeCollection.prototype.css = function (property, value) {

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
