'use strict';
var angular = require('angular');
var uiRouter = require('angular-ui-router');
var quizComponent = require('./quiz.component');
var quizComponentService = require('./quiz.component.service');

var quizComponentModule = angular.module('quizComponentModule', [uiRouter])
                  .component('quizcomponent', quizComponent)
                  .service('quizComponentService', quizComponentService)
                  
import Styles from './quiz.component.scss';                      

module.exports = quizComponentModule;
