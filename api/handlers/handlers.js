"use strict";

var mongoose = require("mongoose");
var uriUtil = require('mongodb-uri');
var parseString = require("xml2js").parseString;
var db = require("../model/db.js");
var Todo = require("../model/schema").Todo;
var BikeDock = require("../model/schema").BikeDock;

var handler = {

  home: function(req, res) {
    res.render("index.html.ejs");
  },

  getBikeDockData: function(req, res, next) {
    BikeDock.find().exec(function(err, bikeDockData) {
      if (err) return next(err);
      res.json(bikeDockData);
    });
  },

  writeTFLData: function(data) {

    parseString(data, function(err, result) {

      BikeDock.find().exec(function(err, bikeDockData) {
        console.log("searching database");
        if (err) return next(err);

        if (bikeDockData.length === 0) {
          console.log("no data found");

          var i, len = result.stations.station.length;
          for(i = 0; i < len; i += 1) {

            var dock = result.stations.station[i];

            var bikeDock = new BikeDock({
              id: parseInt(dock.id[0], 10),
              name: dock.name[0],
              lat: parseFloat(dock.lat[0], 10),
              lng: parseFloat(dock.long[0], 10),
              available_bikes: parseInt(dock.nbBikes[0], 10),
              available_docks: parseInt(dock.nbEmptyDocks[0], 10),
              total_docks: parseInt(dock.nbDocks[0], 10),
              lastUpdated: parseInt(result.stations.$.lastUpdate, 10)
            });

            bikeDock.save(function(err) {
              if (err)  {
                return next(err);
              } else {
                // console.log("new dock saved");
              }
            });
          }


        } else if (bikeDockData.length > 0) {


          BikeDock.find().exec(function(err, bikeDockData) {
            console.log(bikeDockData[0].lastUpdated, parseInt(result.stations.$.lastUpdate, 10));
            if (bikeDockData[0].lastUpdated === parseInt(result.stations.$.lastUpdate, 10)) {
              console.log("data recently updated");
              return;
            } else {

              console.log("existing data out of date, updating fields");

              var i, len = result.stations.station.length;
              for(i = 0; i < len; i += 1) {

                var dock = result.stations.station[i];

                BikeDock.update({ name: dock.name[0] },

                 { available_bikes: dock.nbBikes[0],
                   available_docks: dock.nbEmptyDocks[0],
                   lastUpdated: result.stations.$.lastUpdate }, function(err) {

                    if (err) {
                      return next(err);
                    } else {
                      // console.log("dock updated");
                    }
                  });
              }
            };
          });
        };
      });
    });
  }
}


module.exports = handler;
