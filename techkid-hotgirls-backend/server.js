const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./users/users.router");
const session = require("express-session");
mongoose.connect("mongodb://localhost:27017/techkid-hotgirls", error => {
  if (error) {
    throw error;
  } else {
    console.log("Connect to mongodb success!");
    const app = express();
    app.use(bodyParser.json());
    app.use(function(req, res, next) {
      // Website you wish to allow to connect
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

      // Request methods you wish to allow
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );

      // Request headers you wish to allow
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      );

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader("Access-Control-Allow-Credentials", true);

      // Pass to next layer of middleware
      next();
    });

    app.use(
      session({
        secret: "keyboard cat"
      })
    );
    app.use("/users", userRouter);
    app.listen(3001, err => {
      if (err) {
        throw err;
      }
      console.log("Server listen on port 3001...");
    });
  }
});
