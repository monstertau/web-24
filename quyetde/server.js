const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(express.static('public'));
app.use(bodyParser.json());
var id;

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/index.html'));
});
// app.get('/css/style.css',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'./public/css/style.css'));
// });
// app.get('/js/main.js',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'./public/js/main.js'));
// });
app.get('/hoinhanh.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/hoinhanh.html'));
});
app.post('/create-question', (req, res) => {
    //save question to database 
    // question content
    //like dislike
    // createdAt
    //save newQuestion
    fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        } else {
            const questionList = JSON.parse(data);
            const newQuestionId = new Date().getTime();
            const newQuestion = {
                id: newQuestionId,
                questionContent: req.body.questionContent,
                like: 0,
                dislike: 0,
                createdAt: new Date().toString(),
            };
            questionList.push(newQuestion);


            fs.writeFile('./data.json', JSON.stringify(questionList), (error) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        id: newQuestionId,
                    })
                }
            });
        }
    })
});
app.get('/question/:id', (req, res) => {
    let QuestionL;
    fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        } else {
            QuestionL = JSON.parse(data);
            id = req.params
            i = 0;
            while (1) {
                if (id.id == QuestionL[i].id) {
                    break;
                }
                else i++;
            }
        }
        fs.writeFile("./datatmp.json", JSON.stringify(QuestionL[i]), (error) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        });
    })

    res.sendFile(path.resolve(__dirname, './public/html/dapgon.html'));

});
app.get('/questionlist', (req, res) => {
    res.sendFile(path.resolve(__dirname, './datatmp.json'));
});
app.post('/update-question', (req, res) => {
    fs.readFile('./data.json', { enconding: 'utf8' }, (error, data) => {
        if (error) {
            res.json({
                success: false,
                message: error.message,
            });
        }
        else {
            const questionL1 = JSON.parse(data);
            console.log(req.body);
            id = req.body;
            console.log(id.id);
            i = 0;
            while (1) {
                if (id.id == questionL1[i].id) {
                    questionL1[i].dislike=id.dislike;
                    questionL1[i].like=id.like;
                    break;
                }
                else i++;
            }
            console.log(questionL1[i]);
            fs.writeFile("./data.json", JSON.stringify(questionL1), (error) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                }
                else {
                    res.status(201).json({
                        success: true,
                    });
                }
            });
        }
    });
});
app.get('/random', (req, res) => {
    fs.readFile('./data.json', { enconding: 'utf8' }, (error, data) => {
        let questionL2;
        if (error) {
            res.json({
                success: false,
                message: error.message,
            });
        }
        else {
            questionL2 = JSON.parse(data);
            i = Math.floor(Math.random() * questionL2.length);
            id = req.params;
        }
        fs.writeFile("./datatmp.json", JSON.stringify(questionL2[i]), (error) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        });

    });

    res.sendFile(path.resolve(__dirname, './public/html/index.html'));
});
app.listen(3000);