module.exports = {
   createUser: async (req,res)=>{
       const {FirstName, LastName, PhoneNumber, Email, DefaultLocation, Title} = req.body
       const {schoolID} =  req.session.admin
        const db = req.app.get('db')
        let user = await db.create_new_user([FirstName, LastName, PhoneNumber, Email, DefaultLocation, Title, schoolID])
        res.status(200).send(user)

   },
   displayUsers: async (req,res)=>{
       const db=req.app.get('db')
       let id = req.session.admin.schoolID
       const users = await db.display_users([id])
       res.status(200).send(users)
   }
}