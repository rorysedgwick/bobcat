"use strict";

var express = require("express.io");
var app = express().http().io();
var router = require("./routes/routes.js");
var path = require("path");
var pollTFL = require("./utils/request.js");
var port = Number(process.env.PORT) || 8000;

app.use(require("body-parser").json({limit: "52428800"}));
app.use("/", router);
app.use(express.static(path.resolve(__dirname, "../public")));

app.io.route("ready", function(req) {
  app.io.broadcast("new client");
});

app.listen(port,
  console.log("server listening at port 8000"
));
