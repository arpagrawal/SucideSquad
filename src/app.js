require('babel-polyfill');
var $ = require('jquery');

require('./vendors/jquery-ui/jquery-ui.min.js');
require('./vendors/jquery-ui-touch/jquery.ui.touch-punch.min.js');

require('tether/dist/js/tether.js');
require('bootstrap/dist/js/bootstrap.min.js');
require('./vendors/cropper/cropper.min.js');

var angular = require('angular');
var uiRouter = require('angular-ui-router');
var sanitize = require('angular-sanitize');
var uiMask = require('angular-ui-mask');
var ngMessages = require('angular-messages');
var AppComponent = require('./app.component.js');
var digitalToolkitComponents = require('./digital-toolkit/digital.toolkit');
var Styles = require('./stylesheets/base.scss');
var SlickStyle = require('./stylesheets/vendors/slick/slick.scss');
var SlickThemeStyle = require('./stylesheets/vendors/slick/slick-theme.scss');
var ngSortable = require('./vendors/ng-sortable/ng-sortable.min.js');

angular.module('myApp', [
        uiRouter,
        digitalToolkitComponents.name,
        sanitize,
        uiMask,
        ngMessages
    ])
    .component('app', AppComponent);
