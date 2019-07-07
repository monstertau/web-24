const express = require("express");
const path = require('path');
const app = express();

app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/html/index.html'));
});
app.get('/css/style.css',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/css/style.css'));
});
app.get('/hoinhanh.html',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/html/hoinhanh.html'));
})
app.listen(3000);