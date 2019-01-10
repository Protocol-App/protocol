require("dotenv").config();
const express = require("express");
const http = require("http");
const socket = require("socket.io");
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
const server = http.createServer(app);

// initialize sockets
const io = socket(server);

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

//connect server to build folder for deployment
app.use(express.static(`${__dirname}/../build`));

//connect to db with massive

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log(`db has docked!`);
});

//listen for socket connection
io.on("connection", async socket => {
  console.log("user is connected");
  io.emit("get-emergencies");

  //when an emergency is invoked from another individual client while someone is on website, emit the emergency to frontend and add it to redux
  socket.on("emergency", () => {
    io.emit("get-emergencies");
  });

  //when a staff member updates their status and we want to funnel that to the admin's dashboard
  socket.on("staff-update", () => {
    io.emit("trigger-staff-api-call");
  });

  //when an emergency is cancelled, emit full array of emergencies to every client listening (in app.js)
  socket.on("cancelled-emergency", () => {
    io.emit("get-emergencies");
  });

  // when a chat message is emitted
  socket.on(`chat-update`, () => {
    io.emit(`get-updated-chat`);
  });
});

//auth endpoints
app.post("/auth/signup", AuthController.adminSignup);

app.post("/auth/adminlogin", AuthController.adminLogin);

app.post("/auth/stafflogin", AuthController.staffLogin);

app.post("/auth/staffpin", AuthController.staffPinValidation);

app.get("/auth/sessiondata", AuthController.getSessionData);

app.post("/auth/logout", AuthController.logout);

//admin endpoints
app.post("/create/user", AdminController.createUser);

app.put("/api/user", AdminController.updateUser);

app.delete("/api/user/:id", AdminController.deleteUser);

app.get("/api/users", AdminController.displayUsers);

app.post("/api/protocol", AdminController.getProtocol);

app.put("/api/protocol", AdminController.editProtocol);

app.post("/api/cancelemergency", AdminController.cancelEmergency);

//staff endpoints
app.post("/api/confirmemergency", StaffController.createEmergency);

app.get("/api/schoolemergency", StaffController.getSchoolEmergency);

app.get("/api/emergencyprotocol", StaffController.getEmergencyProtocol);

app.post("/api/completeprotocol", StaffController.completeProtocol);

app.post("/api/status", StaffController.updateStaffStatus);

app.get("/api/chat", StaffController.getUpdatedChat);

app.post("/api/chat", StaffController.addChatMessage);

//listen
server.listen(SERVER_PORT, () => {
  console.log(`Ahoy, port ${SERVER_PORT},`);
});
