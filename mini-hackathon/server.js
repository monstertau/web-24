const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const playerModel = require('./models/member.model');
mongoose.connect(
  'mongodb://localhost:27017/minigame',
  { useNewUrlParser: true },
  (e) => {
    if (e) {
      console.log(e);
    } else {
      console.log('Connect to mongodb success');

      const app = express();
      app.use(express.static('public'));
      app.use(bodyParser.json());
      app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });
      app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, './public/html/index.html'));
      });

      app.post('/create-games', (req, res) => {
        console.log(req.body.playerName.myArray);
        playerModel.create({
          playerName: req.body.playerName.myArray,
        }, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message,
            })
          } else {
            console.log(data);
            res.status(201).json({
              success: true,
              id: data._id,
            });
          }
        })
      })
      app.get('/get-game-by-id/:gameId', (req, res) => {
        playerModel.findById(req.params.gameId, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message,
            });
          } else {
            // console.log(data);
            res.status(201).json({
              success: true,
              data: data,
            });
          }
        })
      })
      app.get('/games/:gameId', (req, res) => {
        res.sendFile(path.resolve(__dirname, './public/html/play.html'));
      })
      app.get('/playerInfo', (req, res) => {
        playerModel.findById(req.body.gameId, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message,
            })
          } else {
            console.log(data);
            res.status(201).json({
              success: true,
              data: data,
            });
          }
        })
      })
      app.put('/update-round', (req, res) => {
        playerModel.findById(req.body.id, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message
            });
          } else {
            if (!data) {
              res.status(404).json({
                success: false,
                message: `Game not found`,
              })
            }
            playerModel.findByIdAndUpdate(data._id, { $inc: { round: 1 } ,$push: { score: [0,0,0,0] } }, (error, data) => {
              if (error) throw error;
              else {
                console.log(data);
                res.status(201).json({
                  success: true,
                  data: data,
                })
              }
            })
            
          }
        })
      })
      app.put('/update-score', (req, res) => {
        playerModel.findById(req.body.id, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message
            });
          } else {
            if (!data) {
              res.status(404).json({
                success: false,
                message: `Game not found`,
              })
            }
            // console.log(req.body.score)
            // res.status(201).json({
            //   success:true,
            // })
            playerModel.findByIdAndUpdate(data._id, { score: req.body.score }, (error, data) => {
              if (error) throw error;
              else {
                console.log(data);
                res.status(201).json({
                  success: true,
                  data: data,
                })
              }
            })
            
          }
        })
      })


      app.listen(8080);
    }
  }
)

