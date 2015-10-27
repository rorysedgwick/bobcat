"use strict";

var assert = require("assert");
var mocks = require("node-mocks-http");
var handler = require("../../../api/handlers/handlers.js");

function buildResponse() {
  return mocks.createResponse({eventEmitter: require("events").EventEmitter});
};

describe("# The home handler", function() {

  it("should respond with a status code of 200 and the rendered index page", function(done) {

    var response = buildResponse();
    var request = mocks.createRequest({
      method: "GET",
      url: "/"
    });

    response.on("end", function() {
      assert.equal(response._getRenderView(), "index.html.ejs");
      assert.equal(response.statusCode, 200);
      done();
    });

    handler.home(request, response);
  });
});

describe("# The getBikeDockData handler", function() {

  this.timeout(5000)

  it("should respond with an array of 733 bike docks ", function(done) {

    var response = buildResponse();
    var request = mocks.createRequest({
      method: "GET",
      url: "/api/bikeDockData"
    });

    response.on("end", function() {
      var data = JSON.parse(response._getData());

      var x = Math.floor(Math.random() * data.length);

      assert.equal(Object.prototype.toString.call(data), "[object Array]");
      assert.equal(data.length, 733);
      assert.equal(typeof data[x], "object");
      assert.equal(Object.keys(data[x]).length, 9);
      done();
    });

    handler.getBikeDockData(request, response);
  });
});

describe("# The writeTFLData handler", function() {


});
