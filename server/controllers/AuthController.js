var twilio = require("twilio");
const bcrypt = require("bcryptjs");
const { ACCOUNT_SID, AUTH_TOKEN, TWILIO_NUMBER } = process.env;

//initialize twilio
var client = new twilio(ACCOUNT_SID, AUTH_TOKEN);

module.exports = {
  adminLogin: async (req, res) => {
    const { adminEmail, adminPassword } = req.body;
    const db = req.app.get("db");
    let [foundAdmin] = await db.find_admin([adminEmail]);
    if (foundAdmin) {
      const validPassword = bcrypt.compareSync(adminPassword, foundAdmin.admin_hash);
      if (validPassword) {
        console.log(req.session)
        req.session.admin = {
          adminID: foundAdmin.admin_id,
          adminFirst: foundAdmin.admin_first,
          adminLast: foundAdmin.admin_last,
          adminPhone: foundAdmin.admin_phone_number,
          adminEmail: foundAdmin.admin_email,
          schoolID: foundAdmin.school_id
        };
        res.status(200).send({admin: req.session.admin});
      } else {
        res.status(401).send("Invalid password");
      }
    } else {
      res.status(404).send("Admin does not exist.");
    }
  },
  async adminSignup(req, res) {
    let {
      schoolName,
      schoolCity,
      schoolState,
      adminFirst,
      adminLast,
      adminPhone,
      adminEmail,
      adminPassword
    } = req.body;
    let db = req.app.get("db");
    //check for existing admin account
    let [foundAdmin] = await db.find_admin([adminEmail]);
    if (foundAdmin) {
      res.status(409).send({ message: "Email already in use" });
    } else {
      //register new school
      let [createdSchool] = await db.create_school([
        schoolName,
        schoolCity,
        schoolState
      ]);
      //hash passed in password
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(adminPassword, salt);
      //register new admin, passing in newly created school id to admin row
      let [createdAdmin] = await db.create_admin([
        adminFirst,
        adminLast,
        adminPhone,
        adminEmail,
        hash,
        createdSchool.school_id
      ]);
      //create admin sessions object
      req.session.admin = {
        adminID: createdAdmin.admin_id,
        adminFirst: createdAdmin.admin_first,
        adminLast: createdAdmin.admin_last,
        adminPhone: createdAdmin.admin_phone_number,
        adminEmail: createdAdmin.admin_email,
        schoolID: createdSchool.school_id
      };
      //send admin session object back to frontend
      res.status(200).send({admin: req.session.admin});
    }
  },
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
    db.admin_login([adminEmail]).then(([admin]) => {
        console.log(admin, "this is the admin")
        
        if (admin) {
            const validPassword = bcrypt.compareSync(password, admin.admin_hash)
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
                res.status(200).send(req.session.admin)

            } else {
                res.status(401).send('Invalid Password')
            }
        } else {
            res.status(401).send('Admin does not exist.')
        }
    })

},

  async signup(req, res) {
    let {
      schoolName,
      schoolCity,
      schoolState,
      adminFirst,
      adminLast,
      adminPhone,
      adminEmail,
      adminPassword,
    } = req.body;
    let db = req.app.get("db");
    let foundAdmin = await db.find_admin([adminEmail]);
    if (foundAdmin[0])
      return res.status(200).send({ message: "Email already in use" });
    let [createdSchool] = await db.create_school([
      schoolName,
      schoolCity,
      schoolState
    ]);
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(adminPassword, salt);
    let [createdAdmin] = await db.create_admin([
      adminFirst,
      adminLast,
      adminPhone,
      adminEmail,
      hash,
      createdSchool.school_id
    ]);
    req.session.admin = {
      adminID: createdAdmin.admin_id,
      adminFirst: createdAdmin.admin_first,
      adminLast: createdAdmin.admin_last,
      adminPhone: createdAdmin.admin_phone_number,
      adminEmail: createdAdmin.admin_email,
      schoolID: createdSchool.school_id,
      schoolName: createdSchool.school_name,
      schoolCity: createdSchool.school_city,
      schoolState: createdSchool.school_state
    };
  }

};


//   async staffLogin(req, res) {
//     let db = req.app.get("db");
//     let { userPhoneNumber, userPin } = req.body;
//     let [foundNumber] = await db.verify_staff_number([userPhoneNumber]);
//     let salt = bcrypt.genSaltSync(10);
//     let hash = bcrypt.hashSync(userPin, salt);
//     if (foundNumber) {
//       client.messages.create({
//         body: `Your pin is ${userPin}`,
//         from: TWILIO_NUMBER,
//         to: userPhoneNumber
//       })
//         .then(message => {
//           db.set_user_pin([hash, userPhoneNumber]);
//           console.log(message.sid);
//         })
//         .done();
//       res.sendStatus(200);
//     } else {
//       res.status(404).send({ message: "Phone number not found." });
//     }
//   },

//   adminLogin: (req, res) => {
//     const { adminEmail, password } = req.body
//     console.log(req.body)
//     const db = req.app.get('db')
//     db.admin_login([adminEmail]).then(([admin]) => {
//         console.log(admin, "this is the admin")
        
//         if (admin) {
//             const validPassword = bcrypt.compareSync(password, admin.admin_hash)
//             console.log(req.session, 'req session')
//             if (validPassword) {
//                 req.session.admin = {
//                     adminID: admin.admin_id,
//                     email: admin.email,
//                     firstName: admin.first_name,
//                     lastName: admin.last_name,
//                     phoneNumber: admin.admin_phone_number,
//                     schoolID: admin.school_id
//                 };
//                 res.status(200).send(req.session.admin)

//             } else {
//                 res.status(401).send('Invalid Password')
//             }
//         } else {
//             res.status(401).send('Admin does not exist.')
//         }
//     })

// },

//   async signup(req, res) {
//     let {
//       schoolName,
//       schoolCity,
//       schoolState,
//       adminFirst,
//       adminLast,
//       adminPhone,
//       adminEmail,
//       adminPassword,
//     } = req.body;
//     let db = req.app.get("db");
//     let foundAdmin = await db.find_admin([adminEmail]);
//     if (foundAdmin[0])
//       return res.status(200).send({ message: "Email already in use" });
//     let [createdSchool] = await db.create_school([
//       schoolName,
//       schoolCity,
//       schoolState
//     ]);
//     let salt = bcrypt.genSaltSync(10);
//     let hash = bcrypt.hashSync(adminPassword, salt);
//     let [createdAdmin] = await db.create_admin([
//       adminFirst,
//       adminLast,
//       adminPhone,
//       adminEmail,
//       hash,
//       createdSchool.school_id
//     ]);
//     req.session.admin = {
//       adminID: createdAdmin.admin_id,
//       adminFirst: createdAdmin.admin_first,
//       adminLast: createdAdmin.admin_last,
//       adminPhone: createdAdmin.admin_phone_number,
//       adminEmail: createdAdmin.admin_email,
//       schoolID: createdSchool.school_id,
//       schoolName: createdSchool.school_name,
//       schoolCity: createdSchool.school_city,
//       schoolState: createdSchool.school_state
//     };
//   }