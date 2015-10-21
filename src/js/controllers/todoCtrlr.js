var angular = require("angular");

var todoCtrlr = angular.module("app").controller("TodoCtrlr", function($scope, TodoSvc) {

  $scope.refresh = function() {
    TodoSvc.fetch()
    .then(function(todos) {
      $scope.todos = todos.data;
    });
  };

  $scope.addTodo = function() {
    TodoSvc.add($scope.newTodo)
    .then(function() {
      $scope.newTodo = {};
      $scope.refresh();
    });
  };

  $scope.deleteTodo = function(todo) {
    TodoSvc.delete(todo)
    .then(function() {
      $scope.refresh();
    });
  }

  $scope.refresh();
});

module.exports = todoCtrlr;
