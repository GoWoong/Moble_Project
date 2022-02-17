const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const database = require('./config/database');
const con = mysql.createConnection(database);

con.connect((err)=>{
  if (err) throw err;
  console.log('connected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/public/main.html')
})

app.get('/name',(req,res)=>{
  con.query("SELECT name FROM member", (err, result, fields) =>{
    if (err) throw err;
    let result_entries = Object.entries(result);
    res.send(result_entries[0][1]);
  })
})

app.post('/email_post',(req,res) => {
  //res.send(`<h1>Welcome ${req.body.email}!!</h1>`);
  res.render('email.ejs', {'email' : req.body.email});
})

app.post('/ajax_send_email',(req,res)=>{
  console.log(req.body.email);
  let responseData = {'result':'ok','email': req.body.email};
  res.json(responseData);
});

app.listen(3000,() =>{
  console.log("서버가 실행 합니다.");
});