"use strict";

var angular = require("angular");

angular.module("app", ["nemLogging", "leaflet-directive"]);

require("./services/bikeDockSvc.js");
require("./controllers/mapCtrlr.js");

