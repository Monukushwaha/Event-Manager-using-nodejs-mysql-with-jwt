const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('../config');
const SECRET_KEY = config.secret;
require('dotenv').config();




// connection with database
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  }
},console.log("Database Connected"));

// routes for signup user
const signup = express.Router();
router.use("/", signup);
require("../routes/signup")(signup, knex);

// routes for login user
const login = express.Router();
router.use("/", login);
require("../routes/login")(login, jwt, knex, SECRET_KEY);


//  route to searchuser.js
const user = express.Router();
router.use("/", user);
require("../routes/users")(user,knex,jwt,SECRET_KEY)

// route to event.js
const event = express.Router();
router.use("/", event);
require("../routes/event")(event,knex,jwt,SECRET_KEY)

module.exports = router ;
