var angular = require("angular");

var todoSvc = angular.module("app").service("TodoSvc", function($http) {
  this.fetch = function() {
    return $http.get("/api/todos");
  };

  this.add = function(todo) {
    return $http.post("/api/todos", todo);
  };

  this.delete = function(todo) {
    return $http.delete("/api/todos/" + todo._id);
  };
});

module.exports = todoSvc;
