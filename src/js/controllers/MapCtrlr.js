"use strict";

const angular = require("angular");
const L = require("leaflet");
const markerCluster = require("leaflet.markercluster");

const mapCtrlr = angular.module("app").controller("MapCtrlr", ($scope, BikeDockSvc) => {

  $scope.refresh = () => {
    BikeDockSvc.fetch()
    .then(bikeDockData => {
      $scope.lastUpdate = bikeDockData.data[0].lastUpdated;
      $scope.markers = createMarkers(bikeDockData.data);
    });
  };

  $scope.pickMarker = (dock) => {
    var availableBikes = (dock.available_bikes / dock.total_docks) * 100;

    if (availableBikes === 0) {
      return $scope.redIcon;
    } else if (availableBikes < 33) {
      return $scope.orangeIcon;
    } else if (availableBikes > 33) {
      return $scope.greenIcon;
    }
  }

  var createMarkers = (data) => {

    return data.map(dock => {
      var pluralOrSingle = dock.available_bikes === 1
        ? `There is 1 bike available at ${dock.name}`
        : `There are  ${dock.available_bikes} bikes available at ${dock.name}`;

      return {
        lat: dock.lat,
        lng: dock.lng,
        focus: false,
        message: pluralOrSingle,
        layer: "bikeDocks",
        icon: $scope.pickMarker(dock)
      }
    });
  }

  angular.extend($scope, {
    defaults: {
      maxZoom: 25,
    },
    layers: {
      baselayers: {
        osm: {
          name: 'OpenStreetMap',
          type: 'xyz',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
        }
      },
      overlays: {
        bikeDocks: {
          name: "BikeDocks",
          type: "markercluster",
          visible: true,
          layerOptions : {
            disableClusteringAtZoom: 13,
            spiderLegPolylineOptions: { weight: 5.75, color: "#2981CA", opacity: 0.5},
            maxClusterRadius: 85
          }
        }
      }
    },
    redIcon: {
      iconUrl: "assets/img/icons/redIcon.png",
      iconSize: [25, 25],
      iconAnchor: [12, 25]
    },
    orangeIcon: {
      iconUrl: "assets/img/icons/orangeIcon.png",
      iconSize: [25, 25],
      iconAnchor: [12, 25]
    },
    greenIcon: {
      iconUrl: "assets/img/icons/greenIcon.png",
      iconSize: [25, 25],
      iconAnchor: [12, 25]
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
  var refreshPage = setInterval($scope.refresh, 25000);

});


module.exports = mapCtrlr;
