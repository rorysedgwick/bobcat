"use strict";

var express = require("express");
var router = require("./routes/routes.js");
var app = express();
var port = Number(process.env.PORT) || 8000;

app.use(require("body-parser").json());
app.use("/", router);
app.use(express.static("public"));

app.listen(port,
  console.log("server listening at port 8000"
));
