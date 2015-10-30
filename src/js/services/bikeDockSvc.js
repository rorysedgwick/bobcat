"use strict";

const angular = require("angular");

const bikeDockSvc = angular.module("app").service("BikeDockSvc", function($http) {

  this.fetch = () => $http.get("/api/bikeDockData");

  // io = io.connect();
  // io.emit("ready");

  // io.on("new client", function() {
  //   console.log("new visitor connected to server");
  // });

  // io.on("dataUpdate", function() {
  //   this.fetch();
  // });

});

module.exports = bikeDockSvc;
