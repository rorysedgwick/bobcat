"use strict";

var assert = require("assert");
var mocks = require("node-mocks-http");
var handler = require("../../../api/handlers/handlers.js");

function buildResponse() {
  return mocks.createResponse({eventEmitter: require("events").EventEmitter});
};

describe("# The home handler", function() {

  it("should respond with a status code of 200", function(done) {

    var response = buildResponse();
    var request = mocks.createRequest({
      method: "GET",
      url: "/"
    });

    response.on("end", function() {
      assert.equal(response.statusCode, 200);
      done();
    });

    handler.home(request, response);
  });
});

describe("# The getTodos handler", function() {

  it("should respond with an array of todos", function(done) {

    var response = buildResponse();
    var request = mocks.createRequest({
      method: "GET",
      url: "/api/todos"
    });

    response.on("end", function() {
      var data = JSON.parse(response._getData());
      assert.equal(Object.prototype.toString.call(data), "[object Array]");
      done();
    });

    handler.getTodos(request, response);
  });
});
