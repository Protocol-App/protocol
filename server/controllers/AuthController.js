var twilio = require("twilio");
const bcrypt = require("bcryptjs");
const { ACCOUNT_SID, AUTH_TOKEN, TWILIO_NUMBER } = process.env;

//initialize twilio
var client = new twilio(ACCOUNT_SID, AUTH_TOKEN);

module.exports = {
  async staffLogin(req, res) {
    let db = req.app.get("db");
    let { userPhoneNumber, userPin } = req.body;
    let [foundNumber] = await db.verify_staff_number([userPhoneNumber]);
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(userPin, salt);
    if (foundNumber) {
      client.messages.create({
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

  adminLogin: (req, res) => {
    const { adminEmail, password } = req.body
    console.log(req.body)
    const db = req.app.get('db')
    db.admin_login([adminEmail]).then(admin => {
        console.log(password)
        if (admin.length !== 0) {
            const validPassword = bcrypt.compareSync(password, admin[0].admin_hash)
            console.log(req.session, 'req session')
            if (validPassword) {
                req.session.admin = {
                    adminID: admin.admin_id,
                    email: admin.email,
                    firstName: admin.first_name,
                    lastName: admin.last_name,
                    phoneNumber: admin.admin_phone_number,
                    schoolID: admin.school_id
                };
                res.status(200).send()

            } else {
                res.status(200).send('Invalid Password')
            }
        } else {
            res.status(200).send('Admin does not exist.')
        }
    })

},

  async signup(req, res) {
    let {
      adminEmail,
      adminPassword,
      schoolID,
      schoolName,
      schoolCity,
      schoolState
    } = req.body;

    let db = req.app.get("db");
    let foundAdmin = await db.find_admin([adminEmail]);
    if (foundAdmin[0])
      return res.status(200).send({ message: "Email already in use" });
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(adminPassword, salt);
    let [createdAdmin] = await db.create_admin([adminEmail, hash]);
    let [createdSchool] = await db.create_school([
      schoolID,
      schoolName,
      schoolCity,
      schoolState
    ]);
    req.session.admin = {
      adminID: createdAdmin.admin_id,
      email: createdAdmin.admin_email,
      firstName: createdAdmin.admin_first,
      lastName: createdAdmin.admin_last,
      schoolID: createdSchool.school_id,
      schoolName: createdSchool.school_name,
      schoolCity: createdSchool.school_city,
      schoolState: createdSchool.school_state
    };
  }
};
