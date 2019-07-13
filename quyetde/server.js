const express = require(`express`);
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const questionModel = require('./models/question.model');

mongoose.connect(
  'mongodb://localhost:27017/quyetde',
  {useNewUrlParser: true},
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

        // fs.readFile('./data.json', (error, data) => {
        //   if (error) {
        //     res.status(500).json({
        //       success: false,
        //       message: error.message,
        //     });
        //   } else {
        //     const questionList = JSON.parse(data);
        //     const newQuestionId = new Date().getTime();
        //     const newQuestion = {
        //       id: newQuestionId,
        //       questionContent: req.body.questionContent,
        //       like: 0,
        //       dislike: 0,
        //       createdAt: new Date().toString(),
        //     };
        //     questionList.push(newQuestion);

        //     fs.writeFile('./data.json', JSON.stringify(questionList), (error) => {
        //       if (error) {
        //         res.status(500).json({
        //           success: false,
        //           message: error.message,
        //         });
        //       } else {
        //         res.status(201).json({
        //           success: true,
        //           id: newQuestionId,
        //         });
        //       }
        //     });
        //   }
        // });
      });

      app.get('/get-question-by-id/:questionId', (req, res) => {
        fs.readFile('./data.json', {encoding: 'utf8'}, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message,
            });
          } else {
            const listQuestions = JSON.parse(data);
            let selectedQuestion;
            for (let i = 0; i < listQuestions.length; i += 1) {
              if (String(listQuestions[i].id) === req.params.questionId) {
                selectedQuestion = listQuestions[i];
                break;
              }
            }

            res.status(200).json({
              success: true,
              data: selectedQuestion,
            });
          }
        });
      });

      app.get('/get-random-question', (req, res) => {
        fs.readFile('./data.json', {encoding: 'utf8'}, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message
            });
          } else {
            const listQuestions = JSON.parse(data);
            const randomQuestion = listQuestions[Math.floor(Math.random() * listQuestions.length)];
            res.status(200).json({
              success: true,
              data: randomQuestion,
            });
          }
        });
      });

      app.put('/vote', (req, res) => {
        fs.readFile('./data.json', {encoding: 'utf8'}, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message,
            })
          } else {
            const listQuestions = JSON.parse(data);
            for (let i = 0; i < listQuestions.length; i += 1) {
              if (listQuestions[i].id === req.body.id) {
                listQuestions[i][req.body.vote] += 1;
              }
            }

            fs.writeFile('./data.json', JSON.stringify(listQuestions), (err) => {
              if (err) {
                res.status(500).json({
                  success: false,
                  message: err.message,
                });
              } else {
                res.status(201).json({
                  success: true,
                });
              }
            });
          }
        });
      });

      app.listen(3000);
    }
  },
);