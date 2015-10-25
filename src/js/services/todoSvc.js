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

  this.fetchTFLData = function() {
    return $http.get("https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml");
  };

  this.writeTFLData = function(data) {
    console.log("writing in SVC: ", data);
    return $http.post("/api/bikeDockData", data);
  };

});

module.exports = todoSvc;
