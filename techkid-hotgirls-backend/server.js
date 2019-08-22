const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./users/users.router');
const session = require('express-session');
const cors = require('cors');
const postRouter = require('./posts/posts.router');
const uploadRouter = require('./uploads/uploads.router');

mongoose.connect('mongodb://localhost:27017/techkid-hotgirls', (error) => {
  if (error) {
    throw error;
  } else {
    console.log('Connect to mongodb success ...');
    const app = express();

    // use middleware
    app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }));
    app.use(bodyParser.json());
    app.use(session({
      secret: 'keyboard cat',
    }));
    app.use(express.static('public'))

    // routers
    // /users/test
    app.use('/users', userRouter);
    app.use('/posts', postRouter);
    app.use('/uploads', uploadRouter);

    // start server
    app.listen(3001, (err) => {
      if (err) {
        throw err;
      }
      console.log('Server listen on port 3001 ...');
    });
  }
});