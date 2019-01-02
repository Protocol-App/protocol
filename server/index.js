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

//developer session middleware
// app.use(async (req, res, next) => {
//   console.log(process.env.NODE_ENV , req.session.email)
//   // const id = req.session.user.customer_id
//   if (process.env.NODE_ENV === 'development' && !req.session.admin ) {
//       const db = req.app.get('db')
//       let admin = await db.session_user(1);
//       req.session.admin = admin[0]
//       console.log('middleware', req.session.admin)
//   }
//   next();
// })

//connect server to build folder for deployment
app.use(express.static(`${__dirname}/../build`));

//connect to db with massive
massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log(`db has docked!`);
});

//auth endpoints
app.post('/auth/signup', AuthController.adminSignup)

app.post('/auth/adminlogin', AuthController.adminLogin);

app.post('/auth/stafflogin', AuthController.staffLogin);

app.post('/auth/staffpin', AuthController.staffPinValidation);

app.get('/auth/sessiondata', AuthController.getSessionData);

app.post('/auth/logout', AuthController.logout);

//admin endpoints
app.post('/create/user', AdminController.createUser)

app.get('/api/users', AdminController.displayUsers)

app.post('/api/protocol', AdminController.getProtocol)

app.put('/api/protocol', AdminController.editProtocol)

//listen
app.listen(SERVER_PORT, () => {
  console.log(`Ahoy, port ${SERVER_PORT},`);
});
