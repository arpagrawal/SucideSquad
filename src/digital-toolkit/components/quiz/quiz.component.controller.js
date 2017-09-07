'use strict';

function quizComponentController(quizComponentService, $timeout, $filter, $location) {
    this.qObj = {};
    var model = this.model = {};
    var self = this;
    var list;
    var currentProgressWidth;
    var progressIncrement;
    var promise = quizComponentService.getQuestions();
    self.errorMessage = null;
    self.isDisplayErrorMessage = false;
    this.mediaCenterPage = function(){
      $location.url('/mediaCenter/mycontent');
   }
    promise.then(function(data) {

        self.qObj = data;
        list = self.qObj.qlist;

        model.currentCount = 1;
        model.currentProgressWidth = 100 / list.length + "%";
        currentProgressWidth = 100 / list.length;
        progressIncrement = 100 / list.length;

        model.currentType = list[model.currentCount - 1].question.qtype;
        model.currentQuestion = list[model.currentCount - 1].question;
        model.anslength = model.currentQuestion.options.length;

        if (model.currentCount <= list.length) {
            if (model.currentCount != 1) {
                model.previousType = list[model.currentCount - 2].question.qtype;
            }
            if (model.currentCount != list.length) {
                model.nextType = list[model.currentCount].question.qtype;
            }
        }

    });
    model.changeProg = function(targetAction, isLastStep) {

        if (isLastStep && targetAction == "next") {
            $location.path('/quizIntro');
        }

        if (targetAction == "next") {
            self.isDisplayErrorMessage = false;
            if (model.currentCount != list.length) {
                model.currentCount++;
                currentProgressWidth = currentProgressWidth + progressIncrement;
                model.currentProgressWidth = currentProgressWidth + "%";
            }

        }

        if (targetAction == "previous") {
            self.isDisplayErrorMessage = false;
            if (model.currentCount != 1) {
                model.currentCount--;
                currentProgressWidth = currentProgressWidth - progressIncrement;
                model.currentProgressWidth = currentProgressWidth + "%";
            }
        }


        if (model.currentCount <= list.length) {
            model.currentType = list[model.currentCount - 1].question.qtype;
            model.currentQuestion = list[model.currentCount - 1].question;
            model.isOptionSelected = '';
            model.anslength = model.currentQuestion.options.length;
            if (model.currentCount != 1) {
                model.previousType = list[model.currentCount - 2].question.qtype;
            }
            if (model.currentCount != list.length) {
                model.nextType = list[model.currentCount].question.qtype;
            }
        }

    }



    model.selectAns = function(id) {
        var isAnswerAlreadySelected = $filter('filter')(model.currentQuestion.selectedAnswer, {answerId: id})[0];
        if ((model.currentQuestion.selectedAnswer && model.currentQuestion.selectedAnswer.length < model.currentQuestion.noOfCorrectAnswers) || (isAnswerAlreadySelected)) {
            self.isDisplayErrorMessage = false;
            if (model.currentQuestion.answertype == "S") {
                fetchanswer(id, "S");
            }
            if (model.currentQuestion.answertype == "M") {
                fetchanswer(id, "M");
            }
        }
        else {
            self.isDisplayErrorMessage = true;
            self.errorMessage = "You can select only " + model.currentQuestion.noOfCorrectAnswers + " option(s).";
        }
    }

    function fetchanswer(id, type) {
        var push = true;
        angular.forEach(model.currentQuestion.options, function (value) {
            var isAnswerAlreadySelected = $filter('filter')(model.currentQuestion.selectedAnswer, {answerId: id})[0];
            if ((type == "M" && model.currentQuestion.answertype == "M") && model.currentQuestion.ismandatory && (model.currentQuestion.selectedAnswer.length == model.currentQuestion.noOfCorrectAnswers) && !isAnswerAlreadySelected) {
                return false;
            }

            if (value.answerId == id) {
                if (type == "M" || type == "S") {
                    if (model.optionSelected(id, null, type)) {
                        if (type == "M") {
                            var index = model.optionSelected(id, "R");
                            model.currentQuestion.selectedAnswer.splice(index, 1);
                            push = false;
                        }
                        if (type == "S") {
                            model.currentQuestion.selectedAnswer.length = 0;
                            push = false;
                        }
                    }
                }
                if (push)
                    model.currentQuestion.selectedAnswer.push(value);
            }
        });
    }


    model.optionSelected = function(id, flag, type) {
        var result = false;
        var selectedAnswer = $filter('filter')(model.currentQuestion.selectedAnswer, { answerId: id })[0];
        angular.forEach(model.currentQuestion.selectedAnswer, function(value, key) {

            if (value.answerId == id)
                result = true;
            if (selectedAnswer && (selectedAnswer.answerId == value.answerId) && flag == "R") {
                result = key;
            }


        });
        if (type == "S" && model.currentQuestion.ismandatory && model.currentQuestion.selectedAnswer.length == 1)
            model.currentQuestion.selectedAnswer.length = 0;
        return result;
    }

};

module.exports = quizComponentController;
