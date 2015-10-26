var angular = require("angular");

var MapCtrlr = angular.module("app").controller("MapCtrlr", ["$scope", function($scope) {

  var myMarker = {
    lat: 51.5,
    lng: 0,
    focus: true,
    message: "A marker"
  }

  angular.extend($scope, {
    defaults: {
      tileLayer: 'http://openmapsurfer.uni-hd.de/tiles/roads/x={x}&y={y}&z={z}',
    },
    center: {
      lat: 51.5072,
      lng: -0.100,
      zoom: 12
    },
    markers: {
      myMarker: angular.copy(myMarker)
    },
    position: {
      lat: 51,
      lng: 0
    },
    events: {}
  });
}]);
