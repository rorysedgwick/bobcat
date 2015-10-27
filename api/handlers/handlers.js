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

  writeTFLData: function(req, res, next) {
    parseString(req.body.data, function(err, result) {

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
              total_docks: parseInt(dock.nbDocks[0], 10)
            });

            bikeDock.save(function(err) {
              if (err)  {
                return next(err);
              } else {
                console.log("new dock saved");
              }
            });
          }
        } else if (bikeDockData.length > 0) {

          console.log("existing data, updating fields");

          var i, len = result.stations.station.length;
          for(i = 0; i < len; i += 1) {

            var dock = result.stations.station[i];
            BikeDock.update({ name: dock.name[0] },

             { available_bikes: dock.nbBikes[0],
               available_docks: dock.nbEmptyDocks[0]}, function(err) {

                if (err) {
                  return next(err);
                } else {
                  console.log("dock updated");
                }
              });
          }
        }
      });
    });
    res.sendStatus(201);
  }
}


module.exports = handler;
