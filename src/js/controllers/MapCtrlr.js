"use strict";

var angular = require("angular");

var mapCtrlr = angular.module("app").controller("MapCtrlr", function($scope, BikeDockSvc) {

  $scope.refresh = function() {
    BikeDockSvc.fetch()
    .then(function(bikeDockData) {
      $scope.bikeDockData = bikeDockData.data;
    });
  };

  $scope.fetchTFLData = function() {
    BikeDockSvc.fetchTFLData()
    .then(function(data) {
      TodoSvc.writeTFLData(data);
    });
  };

  $scope.writeTFLData = function(data) {
    BikeDockSvc.writeTFLData(data)
    .then(function() {
    });
  };

  var bikePointMarker = {
  //   lat: $scope.bikeDockData[0].lat,
  //   lng: $scope.bikeDockData[0].lng,
  //   title: $scope.bikeData[0].name + ": " + $scope.bikeDockData[0].available_bikes + "/" + $scope.bikeDockData[0].total_docks + "free.",
  //   focus: true,
  //   message: "There are currently " + $scope.bikeDockData[0].available_bikes + " available bikes at " + $scope.bikeDockData[0].name
  }

  var myMarker = {
    lat: 51.5072,
    lng: -0.150,
    title: "Test marker",
    focus: true,
    message: "Check out how many bikes are at this location"
  }

  angular.extend($scope, {
    defaults: {
      // tile options: http://openmapsurfer.uni-hd.de/tiles/roads/x={x}&y={y}&z={z}
      //               http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}
      tileLayer: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
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

  $scope.refresh();

});


module.exports = mapCtrlr;
