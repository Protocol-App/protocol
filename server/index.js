require("dotenv").config();
const express = require("express");
const http = require('http')
const socket = require('socket.io')
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
const server = http.createServer(app)

// initialize sockets
const io = socket(server)

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

//listen for socket connection
io.on('connection', async socket => {
  console.log('user is connected')
  const db = app.get('db')
  //every time client connect, fetch all active emergencies from db
  let schoolsWithEmergencies = await db.get_schools_with_emergency_id()
  io.emit('emergencies', schoolsWithEmergencies)
  
//when an emergency is invoked from another individual client while someone is on website, emit the emergency to frontend and add it to redux
  socket.on('emergency', (data) => {
    io.emit('emergency', data)
  })
})

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

//staff endpoints
app.post('/api/confirmemergency', StaffController.createEmergency)

//listen
server.listen(SERVER_PORT, () => {
  console.log(`Ahoy, port ${SERVER_PORT},`);
});
