
var twilio = require("twilio");
const { ACCOUNT_SID, AUTH_TOKEN, TWILIO_NUMBER } = process.env;

//initialize twilio
var client = new twilio(ACCOUNT_SID, AUTH_TOKEN);

module.exports = {
  createEmergency: async (req, res) => {
    if (req.session.user) {
      const db = req.app.get("db");
      const { emergencyName, userID, swiped } = req.body;
      const {schoolID} = req.session.user
      let [protocol] = await db.get_protocol([emergencyName, schoolID]);
      let [newEmergency] = await db.create_emergency([protocol.protocol_id, userID, swiped]);
      let [schoolWithEmergency] = await db.insert_emergency_id([newEmergency.emergency_id, schoolID]);
      let staffNumArray = await db.get_staff_phone_numbers([schoolID])
      let [adminNum] = await db.get_admin_phone_number([schoolID])
      let uppercaseActiveProtocol = emergencyName.replace(/_/, " ").toUpperCase()
      if (staffNumArray && adminNum) {
        staffNumArray.forEach((phoneNumber) => {
          client.messages.create({
            body: `${uppercaseActiveProtocol} EMERGENCY -  An active alert has been initiated at ${schoolWithEmergency.school_name}. Please log onto your Protocol app and follow the protocol immediately.`,
            from: TWILIO_NUMBER,
            to: phoneNumber.user_phone_number
          }).then(() => {
          }).catch((err) => {
            console.log(err)
          })
          .done();
        })
        client.messages.create({
          body: `${uppercaseActiveProtocol} EMERGENCY: An active alert has been reported by a staff member at ${schoolWithEmergency.school_name}. Please log onto your Protocol dashboard to address the alert immediately.`,
          from: TWILIO_NUMBER,
          to: adminNum.admin_phone_number
        }).then(() => {
        })
        .done();
      }
      res.status(200).send({schoolWithEmergency});
    } else {
      res.status(401).send('User not logged in.')
    }
  },
  getSchoolEmergency: async (req, res) => {
    const db = req.app.get('db')
    if (req.session.admin || req.session.user) {
      const {schoolID} = req.session.user || req.session.admin
      let [schoolEmergency] = await db.get_school_emergency_id([schoolID])
      if (schoolEmergency) {
          res.status(200).send({activeEmergency: schoolEmergency})
      } else {
        res.status(200).send('No active emergency.')
    }
  } else {
    res.status(200).send('User is not logged in.')
  }
},
getEmergencyProtocol: async (req, res) => {
  const db = req.app.get('db')
  if (req.session.user) {
    const {schoolID} = req.session.user
    let [emergencyData] = await db.get_school_emergency_id([schoolID])
    if (emergencyData) {
      const protocolName = emergencyData.protocol_name;
      const protocolArray = [
        emergencyData.protocol_1,
        emergencyData.protocol_2,
        emergencyData.protocol_3,
        emergencyData.protocol_4,
        emergencyData.protocol_5,
        emergencyData.protocol_6,
        emergencyData.protocol_7,
        emergencyData.protocol_8,
        emergencyData.protocol_9,
        emergencyData.protocol_10,
      ]
      res.status(200).send({protocolName, protocolArray})
    } else {
      res.status(200).send('No active emergency')
    }
  } else {
    res.sendStatus(401)
  }
},
completeProtocol: async (req, res) => {
  const db = req.app.get('db');
  const {userID} = req.session.user
  await db.set_user_emergency_steps_done([userID])
  res.sendStatus(200)
},
updateStaffStatus: async (req, res) => {
  const db = req.app.get('db');
  const {userID} = req.session.user;
  const {status} = req.body
  let [user] = await db.update_user_status([status, userID])
  res.status(200).send({user})
},
getUpdatedChat: async (req, res) => {
  const db = req.app.get('db');
  const {schoolID} = (req.session.user || req.session.admin)
  let [emergencyID] = await db.get_emergency_id([schoolID])
  if (emergencyID) {
    let chatArray = await db.get_chat([schoolID, emergencyID.emergency_id])
    res.status(200).send(chatArray)
  } else {
    res.sendStatus(404)
  }
},
addChatMessage: async (req, res) => {
  const db = req.app.get('db');
  const {chatName, chatMessage, timestamp} = req.body;
  if (req.session.admin) {
    var {schoolID} = req.session.admin
    var userID = req.session.admin.adminID
  } else if (req.session.user) {
    var {schoolID, userID} = req.session.user
  }
  let [emergencyID] = await db.get_emergency_id([schoolID])
  await db.add_chat_message([schoolID, emergencyID.emergency_id, userID, chatName, chatMessage, timestamp])
  res.sendStatus(200)
}
};
