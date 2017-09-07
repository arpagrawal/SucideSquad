var angular=require('angular');
var uiRouter =require('angular-ui-router');
var quizViewerComponent = require('./quiz.viewer.component');
var quizComponentModule = require('../../components/quiz/quiz.component.module');
var quizViewerModule = angular.module('quizViewerModule', [
  uiRouter,
  quizComponentModule.name
])
.config(($stateProvider) => {
  $stateProvider
    .state('quiz', {
      url: '/quiz',
      template: '<quizviewer></quizviewer>'
    });
})
.component('quizviewer',quizViewerComponent);

module.exports= quizViewerModule;