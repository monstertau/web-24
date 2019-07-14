const express = require(`express`);
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const questionModel = require('./models/question.model');

mongoose.connect(
  'mongodb://localhost:27017/quyetde',
  { useNewUrlParser: true },
  (e) => {
    if (e) {
      console.log(e);
    } else {
      console.log('Connect to mongodb sucess');

      const app = express();

      // routers
      app.use(express.static('public'));
      app.use(bodyParser.json());

      app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, './public/html/index.html'));
      });

      app.get('/question/:questionId', (req, res) => {
        console.log(req.params);
        res.sendFile(path.resolve(__dirname, './public/html/question.html'));
      });

      app.get('/ask', (req, res) => {
        res.sendFile(path.resolve(__dirname, './public/html/ask.html'));
      });

      app.post('/create-question', (req, res) => {
        // save newQuestion
        questionModel.create({
          questionContent: req.body.questionContent,
        }, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message,
            });
          } else {
            res.status(201).json({
              success: true,
              id: data._id,
            });
          }
        });
      });

      app.get('/get-question-by-id/:questionId', (req, res) => {

        questionModel.findById(req.params.questionId, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message,
            });
          } else {
            console.log(data);
            res.status(200).json({
              success: true,
              data: data,
            });
          }
        })
      });

      app.get('/get-random-question', (req, res) => {
        questionModel.count().exec((error, count) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message,
            })
          }
          // Get a random entry
          let random = Math.floor(Math.random() * count)

          // Again query all users but only fetch one offset by our random #
          questionModel.findOne().skip(random).exec(
            (error, result) => {
              if (error) {
                res.status(500).json({
                  success: false,
                  message: error.message,
                })
              } else {
                //console.log(result);
                res.status(200).json({
                  success: true,
                  data: result,
                })
              }
            })
        })
      });

      app.put('/vote', (req, res) => {
        questionModel.findById(req.body.id, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message
            });
          } else {

            let updateVote = req.body.vote;
            console.log(updateVote);
            if (updateVote === 'like') {
              questionModel.findByIdAndUpdate(data._id, { $inc: { like: 1 } }, (error, data) => {
                if (error) throw error;
                else {
                  console.log(data);
                  res.status(201).json({
                    success: true,
                  })
                }
              })
            }
            if (updateVote === 'dislike') {
              questionModel.findByIdAndUpdate(data._id, {
                $inc: { dislike: 1 }
              }, (error, data) => {
                if (error) throw error;
                else {
                  console.log(data);
                  res.status(201).json({
                    success: true,
                  })
                }
              })
            }
            console.log(data)
          }
        })

      });
      app.get('/find', (req, res) => {
        res.sendFile(path.resolve(__dirname, './public/html/find.html'));
      })
      function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      };
      app.post('/find-question', (req, res) => {
        let questionFind = req.body.questionContent;
        console.log(questionFind);
        const regex = new RegExp(escapeRegex(questionFind), 'gi');
        questionModel.find({ questionContent: regex }, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message
            })
          } else {
            console.log(data)
            res.status(201).json({
              success: true,
              data: data,
            })
          }
        })
      })
      
      app.get('/find/:content', (req, res) => {
        // console.log(req.params);
        res.sendFile(path.resolve(__dirname, './public/html/findlist.html'));
      })
      app.listen(3000);
    }
  },
);