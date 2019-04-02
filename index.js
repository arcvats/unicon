var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
var config = require("./config");
var router = require("./api/routes");
var securebox = require("securebox");
var sb = new securebox("asdfa", "http://localhost:3000", {
  auth: true,
  connectorConfig: {
    type: "mqtt",
    host: "127.0.0.1",
    port: 1883
  }
});
sb.dashboardMonitoring();

mongoose.connect(config.database.local, function(err) {
  if (err) {
    throw err;
  } else {
    console.log("Successfully connected to the database");
  }
});

app.use(express.static("client/dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router());

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

app.listen(process.env.PORT || config.port, function() {
  console.log("Listening at " + config.port);
});
