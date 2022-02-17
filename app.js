const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/public/main.html')
})

app.post('/email_post',(req,res) => {
  //res.send(`<h1>Welcome ${req.body.email}!!</h1>`);
  res.render('email.ejs', {'email' : req.body.email});
})

app.listen(3000,() =>{
  console.log("서버가 실행 합니다.");
});

app.post('/ajax_send_email',(req,res)=>{
  console.log(req.body.email);
  let responseData = {'result':'ok','email': req.body.email};
  res.json(responseData);
});  