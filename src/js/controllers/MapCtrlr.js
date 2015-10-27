"use strict";

var angular = require("angular");

var mapCtrlr = angular.module("app").controller("MapCtrlr", function($scope, BikeDockSvc) {

  $scope.refresh = function() {
    BikeDockSvc.fetch()
    .then(function(bikeDockData) {
      $scope.bikeDockData = bikeDockData.data;
      $scope.createMarkers(bikeDockData.data);
    });
  };

  $scope.fetchTFLData = function() {
    BikeDockSvc.fetchTFLData()
    .then(function(data) {
      BikeDockSvc.writeTFLData(data);
    });
  };

  $scope.writeTFLData = function(data) {
    BikeDockSvc.writeTFLData(data)
    .then(function() {
    });
  };

  $scope.createMarkers = function(data) {

    var i, len = data.length, bikePointMarkers = [];

    for(i = 0; i < len; i += 1) {

      var bikePointMarker = {
        lat: data[i].lat,
        lng: data[i].lng,
        focus: false,
        message: "There are currently " + data[i].available_bikes + " available bikes at " + data[i].name
        // title: data[i].name + ": " + data[i].available_bikes + "/" + data[x].total_docks + "free.",
      }

      bikePointMarkers.push(bikePointMarker);
    }

    $scope.markers = bikePointMarkers;
  }

  angular.extend($scope, {
    defaults: {
      // tile options: http://openmapsurfer.uni-hd.de/tiles/roads/x={x}&y={y}&z={z}
      //               http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}
      tileLayer: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      iconSize: [1, 1],
    },
    center: {
      lat: 51.5072,
      lng: -0.100,
      zoom: 12
    },
    markers: {
      // myMarker: angular.copy(myMarker)
    },
    markerZoomAnimation: true,
    // position: {
    //   lat: 51,
    //   lng: 0
    // },
    events: {}
  });

  $scope.refresh();

});


module.exports = mapCtrlr;
