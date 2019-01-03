module.exports = {
  createEmergency: async (req, res) => {
    const db = req.app.get("db");
    const { emergencyName, userID, schoolID, swiped } = req.body;
    let [protocol] = await db.get_protocol([emergencyName, schoolID]);
    let [newEmergency] = await db.create_emergency([protocol.protocol_id, userID, swiped]);
    // console.log(newEmergency);
    let [schoolWithEmergency] = await db.insert_emergency_id([newEmergency.emergency_id, schoolID]);
    // console.log(schoolWithEmergency);
    res.status(200).send({schoolWithEmergency});
  }
};
