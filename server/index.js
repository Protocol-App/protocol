require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

//destructure from .env
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

//initialize express app
const app = express();

//initialize session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

//body-parser middleware
app.use(express.json());

//connect to db with massive
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log(`db has docked!`)
});

//connect server to build folder for deployment
app.use(express.static(`${__dirname}/../build`));

//endpoints

//listen
app.listen(SERVER_PORT, () => {
   console.log(`Ahoy, port ${SERVER_PORT},`)
});
