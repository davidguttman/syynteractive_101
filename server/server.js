(function() {
  var app, express, port;

  express = require("express");

  app = express.createServer();

  port = process.env.PORT || 3000;

  app.use(express.static(__dirname + '/..'));

  app.listen(port);

  console.log("server running on port " + port);

}).call(this);
