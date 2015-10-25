"use strict";

var mongoose = require("mongoose");
var uriUtil = require('mongodb-uri');
var parseString = require("xml2js").parseString;
var config = require("../config.js");
var Todo = require("../model/schema").Todo;
var BikeDock = require("../model/schema").BikeDock;

var mongodbUri = "mongodb://" + config.db.user + ":" + config.db.password + "@ds041484.mongolab.com:41484/bobcat";
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri);
var db = mongoose.connection;

db.once("open", function() {
  console.log("database connected");
});

var handler = {

  home: function(req, res) {
    res.render("index.html.ejs");
  },

  getTodos: function(req, res, next) {
    Todo.find()
      .exec(function(err, todos) {
        if (err) return next(err);
        res.json(todos);
      });
    },

  createTodo: function(req, res, next) {
    var todo = new Todo({title: req.body.title});
    todo.save(function(err) {
      if (err) return next(err);
      res.sendStatus(201);
      console.log("added " + todo.title);
    });
  },

  removeTodo: function(req, res, next) {
    Todo.remove({_id: req.params.todo_id}, function(err, todo) {
      if (err) return next(err);
      res.sendStatus(200);
    });
  },

  writeTFLData: function(req, res, next) {
    parseString(req.body.data, function(err, result) {

      var i, len = result.stations.station.length;
      for(i = 0; i < len; i += 1) {

        var dock = result.stations.station[i];
        var bikeDock = new BikeDock({
          id: parseInt(dock.id[0], 10),
          name: dock.name[0],
          lat: parseInt(dock.lat[0], 10),
          lng: parseInt(dock.long[0], 10),
          available_bikes: parseInt(dock.nbBikes[0], 10),
          available_docks: parseInt(dock.nbEmptyDocks[0], 10),
          total_docks: parseInt(dock.nbDocks[0], 10)
        });

        bikeDock.save(function(err) {
          if (err) return next(err);
          res.sendStatus(201);
          console.log("dock saved");
        });

      };
    });
  }
}


module.exports = handler;
