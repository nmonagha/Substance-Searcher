var component = function() {};

/**
 * Render a component.
 *
 * @param {HTMLElement} parent
 */
component.prototype.render_decorate = function(parent) {
  var container = document.createElement('div');
  this.decorate(container);
  parent.appendChild(container);
}

component.prototype.render_getInfo = function(parent) {
  var container = document.createElement('div');
  this.getInfo(container);
  parent.appendChild(container);
}

component.prototype.render_getPatientAge = function(parent) {
  var container = document.createElement('div');
  this.render_getPatientAge(container);
  parent.appendChild(container);
}

component.prototype.render_getMF = function(parent) {
  var container = document.createElement('div');
  this.render_getMF(container);
  parent.appendChild(container);
}

component.prototype.render_getResult = function(parent) {
  var container = document.createElement('div');
  this.render_getResult(container);
  parent.appendChild(container);
}

component.prototype.render_getAction = function(parent) {
  var container = document.createElement('div');
  this.render_getAction(container);
  parent.appendChild(container);
}

component.prototype.render_getDate = function(parent) {
  var container = document.createElement('div');
  this.render_getDate(container);
  parent.appendChild(container);
}

component.prototype.render_getForm = function(parent) {
  var container = document.createElement('div');
  this.render_getForm(container);
  parent.appendChild(container);
}

