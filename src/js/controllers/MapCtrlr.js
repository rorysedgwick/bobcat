"use strict";

var angular = require("angular");
var L = require("leaflet");
var markerCluster = require("leaflet.markercluster");

var mapCtrlr = angular.module("app").controller("MapCtrlr", function($scope, BikeDockSvc) {

  $scope.refresh = function() {
    console.log("refreshing data from db");
    BikeDockSvc.fetch()
    .then(function(bikeDockData) {
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
    });
  };

  var createMarkers = function(data) {

    return data.map(function(dock) {
      var pluralOrSingle = dock.available_bikes === 1
        ? "There is currently " + dock.available_bikes + " available bike at " + dock.name
        : "There are currently " + dock.available_bikes + " available bikes at " + dock.name;
      return {
        lat: dock.lat,
        lng: dock.lng,
        focus: false,
        message: pluralOrSingle,
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
          visible: true,
          layerOptions : {
            disableClusteringAtZoom: 14,
            spiderLegPolylineOptions: { weight: 5.75, color: "#2981CA", opacity: 0.5},
            maxClusterRadius: 60
          }
        }
      }
    },
    center: {
      lat: 51.5072,
      lng: -0.100,
      zoom: 12
    },
    markerZoomAnimation: true,
    events: {}
  });

  $scope.refresh();
  var refreshPage = setInterval($scope.refresh, 30000);
  var refreshData = setInterval($scope.fetchTFLData, 58000);

});


module.exports = mapCtrlr;
