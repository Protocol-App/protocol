const bcrypt = require('bcryptjs')

module.exports = {
   createUser: async (req,res)=>{
       const {FirstName, LastName, PhoneNumber, Email, DefaultLocation, Title} = req.body
       const {schoolID} =  req.session.admin
        const db = req.app.get('db')
        let user = await db.create_new_user([FirstName, LastName, PhoneNumber, Email, DefaultLocation, Title, schoolID])
        res.status(200).send(user)

   }


}




// adminID: admin.admin_id,
//                         email: admin.email,
//                         firstName: admin.first_name,
//                         lastName: admin.last_name,
//                         phoneNumber: admin.admin_phone_number,
//                         schoolID: admin.school_id

// async login(req, res) {
    //     let { email, password } = req.body;
    //     let db = req.app.get('‘db’');
    //     let [admin] = await db.find_user([email]);
    //     if (admin) {
    //         let result = bcrypt.compareSync(password, admin.hash)
    //         if (result) {
    //             req.session.admin = {
    //                 adminID: admin.admin_id,
    //                 email: admin.email,
    //                 firstName: admin.first_name,
    //                 lastName: admin.last_name,
    //                 phoneNumber: admin.admin_phone_number,
    //                 schoolID: admin.school_id
    //             };
    //             res.status(200).send({ admin: req.session.admin, session: true })
    //         } else {
    //             res.status(401).send('‘Incorrect password.’')
    //         }
    //     } else {

    //         res.status(401).send('Email not found.')
    //     }
    // }