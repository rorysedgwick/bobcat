"use strict";

var request = require("request");
var handlers = require("../handlers/handlers.js");

var fetchTFLData = function() {
  request("https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml", function(error, response, body) {
    if (error) return "error returning data from TFL: ", error;
    handlers.writeTFLData(body);
  });
}

var pollTFL = setInterval(fetchTFLData, 30000);

module.exports = pollTFL;
