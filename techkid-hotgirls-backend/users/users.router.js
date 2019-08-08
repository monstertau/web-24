const express = require("express");
const userRouter = express.Router();
const bcryptjs = require("bcryptjs");
const userModel = require("./users.model");
const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
let profileData;
userRouter.get("/test", (req, res) => {
  console.log("Current User:", req.session.currentUser);
  res.json({
    success: true
  });
});

userRouter.post("/register", (req, res) => {
  //get email + pw from req.body

  const { email, password, fullName } = req.body;
  if (!email || !emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: "Invalid email address"
    });
  } else if (!password || password.length < 6) {
    res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters"
    });
  } else if (!fullName) {
    res.status(400).json({
      success: false,
      message: "Please input full name"
    });
  }
  userModel.findOne({ email: email }, (error, data) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    } else if (data) {
      res.status(400).json({
        success: false,
        message: "Email has been used"
      });
    } else {
      const hashPassword = bcryptjs.hashSync(password, 10);
      userModel.create(
        {
          ...req.body,
          password: hashPassword
        },
        (err, newUser) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: err.message
            });
          } else {
            res.status(201).json({
              success: true,
              data: {
                ...newUser._doc,
                password: ""
              }
            });
          }
        }
      );
    }
  });
});

userRouter.post("/login", (req, res) => {
  if (req.session.currentUser) {
    res.status(201).json({
      success: true,
      message: "Login success"
    });
  } else {
    const { email, password } = req.body;
    if (!email || !emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: "Invalid email address"
      });
    } else if (!password || password.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    } else {
      userModel.findOne({ email: email }, (error, data) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: error.message
          });
        } else if (!data) {
          res.status(400).json({
            success: false,
            message: "Email didn't exist"
          });
        } else {
          const checkValidPassword = bcryptjs.compareSync(
            password,
            data.password
          );
          if (!checkValidPassword) {
            res.status(400).json({
              success: false,
              message: "Wrong Password"
            });
          } else {
            req.session.currentUser = {
              _id: data._id,
              email: data.email,
              fullName: data.fullName
            };
            res.status(201).json({
              success: true,
              message: "Login success"
            });
          }
        }
      });
    }
  }
});
userRouter.get("/profile", (req, res) => {
  if (req.session.currentUser) {
    res.status(201).json({
      success: true,
      data: req.session
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Session not found"
    });
  }
});

userRouter.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Logout success"
      });
    }
  });
});
module.exports = userRouter;
