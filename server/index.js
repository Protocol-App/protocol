require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const AuthController = require("./controllers/AuthController");
const AdminController = require("./controllers/AdminController");
const StaffController = require("./controllers/StaffController");
const bodyParser = require("body-parser");

//destructure from .env
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

//initialize express app
const app = express();

//initialize session
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

//body-parser middleware
app.use(express.json());

//twilio middleware
app.use(bodyParser.urlencoded({ extended: false }));

//connect to db with massive
massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log(`db has docked!`);
});

//connect server to build folder for deployment
app.use(express.static(`${__dirname}/../build`));

//endpoints
// app.post('/auth/signup', controller.signup)

app.post('/auth/stafflogin', AuthController.staffLogin);

app.post('/auth/staffpin', AuthController.staffPinValidation);

//listen
app.listen(SERVER_PORT, () => {
  console.log(`Ahoy, port ${SERVER_PORT},`);
});
