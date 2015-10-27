// "use strict";

// var assert = require("assert");
// var mongoose = require("mongoose");
// var config = require("../../api/config.js");
// var BikeDock = require("../../api/model/schema.js").BikeDock;
// var dummyBikeDockData = require("../utils/dummyData.js");

// describe("# The database", function() {

//   before(function() {
//     mongoose.connection.close(function() {
//       console.log("connection closed before tests");
//       process.env.NODE_ENV = "test";
//     });


//     // mongoose.connect(process.env.TEST_URL);
//     // var db = mongoose.connection;


//     // var i, len = dummyBikeDockData.length;

//     // for(i = 0; i < len; i += 1) {

//     //   var dock = dummyBikeDockData[i];
//     //   var bikeDock = new BikeDock({
//     //     id: dock.id,
//     //     name: dock.name,
//     //     lat: dock.lat,
//     //     lng: dock.lng,
//     //     available_bikes: dock.available_bikes,
//     //     available_docks: dock.available_docks,
//     //     total_docks: dock.total_docks
//     //   });

//     //   BikeDock.save(bikeDock, function(err) {
//     //     if (err) return "Error saving to test database: " + err;
//     //     console.log("dock saved to test database");
//     //   });
//     // }

//   });

//   after(function() {
//     mongoose.connection.close(function() {
//       console.log("connection closed after tests");
//     });
//   });

//   it("should succesfully connect to a test database depending on process.env", function() {


//   });
// });
