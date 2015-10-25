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
  };

  $scope.fetchTFLData = function() {
    TodoSvc.fetchTFLData()
    .then(function(data) {
      TodoSvc.writeTFLData(data);
    });
  };

  $scope.writeTFLData = function(data) {
    TodoSvc.writeTFLData(data)
    .then(function() {
      console.log("data posted to backend");
    });
  };

  $scope.refresh();
});

module.exports = todoCtrlr;
