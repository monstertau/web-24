const express = require('express');
const UserModel = require('./users.model');
const bcryptjs = require('bcryptjs');

const userRouter = express.Router();
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

userRouter.get('/test', (req, res) => {
  console.log('Current User: ', req.session.currentUser);

  res.json({
    success: true,
  });
});

userRouter.post('/register', (req, res) => {
  // get email + pw + fullName from req.body
  const { email, password, fullName } = req.body;

  // validate email, pw, fullName
  if (!email || !emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: 'Invalid email adress',
    });
  } else if (!password || password.length < 6) {
    res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters',
    });
  } else if (!fullName) {
    res.status(400).json({
      success: false,
      message: 'Please input full name',
    });
  } else {
    // check email exist
    UserModel.findOne({email: email}, (error, data) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      } else if (data) {
        res.status(400).json({
          success: false,
          message: 'Email has beed used',
        });
      } else {
        // hash password
        const hashPassword = bcryptjs.hashSync(password, 10);

        // save to db
        UserModel.create({
          ...req.body,
          password: hashPassword,
        }, (err, newUser) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: err.message,
            });
          } else {
            res.status(201).json({
              success: true,
              data: {
                ...newUser._doc,
                password: '',
              },
            });
          }
        });
      }
    });
  }
});

userRouter.post('/login', (req, res) => {
  // get email + pw from req.body
  const { email, password } = req.body;

  // check email exist
  UserModel.findOne({email: email}, (error, data) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else if (!data) {
      res.status(400).json({
        success: false,
        message: 'Email didnt exist',
      });
    } else if (!bcryptjs.compareSync(password, data.password)) {
      // compare password
      res.status(400).json({
        success: false,
        message: 'Wrong password'
      });
    } else {
      // save currentUser info to session storage
      req.session.currentUser = {
        _id: data._id,
        email: data.email,
        fullName: data.fullName,
      };

      res.status(200).json({
        success: true,
        message: 'Login success',
        data: {
          email: data.email,
          fullName: data.fullName,
        },
      });
    }
  });
});

userRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Logout success',
      });
    }
  });
});

module.exports = userRouter;