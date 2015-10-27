"use strict";

var angular = require("angular");
var L = require("leaflet");
var markerCluster = require("leaflet.markercluster");

var mapCtrlr = angular.module("app").controller("MapCtrlr", function($scope, BikeDockSvc) {

  $scope.refresh = function() {
    console.log("refreshing data from db");
    BikeDockSvc.fetch()
    .then(function(bikeDockData) {
      // $scope.bikeDockData = bikeDockData.data;w
      $scope.markers = createMarkers(bikeDockData.data);
    });
  };

  $scope.fetchTFLData = function() {
    console.log("updating tfl data");
    BikeDockSvc.fetchTFLData()
    .then(function(data) {
      BikeDockSvc.writeTFLData(data);
    });
  };

  $scope.writeTFLData = function(data) {
    BikeDockSvc.writeTFLData(data)
    .then(function() {
      console.log("database updated in mapCtrlr");
    });
  };

  var createMarkers = function(data) {

    return data.map(function(dock) {
      return {
        lat: dock.lat,
        lng: dock.lng,
        focus: false,
        message: "There are currently " + dock.available_bikes + " available bikes at " + dock.name,
        layer: "bikeDocks"
        // title: data[i].name + ": " + data[i].available_bikes + "/" + data[x].total_docks + "free.",
      }
    });
  }

  angular.extend($scope, {
    defaults: {
      // tile options: http://openmapsurfer.uni-hd.de/tiles/roads/x={x}&y={y}&z={z}
      //               http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}
      tileLayer: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      maxZoom: 25,
      iconSize: [1, 1],
    },
    layers: {
      baselayers: {
        osm: {
          name: 'OpenStreetMap',
          type: 'xyz',
          url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
        }
      },
      overlays: {
        bikeDocks: {
          name: "BikeDocks",
          type: "markercluster",
          visible: true
        }
      }
    },
    markers: {
      // myMarker: angular.copy()
    },
    center: {
      lat: 51.5072,
      lng: -0.100,
      zoom: 12
    },
    markerZoomAnimation: true,
    // position: {
    //   lat: 51,
    //   lng: 0
    // },
    events: {}
  });

  $scope.refresh();
  // var refreshPage = setInterval($scope.refresh, 30000);
  // var refreshData = setInterval($scope.fetchTFLData, 58000);

});


module.exports = mapCtrlr;
