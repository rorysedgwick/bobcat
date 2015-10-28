"use strict";

var angular = require("angular");

var bikeDockSvc = angular.module("app").service("BikeDockSvc", function($http) {
  this.fetch = function() {
    return $http.get("/api/bikeDockData");
  };

  this.fetchTFLData = function() {
    return $http.get("https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml");
  };

  this.writeTFLData = function(data) {
    return $http.post("/api/bikeDockData", data);
  };

});

module.exports = bikeDockSvc;
