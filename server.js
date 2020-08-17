const  express = require('express');
const app = express();
// const mysql = require('mysql'); 
// const axios = require('axios');


app.use(express.json());
app.use('/',require('./controller/app'));

const server  = app.listen(process.env.PORT,function(){
  console.log(`Server listening at ${ process.env.PORT } port`)
});