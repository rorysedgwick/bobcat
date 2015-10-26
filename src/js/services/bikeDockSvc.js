"use strict";

var angular = require("angular");

var bikeDockSvc = angular.module("app").service("BikeDockSvc", function($http) {
  this.fetch = function() {
    return $http.get("/api/bikeDockData");
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
    return $http.post("/api/bikeDockData", data);
  };

});

module.exports = bikeDockSvc;