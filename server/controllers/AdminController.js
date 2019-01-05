module.exports = {
   createUser: async (req,res)=>{
       const {FirstName, LastName, formattedPhoneNumber, Email, DefaultLocation, Title} = req.body
       const {schoolID} =  req.session.admin
        const db = req.app.get('db')
        let [user] = await db.create_new_user([FirstName, LastName, formattedPhoneNumber, Email, DefaultLocation, Title, schoolID])
        res.status(200).send(user)

   },
   displayUsers: async (req,res)=>{
       const db=req.app.get('db')
       let id = req.session.admin.schoolID
       const users = await db.display_users([id])
       res.status(200).send(users)
   },
   getProtocol: async (req, res) => {
       const db = req.app.get('db');
       const {schoolID} = req.session.admin;
       const {protocolName} = req.body       
       const [protocol] = await db.get_protocol([protocolName, schoolID])
       activeShooterProtocol = {
        protocol1: protocol.protocol_1,
        protocol2: protocol.protocol_2,
        protocol3: protocol.protocol_3,
        protocol4: protocol.protocol_4,
        protocol5: protocol.protocol_5,
        protocol6: protocol.protocol_6,
        protocol7: protocol.protocol_7,
        protocol8: protocol.protocol_8,
        protocol9: protocol.protocol_9,
        protocol10: protocol.protocol_10
       }
       res.status(200).send(activeShooterProtocol)
   },
   editProtocol: async (req, res) => {
       const db = req.app.get('db');
       const {schoolID} = req.session.admin;
       const {step1, step2, step3, step4, step5, step6, step7, step8, step9, step10, protocolName} = req.body
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
        ])
        res.sendStatus(200)
   },
   getAdminSchoolEmergency: async (req, res) => {
       const db = req.app.get('db')
       const {schoolID} = req.session.admin
       let [schoolEmergency] = await db.get_school_emergency_id([schoolID])
       if (schoolEmergency) {
           res.status(200).send({activeEmergency: schoolEmergency})
       } else {
           res.sendStatus(200)
       }
   },
   cancelEmergency: async (req, res) => {
       const db = req.app.get('db')
       const {schoolID} = req.session.admin
       let [schoolWithEmergency] = await db.get_school_emergency_id([schoolID])
       const emergencyID = schoolWithEmergency.emergency_id
       await db.cancel_school_emergency([emergencyID]);
       res.status(200).send(`School ${schoolID} no longer has emergency`)
   }
}