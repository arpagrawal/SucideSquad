'use strict';

quizComponentService.$inject = ['$http','$q'];

function quizComponentService($http,$q) {
  console.log($q);
  
  this.$http = $http;

  var deferred = $q.defer();
  $http.get('../../../../src/digital-toolkit/components/quiz/quiz.component.json').then(function(response) {
    deferred.resolve(response.data);
  });

  this.getQuestions = function() {
    return deferred.promise;
  }

};

module.exports = quizComponentService;