var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
  title: String
});

var bikeDockSchema = new mongoose.Schema({
  id: Number,
  name: String,
  lat: Number,
  lng: Number,
  available_bikes: Number,
  available_docks: Number,
  total_docks: Number,
  lastUpdated: Number
});

var Todo = mongoose.model("Todo", todoSchema);
var BikeDock = mongoose.model("BikeDock", bikeDockSchema);

module.exports = {
  Todo: Todo,
  BikeDock: BikeDock
}
