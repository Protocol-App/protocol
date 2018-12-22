var twilio = require("twilio");
const bcrypt = require("bcryptjs");
const { ACCOUNT_SID, AUTH_TOKEN, TWILIO_NUMBER } = process.env;

//initialize twilio
var client = new twilio(ACCOUNT_SID, AUTH_TOKEN);

module.exports = {
  async signup(req, res) {
    let {
      schoolName,
      schoolCity,
      schoolState,
      adminFirst,
      adminLast,
      adminPhone,
      adminEmail,
      adminPassword
    } = req.body;
    let db = req.app.get("db");
    let foundAdmin = await db.find_admin([adminEmail]);
    if (foundAdmin[0])
      return res.status(200).send({ message: "Email already in use" });
    let [createdSchool] = await db.create_school([
      schoolName,
      schoolCity,
      schoolState
    ]);
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(adminPassword, salt);
    let [createdAdmin] = await db.create_admin([
      adminFirst,
      adminLast,
      adminPhone,
      adminEmail,
      hash,
      createdSchool.school_id
    ]);
    req.session.admin = {
      adminID: createdAdmin.admin_id,
      adminFirst: createdAdmin.admin_first,
      adminLast: createdAdmin.admin_last,
      adminPhone: createdAdmin.admin_phone_number,
      adminEmail: createdAdmin.admin_email,
      schoolID: createdSchool.school_id
    };
    res.status(200).send({
      admin: req.session.admin,
      school: {
        schoolID: createdSchool.school_id,
        schoolName: createdSchool.school_name,
        schoolCity: createdSchool.school_city,
        schoolState: createdSchool.school_state
      }
    });
  },
  async staffLogin(req, res) {
    let db = req.app.get("db");
    let { userPhoneNumber, userPin } = req.body;
    let [foundNumber] = await db.verify_staff_number([userPhoneNumber]);
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(userPin, salt);
    if (foundNumber) {
      client.messages
        .create({
          body: `Your pin is ${userPin}`,
          from: TWILIO_NUMBER,
          to: userPhoneNumber
        })
        .then(message => {
          db.set_user_pin([hash, userPhoneNumber]);
          console.log(message.sid);
        })
        .done();
      res.sendStatus(200);
    } else {
      res.status(404).send({ message: "Phone number not found." });
    }
  },
  async staffPinValidation(req, res) {
    let db = req.app.get("db");
    let { userPhoneNumber, userPin } = req.body;

    let [foundUser] = await db.find_user([userPhoneNumber]);
    if (foundUser) {
      let result = bcrypt.compareSync(userPin, foundUser.user_pin);
      if (result) {
        req.session.user = {
          userID: foundUser.user_id,
          userFirstName: foundUser.user_first_name,
          userLastName: foundUser.user_last_name,
          userPhoneNumber: foundUser.user_phone_number,
          userEmail: foundUser.user_email,
          defaultLocation: foundUser.default_location,
          userTitle: foundUser.user_title,
          schoolID: foundUser.school_id,
          emergencyStepsDone: foundUser.emergency_steps_done,
          emergencyStatus: foundUser.emergency_status
        };
        res.status(200).send({user: req.session.user, message: 'loggedIn'})
      } else {
      res.status(401).send({message: 'Invalid Pin.'})
      }
    }

  }
};
