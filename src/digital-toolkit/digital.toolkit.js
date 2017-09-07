var angular = require('angular');
var quizViewer = require('./pages/quiz/quiz.viewer');

var digitalToolkitModule = angular.module('app.digital.toolkit', [
  quizViewer.name
]);

module.exports = digitalToolkitModule;
