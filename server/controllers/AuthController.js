var twilio = require("twilio");
const bcrypt = require("bcryptjs");
const { ACCOUNT_SID, AUTH_TOKEN, TWILIO_NUMBER } = process.env;

//initialize twilio
var client = new twilio(ACCOUNT_SID, AUTH_TOKEN);

module.exports = {
  async staffLogin(req, res) {
    let db = req.app.get("db");
    let { userPhoneNumber, userPin } = req.body;
    console.log("user pin:", userPin);
    let [foundNumber] = await db.verify_staff_number([userPhoneNumber]);
    console.log("Found Number", foundNumber);
    console.log("User Phone Number:", userPhoneNumber);

    let salt = bcrypt.genSaltSync(10);
    console.log("Salt is:", salt);
    let hash = bcrypt.hashSync(userPin, salt);
    console.log("Hash is:", hash);
    if (foundNumber) {
      console.log(userPin);
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
  }
};
