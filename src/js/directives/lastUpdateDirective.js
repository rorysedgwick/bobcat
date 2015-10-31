"use strict";

const angular = require("angular");

var lastUpdateDirective = angular.module("app").directive("lastUpdateDirective", function() {
  return {
    template: "Data last updated at {{ lastUpdate }}"
  };
});

module.exports = lastUpdateDirective;
