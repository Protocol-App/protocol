module.exports = {
  createEmergency: async (req, res) => {
    const db = req.app.get("db");
    const { emergencyName, userID, schoolID, swiped } = req.body;
    let [protocol] = await db.get_protocol([emergencyName, schoolID]);
    let [newEmergency] = await db.create_emergency([protocol.protocol_id, userID, swiped]);
    let [schoolWithEmergency] = await db.insert_emergency_id([newEmergency.emergency_id, schoolID]);
    res.status(200).send({schoolWithEmergency});
  },
  getStaffSchoolEmergency: async (req, res) => {
    const db = req.app.get('db')
    const {schoolID} = req.session.user
    let [schoolEmergency] = await db.get_school_emergency_id([schoolID])
    if (schoolEmergency) {
        res.status(200).send({activeEmergency: schoolEmergency})
    } else {
        res.sendStatus(200)
    }
},
getEmergencyProtocol: async (req, res) => {
  const db = req.app.get('db')
  const {schoolID} = req.session.user
  let [emergencyData] = await db.get_emergency_data([schoolID])
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
}
};
