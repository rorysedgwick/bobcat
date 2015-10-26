"use strict";

var angular = require("angular");

angular.module("app", ["nemLogging", "leaflet-directive"]);

require("./controllers/todoCtrlr.js");
require("./controllers/MapCtrlr.js");
require("./services/todoSvc.js");
