'use strict';
var template = require('./quiz.component.jade');
var controller = require('./quiz.component.controller');

var quizComponent = {
  restrict: 'E',
  templateUrl: template,
  controller: controller,
  controllerAs: 'ctrl',
  bindToController: true
};

module.exports = quizComponent;
