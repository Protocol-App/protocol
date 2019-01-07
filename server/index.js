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
    //   // const id = req.session.user.customer_id
    //   if (process.env.NODE_ENV === 'development' && !req.session.admin ) {
      //       const db = req.app.get('db')
      //       let admin = await db.session_user(1);
//       req.session.admin = admin[0]
//   }
//   next();
// })

//connect server to build folder for deployment
app.use(express.static(`${__dirname}/../build`));

//connect to db with massive
massive(CONNECTION_STRING).then( db => {
  app.set("db", db);
  console.log(`db has docked!`);
});

//listen for socket connection
io.on('connection', async socket => {
  console.log('user is connected')
  const db = await app.get('db')
  //every time client connect, fetch all active emergencies from db
  let schoolsWithEmergencies = await db.get_active_emergencies()
    io.emit('emergencies', schoolsWithEmergencies)

  
//when an emergency is invoked from another individual client while someone is on website, emit the emergency to frontend and add it to redux
  socket.on('emergency', (data) => {
    io.emit('emergency', data)
  })

  //when a staff member updates their status and we want to funnel that to the admin's dashboard

    socket.on('staff-update', async () => {
      console.log('staff update received')
      // app.get(async (req) => {
      //   console.log('session admin?', req.session.admin)
      //   if(req.session.admin) {
      //     const {schoolID} = req.session.admin
      //     let updatedStaffArray = await db.get_staff([schoolID])
      //     console.log(updatedStaffArray)
      //     io.emit('staff-update', updatedStaffArray)
      //   }
      })

      // })
  
  
  //when an emergency is cancelled, emit full array of emergencies to every client listening (in app.js)
  socket.on('cancelled-emergency', () => {
  io.emit('emergencies', schoolsWithEmergencies)
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

app.get('/api/adminschoolemergency', AdminController.getAdminSchoolEmergency)

app.post('/api/cancelemergency', AdminController.cancelEmergency)

//staff endpoints
app.post('/api/confirmemergency', StaffController.createEmergency)

app.get('/api/staffschoolemergency', StaffController.getStaffSchoolEmergency)

app.get('/api/emergencyprotocol', StaffController.getEmergencyProtocol)

app.post('/api/completeprotocol', StaffController.completeProtocol)

app.post('/api/status', StaffController.updateStaffStatus)

//listen
server.listen(SERVER_PORT, () => {
  console.log(`Ahoy, port ${SERVER_PORT},`);
});
