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
    console.log('session user school id', schoolID)
    let [schoolEmergency] = await db.get_school_emergency_id([schoolID])
    console.log('school emergency? ', schoolEmergency)
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
    res.status(200).send({activeEmergency: emergencyData})
  } else {
    res.status(200).send('No active emergency')
  }
}
};
