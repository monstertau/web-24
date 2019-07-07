const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.send('Hello World!!');

});
app.get('/about', (req,res)=>{
    res.send("About us!!");
});

app.get('/introduction',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/index.html'));
});
// app.get('/style.css',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'./public/style.css'));
// });
app.listen(3000);