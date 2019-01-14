var twilio = require("twilio");
const { ACCOUNT_SID, AUTH_TOKEN, TWILIO_NUMBER } = process.env;
var client = new twilio(ACCOUNT_SID, AUTH_TOKEN);

module.exports = {
  createUser: async (req, res) => {
    const {
      FirstName,
      LastName,
      formattedPhoneNumber,
      Email,
      DefaultLocation,
      Title
    } = req.body;
    const { schoolID } = req.session.admin;
    const db = req.app.get("db");
    let [user] = await db.create_new_user([
      FirstName,
      LastName,
      formattedPhoneNumber,
      Email,
      DefaultLocation,
      Title,
      schoolID
    ]);
    res.status(200).send(user);
  },

  displayUsers: async (req, res) => {
    const db = req.app.get("db");
    let id = req.session.admin.schoolID;
    const users = await db.display_users([id]);
    res.status(200).send(users);
  },

  updateUser: async (req, res) => {
    const {
      userFirstName,
      userLastName,
      formattedPhoneNumber,
      userEmail,
      userDefaultLocation,
      userTitle,
      selectedUserId
    } = req.body;
    const db = req.app.get("db");
    let [user] = await db.update_user([
      userFirstName,
      userLastName,
      formattedPhoneNumber,
      userEmail,
      userDefaultLocation,
      userTitle,
      selectedUserId
    ]);
    res.status(200).send(user);
  },

  async deleteUser(req, res) {
    let db = req.app.get("db");
    let id = req.params.id;
    await db.delete_user(id);
    res.sendStatus(200);
  },

  displayUsers: async (req, res) => {
    const db = req.app.get("db");
    if (req.session.admin) {
      let id = req.session.admin.schoolID;
      const users = await db.display_users([id]);
      res.status(200).send(users);
    } else {
      res.sendStatus(200);
    }
  },
  getProtocol: async (req, res) => {
    const db = req.app.get("db");
    const { schoolID } = req.session.admin;
    const { protocolName } = req.body;
    const [protocol] = await db.get_protocol([protocolName, schoolID]);
    activeShooterProtocol = [
      protocol.protocol_1,
      protocol.protocol_2,
      protocol.protocol_3,
      protocol.protocol_4,
      protocol.protocol_5,
      protocol.protocol_6,
      protocol.protocol_7,
      protocol.protocol_8,
      protocol.protocol_9,
      protocol.protocol_10
    ];
    res.status(200).send(activeShooterProtocol);
  },

  editProtocol: async (req, res) => {
    const db = req.app.get("db");
    const { schoolID } = req.session.admin;
    const {
      step1,
      step2,
      step3,
      step4,
      step5,
      step6,
      step7,
      step8,
      step9,
      step10,
      protocolName
    } = req.body;
    await db.edit_protocol([
      step1,
      step2,
      step3,
      step4,
      step5,
      step6,
      step7,
      step8,
      step9,
      step10,
      protocolName,
      schoolID
    ]);
    res.sendStatus(200);
  },
  cancelEmergency: async (req, res) => {
    const db = req.app.get("db");
    if (req.session.admin) {
      const { schoolID } = req.session.admin;
      let [schoolWithEmergency] = await db.get_school_emergency_id([schoolID]);
      const emergencyID = schoolWithEmergency.emergency_id;
      await db.cancel_school_emergency([emergencyID]);
      await db.reset_users([schoolID]);
      let protocolName = schoolWithEmergency.protocol_name.replace(/_/, " ")
      let staffNumArray = await db.get_staff_phone_numbers([schoolID])
      if (staffNumArray) {
        staffNumArray.forEach((obj) => {
          client.messages.create({
            body: `ACTIVE ALERT CANCELLED: The ${protocolName} emergency at ${schoolWithEmergency.school_name} has been cancelled and is no longer a threat.`,
            from: TWILIO_NUMBER,
            to: obj.user_phone_number
          }).then(() => {
          }).catch((err) => {
            console.log(err)
          })
          .done();
      }
      )}
      res.status(200).send(`School ${schoolID} no longer has an active emergency.`);
    } else (
      res.status(401).send(`Admin session not found.`)
    )
  }
};
