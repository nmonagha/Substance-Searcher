/**
 * Namespace.
 *
 * @type {Object}
 */
var assessment = {};

/**
 * Send an API call to the FDA and execute a callback with the results.
 *
 * @param {string} url The API endpoint to call
 * @param {Function} callback Function to call upon successful execution of
 * the API call.
 */


assessment.fda_api = function(url, callback) {
  var callback_ = function() {
    var json = JSON.parse(this.responseText);
    callback(json.results);
  };

  var request = new XMLHttpRequest();
  
  request.addEventListener('load', callback_);
  request.open('GET', url);
  request.send();
};

/**
 * Runs when the document is fully loaded and ready to go.
 */
assessment.ready = function() {
  var visualization = new component.visualization();
  visualization.render_decorate(document.body);
};

assessment.render_getInfo = function() {
  var visualization = new component.visualization();
  visualization.render_getInfo(document.body);
};

assessment.render_getPatientAge = function() {
  var visualization = new component.visualization();
  visualization.getPatientAge(document.body);
};

assessment.render_getMF = function() {
  var visualization = new component.visualization();
  visualization.getMF(document.body);
};

assessment.render_getResult = function() {
  var visualization = new component.visualization();
  visualization.getResult(document.body);
};

assessment.render_getAction = function() {
  var visualization = new component.visualization();
  visualization.getAction(document.body);
};

assessment.render_getDate = function() {
  var visualization = new component.visualization();
  visualization.getDate(document.body);
};

assessment.render_getForm = function() {
  var visualization = new component.visualization();
  visualization.getForm(document.body);
};

/**
 * Extends one class with another.
 *
 * @link https://oli.me.uk/2013/06/01/prototypical-inheritance-done-right/
 *
 * @param {Function} destination The class that should be inheriting things.
 * @param {Function} source The parent class that should be inherited from.
 *
 * @return {Object} The prototype of the parent.
 */
assessment.extend = function(destination, source) {
  destination.prototype = Object.create(source.prototype);
  destination.prototype.constructor = destination;
  return source.prototype;
};
