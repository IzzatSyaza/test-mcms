// const { application, response } = require("express");
const express = require("express");
const https = require("https");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const {createToken, validateToken} = require("./JWT")
const moment = require("moment"); // require
require("dotenv").config();

const saltRounds = 10;
// const jwtToken = process.env.REACT_APP_JWTTOKEN;


const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
// app.use(session({
//     key: "userId",
//     secret: "subscribe",
//     reasave: false,
//     save: false,
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         expires: 60 * 60 * 24,
//     },
// }))

// app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "try_mcms",
});


// -----------------------------------------LOGIN----------------------------------------------

app.post("/login", (req, res) => {
    console.log(req.body)

    const username = req.body.username
    const password = req.body.password
    

    db.query(
        "SELECT * FROM mcms_login WHERE username = ?",
        username, (err, result) => {
            if(err) {
                res.send({error: err});
            }
            if(result.length > 0) {
                // console.log(result)
                const user = result[0];
                bcrypt.compare(password, user.password, (err, response)=>{
                    if(response){
                        // const id = result[0].mcms_id;
                        // const token = jwt.sign({id}, "jwtSecret", {
                        //     expiresIn: 700,
                        // })
                        const accessToken = createToken(user)
                        res.cookie("access-token", accessToken, {
                            maxAge: 60*60*24*1000,
                            httpOnly: true,
                            // secure: true,
                        });
                        // req.session.user = result;

                        res.json({
                            auth: true, 
                            accessToken: accessToken, 
                            id: user.mcms_id,
                            userType: user.user_type,
                            username: user.username,
                        });
                    }
                    else{
                        res.json({auth: false, error: "Wrong username/password combination"});
                    }
                })
            }
            else {
                res.json({auth: false, error: "No user exist!"});
                // res.send({message: "User doesn't exist"})
            }
        }
    );
});

// app.post("/refresh", (req, res)=>{
//     const token = req.bod
// })

// app.post("/protected", validateToken, (req, res) =>{
//     return res.json({error: "Protected Content!!"})
// })

app.get("/user", (req, res) => {
    try{
    const cookie = req.cookies["access-token"]

    const claims = jwt.verify(cookie, "jwtSecret");

    if(!claims) {
        return res.status(401).send({message:"Unautheticated"})
    }
    else{
    db.query(
        "SELECT * FROM mcms_login WHERE mcms_id = ?",
        claims.id, (err, result) => {
            if(err) {
                res.send({error: "err"});
            }
            if(result.length > 0) {
                // console.log(result)
                const user = result[0];
                // res.send(user);
                const {password, ...data} = user
                res.send(data);
            }
            
        }
    );
    }

    }catch(e){
        return res.status(401).send({message:"Unautheticated"})
    }
    
    
    
});

app.get("/auth", validateToken, (req,res) => {
        res.json(req.user)
})

app.post("/logout", (req,res)=>{
    res.cookie("access-token", "", {
            maxAge: 0,
            httpOnly: true,
        });

    res.send({message: "Success"})
})

app.get("/logout", validateToken, (req,res) => {
    try{
        res.clearCookie("access-token");
        // res.cookie("access-token", "", {
        //     maxAge: 0,
        //     httpOnly: true,
        // });
        console.log("Logout ok");
        res.json("OK kot")

    }catch(error) {
        res.status(500).send(error);
    }
    
    // cookie = req.cookies;
    // for (var prop in cookie) {
    //     if (!cookie.hasOwnProperty(prop)) {
    //         continue;
    //     }    
    //     res.cookie(prop, '', {expires: new Date(0)});
    // }
    // res.redirect("http://localhost:3000/");

    // cookie = req.cookies["access-token"];
    // res.cookie.set( {expires: Date.now()});

    // const accessToken = req.cookies["access-token"];
    // res.cookie("access-token", accessToken, {
    //     expires: new Date(0),
    //     httpOnly: true,
    // });
})
// const verifyJWT = (req, res, next) => {
//     const token = req.headers["x-access-token"]

//     if (!token) {
//         res.send("Yo we need a token, please give it to us next time!")
//     }
//     else{
//         jwt.verify(token, "jwtSecret", (err, decoded)=>{
//             if(err) {
//                 res.json({auth: false, message: "U failed to authenticate"});
//             }
//             else{
//                 req.userId = decoded.id;
//                 next();
//             }
//         })
//     }
// }

// app.get("/isUserAuth", verifyJWT, (req, res)=>{
//     res.send("Congrats.... You are authencated!!")
// })



// app.get("/login",(req,res)=>{
//     if(req.session.user) {
//         res.send({loggedIn: true, user: req.session.user});
//     }
//     else {
//         res.send({loggedIn: false})
//     }
// })






// -----------------------------------------ADD EMPLOYEE----------------------------------------------

app.post("/addEmployee", validateToken, (req, res) => {
    console.log(req.body)

    const tcNo = req.body.tcNo;
    const name = req.body.name;
    const icNo = req.body.icNo;
    const grade = req.body.gred;
    const position = req.body.position;
    const department = req.body.department;
    const dateJoin = req.body.dateJoin;
    const costCenter = req.body.cCenter.cost_centre;
    // const costC_category = req.body.cCenter.cost_category;
    const plant = req.body.plant;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const age = req.body.age;
    const maritalStatus = req.body.maritial;
    const spouseWork = req.body.sWork;
    const hpNo = req.body.hpNo;
    const emt = req.body.emt;
    const fmt = req.body.fmt;
    const dtl = req.body.dtl;
    const jobStatus = "Active";
    // const childNo = 0;

    db.query(
        "INSERT INTO employee (EmployeeNo, Name, costcen, position, grade,"+
        "dep_name, date_join, hp_num, gender, MaritalStatus, Birth, age,"+
        "IcNo, wife_work, plant, job_status, uop_ent, uop_bal, heal_entitle_1, heal_ent_bal_1,"+
        "dent_entitle, dent_ent_bal ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [tcNo, name, costCenter, position, grade, department, dateJoin, hpNo, gender, maritalStatus, dob, age, icNo, spouseWork, plant,jobStatus, emt, emt, fmt, fmt, dtl, dtl],
         (err, result) => {
            if(err) {
                console.log(err);
                res.status(400).json({error: err})

            }
            else {
                res.send({message:"New Employee Added"});
            }
        }
    );
});


// -----------------------------------------ADD ADMIN----------------------------------------------

app.post("/addAdmin", validateToken, (req, res) => {
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password
    const usertype = "ADMIN"
    
    bcrypt.hash(password, saltRounds, (err, hash)=>{

        if(err){
            console.log(err);
        }

        db.query(
        "INSERT INTO mcms_login (username, password, user_type) VALUES (?, ?, ?);",
        [username, hash, usertype], (err, result) => {
            if(err) {
                res.status(400).json({error: err})
            }
            else {
                res.send({message:"New Admin Added"})
            }
            }
        );
    })
   
});

// -----------------------------------------ADD TRANSACTION----------------------------------------------

app.post("/addtransaction",validateToken, (req, res) => {
    console.log(req.body)

    const empNo = req.body.tcNo
    const deptCode = req.body.deptCode
    const dateVisit = req.body.dateVisit
    const code = req.body.medicalType
    const cCenter = req.body.cCenter
    const cCenterNo = req.body.cCenterNo
    const patientName = req.body.patientName
    const sickness = req.body.sickness
    // const clinicCode = req.body.clinicCode
    const cost = req.body.charge
    
    db.query(
        "SELECT clinic_code FROM mcms_clinic WHERE  mcms_id = ?", [req.user.id],
        (error, resultcode) => {
            if(error) {
                console.log(error);
            }
            else {
                const clinicCode = resultcode[0].clinic_code;
                console.log(clinicCode);
                db.query(
                    "INSERT INTO mcms_transaction (tr_EmployeeNo, tr_deptCode, tr_DateVisit, tr_Code,"+
                    " tr_costCenter, tr_costCenterNo, tr_Family,"+
                    " tr_Sickness,  tr_ClinicCode, tr_cost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [empNo, deptCode, dateVisit, code, cCenter, cCenterNo, patientName,
                    sickness, clinicCode, cost], (err, result) => {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            res.send({message:"New Transaction Added"})
                        }
                    }
                );
            }
        }
    );

});

// -----------------------------------------ADD ADMIN TRANSACTION----------------------------------------------

app.post("/adminTransaction",validateToken, (req, res) => {
    console.log(req.body)

    const empNo = req.body.tcNo
    const deptCode = req.body.deptCode
    const dateVisit = req.body.dateVisit
    const medicalCode = req.body.medicalType
    const cCenter = req.body.cCategory
    const cCenterNo = req.body.costCen
    const family = req.body.relation
    const sickness = req.body.sickness
    const type = req.body.type
    const clinicCode = req.body.clinicCode
    const cost = req.body.cost
    
    
    db.query(
        "INSERT INTO transaction (tr_EmployeeNo, tr_deptCode, tr_DateVisit, tr_Code,"+
        " tr_costCenter, tr_costCenterNo, tr_Family,"+
        " tr_Sickness, tr_type,  tr_ClinicCode, tr_cost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [empNo, deptCode, dateVisit, medicalCode, cCenter, cCenterNo, family,
        sickness,type, clinicCode, cost], (err, result) => {
            if(err) {
                console.log(err);
                res.status(400).json({error: err})
            }
            else {
                res.send({message:"New Transaction Added"})
            }
        }
    );

});


// -----------------------------------------ADD CLINIC----------------------------------------------

app.post("/addclinic", validateToken, (req, res) => {
    console.log(req.body)

    const cType = req.body.cType;
    const cCode = req.body.code;
    const cName = req.body.cName;
    const status = req.body.status;
    const username = req.body.username;
    const password = req.body.password;
    const usertype = "CLINIC";
    
    bcrypt.hash(password, saltRounds, (err, hash)=>{

        if(err){
            console.log(err);
        }

        db.query(
        "INSERT INTO mcms_login (username, password, user_type) VALUES (?, ?, ?);",
        [username, hash, usertype], (error, result) => {
            if(error) {
                res.status(400).json({error: err})
            }
            else {
                var mcmsid = result.insertId;
                // console.log(result + "Inilah res");
                db.query( "INSERT INTO mcms_clinic (mcms_id, clinic_name, clinic_code, clinic_ref, clinic_status) VALUES (?, ?, ?, ?, ?);",
                [mcmsid, cName,cCode, cType, status],(errorr, result) => {
                    if(errorr) {
                        res.status(400).json({error: error})
                    }
                    else {
                        res.send({message:"New Clinic Added Successfully"})
                    }
                });
                //res.send("Values inserted");
            }
        }
        );
    })
   
});


// -----------------------------------------ADD FAMILY----------------------------------------------

app.post("/addFamily",  validateToken, (req, res) => {
    console.log(req.body)

    const tcNo = req.body.tcNo
    const namaSpouse = req.body.namaSpouse
    const icSpouse = req.body.icSpouse
    const bodSpouse = req.body.bodSpouse
    const occupation = req.body.occupationSpouse
    const mobile = req.body.mobileSpouse


    const namaAnak1 = req.body.namaAnak1
    const genderAnak1 = req.body.genderAnak1
    const icAnak1 = req.body.icAnak1
    const bodAnak1 = req.body.bodAnak1

    const namaAnak2 = req.body.namaAnak2
    const genderAnak2 = req.body.genderAnak2
    const icAnak2 = req.body.icAnak2
    const bodAnak2 = req.body.bodAnak2

    const namaAnak3 = req.body.namaAnak3
    const genderAnak3 = req.body.genderAnak3
    const icAnak3 = req.body.icAnak3
    const bodAnak3 = req.body.bodAnak3

    const namaAnak4 = req.body.namaAnak4
    const genderAnak4 = req.body.genderAnak4
    const icAnak4 = req.body.icAnak4
    const bodAnak4 = req.body.bodAnak4

    const namaAnak5 = req.body.namaAnak5
    const genderAnak5 = req.body.genderAnak5
    const icAnak5 = req.body.icAnak5
    const bodAnak5 = req.body.bodAnak5

    const namaAnak6 = req.body.namaAnak6
    const genderAnak6 = req.body.genderAnak6
    const icAnak6 = req.body.icAnak6
    const bodAnak6 = req.body.bodAnak6

    const namaAnak7 = req.body.namaAnak7
    const genderAnak7 = req.body.genderAnak7
    const icAnak7 = req.body.icAnak7
    const bodAnak7 = req.body.bodAnak7

    const namaAnak8 = req.body.namaAnak8
    const genderAnak8 = req.body.genderAnak8
    const icAnak8 = req.body.icAnak8
    const bodAnak8 = req.body.bodAnak8

    const namaAnak9 = req.body.namaAnak9
    const genderAnak9 = req.body.genderAnak9
    const icAnak9 = req.body.icAnak9
    const bodAnak9 = req.body.bodAnak9

    const namaAnak10 = req.body.namaAnak10
    const genderAnak10 = req.body.genderAnak10
    const icAnak10 = req.body.icAnak10
    const bodAnak10 = req.body.bodAnak10
      
    db.query(
        "INSERT INTO spouse (Employee_No, Name_spouse, Spouse_IcNo, spouse_dob, Occupation_spouse, Spouse_mob_num, "+
        "nama_anak1, jantina1, mykid1, tarikh_lahir_anak1, nama_anak2, jantina2, mykid2, tarikh_lahir_anak, "+
        "nama_anak, jantina3, mykid3, tarikh_lahir_anak3, nama_anak4, jantina4, mykid4, tarikh_lahir_anak4, "+
        "nama_anak5, jantina5, mykid5, tarikh_lahir_anak5, nama_anak6, jantina6, mykid6, tarikh_lahir_anak6, "+
        "nama_anak7, jantina7, mykid7, tarikh_lahir_anak7, nama_anak8, jantina8, mykid8, tarikh_lahir_anak8, "+
        "nama_anak9, jantina9, mykid9, tarikh_lahir_anak9, nama_anak10, jantina10, mykid10, tarikh_lahir_anak10) "+
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "+
        "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [tcNo, namaSpouse, icSpouse, bodSpouse, occupation, mobile, namaAnak1, genderAnak1, icAnak1, bodAnak1, 
        namaAnak2, genderAnak2, icAnak2, bodAnak2, namaAnak3, genderAnak3, icAnak3, bodAnak3, 
        namaAnak4, genderAnak4, icAnak4, bodAnak4, namaAnak5, genderAnak5, icAnak5, bodAnak5, 
        namaAnak6, genderAnak6, icAnak6, bodAnak6, namaAnak7, genderAnak7, icAnak7, bodAnak7,
        namaAnak8, genderAnak8, icAnak8, bodAnak8, namaAnak9, genderAnak9, icAnak9, bodAnak9,
        namaAnak10, genderAnak10, icAnak10, bodAnak10], (err, result) => {
            if(err) {
                console.log(err);
                res.status(400).json({error: error})
            }
            else {
                res.send({message:"New Family Added Successfully"})
            }
        }
    );
});

// -----------------------------------------CLONE TABLE----------------------------------------------

app.post("/cloneTable",  validateToken, (req, res) => {
    const date = new Date();
    let year = date.getFullYear();

    db.query(
        `CREATE TABLE transaction${year} LIKE transaction`
        , (error, result) => {
            if(error) {
                res.status(400).json({error: error})
            }
            else {
                db.query(
                    `INSERT INTO transaction${year} SELECT * FROM transaction`
                    , (errr, result2) => {
                        if(errr) {
                            res.status(400).json({error: errr})
                        }
                        else {
                            db.query(
                                `TRUNCATE TABLE transaction`
                                , (err, result3) => {
                                    if(err) {
                                        res.status(400).json({error: err})
                                    }
                                    else {
                                        res.send({message:"Close Transaction Successfully"})
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
   
});


// // -----------------------------------------ADD EMPLOYEE SPOUSE----------------------------------------------

// app.post("/addSpouse", (req, res) => {
//     console.log(req.body)

//     const tcNo = req.body.tcNo
//     const name = req.body.name
//     const icNo = req.body.icNo
//     const occupation = req.body.occupation
//     const contact = req.body.hpNo
//     const dob = req.body.dob
    

//     db.query(
//         "INSERT INTO family_spouse (EmployeeNo, spouse_name, spouse_ic, spouse_dob, spouse_occupation, spouse_contact ) VALUES (?, ?, ?, ?, ?, ?)",
//         [tcNo, name, icNo, dob, occupation, contact], (err, result) => {
//             if(err) {
//                 console.log(err);
//                 res.status(400).json({error: error})
//             }
//             else {
//                 res.json({message:"New Family Added Successfully"})
//             }
//         }
//     );
// });


// // -----------------------------------------ADD EMPLOYEE CHILDREN----------------------------------------------

// app.post("/addChildren", (req, res) => {
//     console.log(req.body)

//     const tcNo = req.body.tcNo
//     const name = req.body.name
//     const icNo = req.body.icNo
//     const gender = req.body.gender
//     const marital = req.body.marital
//     const studyStatus = req.body.studyStatus
//     const dob = req.body.dob
    

//     db.query(
//         "INSERT INTO family_children (EmployeeNo, child_name, child_ic, child_gender, child_dob, child_marital_status, child_study_status) VALUES (?, ?, ?, ?, ?, ?, ?)",
//         [tcNo, name, icNo, gender, dob, marital, studyStatus], (err, result) => {
//             if(err) {
//                 console.log(err);
//             }
//             else {
//                 res.send("Values inserted");
//             }
//         }
//     );
// });

//-----------------------------------------Get Entitlement------------------------------------------


app.get("/getEntitlement",  validateToken, (req,res) => {

    const grade = req.query.grade;


    db.query(
        "SELECT * from entitlement WHERE ent_grade = ? "
        ,[grade],
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Employee Cost------------------------------------------


app.get("/getEmtCost",  validateToken, (req,res) => {

    const tcNo = req.query.tcNo;


    db.query(
        "SELECT IFNULL(SUM(tr_cost), 0) AS total FROM transaction "+
        "WHERE tr_EmployeeNo = ? AND tr_Code = 'EMT'", [tcNo],
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
})

app.get("/getFmtCost", (req,res) => {

    const tcNo = req.query.tcNo;


    db.query(
        "SELECT IFNULL(SUM(tr_cost), 0) AS total FROM transaction "+
        "WHERE tr_EmployeeNo = ? AND tr_Code = 'FMT'", [tcNo],
        (err, result) => {
            if(err) {
                console.log(err);
                res.send({error: err})
            }
            else {
                res.send(result);
            }
        }
    );
})

app.get("/getEdtCost",  validateToken, (req,res) => {

    const tcNo = req.query.tcNo;


    db.query(
        "SELECT IFNULL(SUM(tr_cost), 0) AS total FROM transaction "+
        "WHERE tr_EmployeeNo = ? AND tr_Code = 'EDT'", [tcNo],
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);

            }
        }
    );
})


//-----------------------------------------Get Transaction Last 5 Month------------------------------------------


app.get("/getTransactionFor6Month",  validateToken, (req,res) => {
    // `SELECT * FROM transaction `+
    //     `WHERE tr_DateVisit >= DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH) `

//     SELECT    COUNT(*) 
// FROM      table_emp 
// WHERE     YEAR(ARR_DATE) = '2012' 
// GROUP BY  MONTH(ARR_DATE)
// DATE_SUB((DATE_SUB(curdate(), INTERVAL 1 MONTH)), INTERVAL 4 DAY)
// IFNULL(COUNT(tr_id),0) totalLastMonth FROM transaction 


    db.query(
        `SELECT IFNULL(SUM(DATE_FORMAT(tr_DateVisit, '%Y-%m-01') = DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01')),0) totalMonth, ` +
        `IFNULL(SUM(DATE_FORMAT(tr_DateVisit, '%Y-%m-01') = DATE_FORMAT(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH), '%Y-%m-01')),0) lastMonth, ` +
        `IFNULL(SUM(DATE_FORMAT(tr_DateVisit, '%Y-%m-01') = DATE_FORMAT(DATE_ADD(CURRENT_DATE(), INTERVAL -2 MONTH), '%Y-%m-01')),0) secondLast, ` +
        `IFNULL(SUM(DATE_FORMAT(tr_DateVisit, '%Y-%m-01') = DATE_FORMAT(DATE_ADD(CURRENT_DATE(), INTERVAL -3 MONTH), '%Y-%m-01')),0) thirdLast, ` +
        `IFNULL(SUM(DATE_FORMAT(tr_DateVisit, '%Y-%m-01') = DATE_FORMAT(DATE_ADD(CURRENT_DATE(), INTERVAL -4 MONTH), '%Y-%m-01')),0) fourthLast, ` +
        `IFNULL(SUM(DATE_FORMAT(tr_DateVisit, '%Y-%m-01') = DATE_FORMAT(DATE_ADD(CURRENT_DATE(), INTERVAL -5 MONTH), '%Y-%m-01')),0) fifthLast ` +
        `FROM transaction`
        , (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
                console.log(result)
                // res.send({mes:"patut ok"})
            }
        }
    );
})

//-----------------------------------------Get Transaction Last 5 Month------------------------------------------


app.get("/getTotalTransactionForClinic",  validateToken, (req,res) => {
    const clinic = req.query.clinic;

    // `SELECT * FROM transaction `+
    //     `WHERE tr_DateVisit >= DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH) `

//     SELECT    COUNT(*) 
// FROM      table_emp 
// WHERE     YEAR(ARR_DATE) = '2012' 
// GROUP BY  MONTH(ARR_DATE)
// DATE_SUB((DATE_SUB(curdate(), INTERVAL 1 MONTH)), INTERVAL 4 DAY)
// IFNULL(COUNT(tr_id),0) totalLastMonth FROM transaction 


    db.query(
        `SELECT IFNULL(SUM(DATE_FORMAT(tr_DateVisit, '%Y-%m-01') = DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01')),0) totalMonth, ` +
        `IFNULL(SUM(DATE_FORMAT(tr_DateVisit, '%Y-%m-01') = DATE_FORMAT(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH), '%Y-%m-01')),0) lastMonth, ` +
        `(SUM(DATE_FORMAT(tr_DateVisit, '%Y-%m-01') = DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01')) - SUM(DATE_FORMAT(tr_DateVisit, '%Y-%m-01') = DATE_FORMAT(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH), '%Y-%m-01'))) AS totalDiff ` +
        `FROM transaction WHERE tr_ClinicCode = ?`, clinic
        , (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
                console.log(result)
                // res.send({mes:"patut ok"})
            }
        }
    );
})
//-----------------------------------------Get Chart Admin------------------------------------------

app.get("/getTransactionForChart",  validateToken, (req,res) => {
    // `SELECT * FROM transaction `+
    //     `WHERE tr_DateVisit >= DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH) `

//     SELECT    COUNT(*) 
// FROM      table_emp 
// WHERE     YEAR(ARR_DATE) = '2012' 
// GROUP BY  MONTH(ARR_DATE)
// DATE_SUB((DATE_SUB(curdate(), INTERVAL 1 MONTH)), INTERVAL 4 DAY)
// IFNULL(COUNT(tr_id),0) totalLastMonth FROM transaction 


    db.query(
        `SELECT IFNULL(COUNT(*),0) totalTransaction, MONTHNAME(tr_DateVisit) month FROM transaction ` +
        `WHERE DATE_FORMAT(tr_DateVisit, '%Y-%m-01') >= DATE_FORMAT(DATE_ADD(CURRENT_DATE(), INTERVAL -5 MONTH), '%Y-%m-01') `+
        `GROUP BY MONTH(DATE_FORMAT(tr_DateVisit, '%Y-%m-01')) ORDER BY tr_DateVisit `
        , (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
                console.log(result)
                // res.send({mes:"patut ok"})
            }
        }
    );
})
//-----------------------------------------Get Chart Clinic------------------------------------------

app.get("/getTransactionForChartbyClinic",  validateToken, (req,res) => {
    const clinic = req.query.clinic;
    // `SELECT IFNULL(COUNT(*),0) totalTransaction, MONTHNAME(tr_DateVisit) month FROM transaction ` +
    // `WHERE DATE_FORMAT(tr_DateVisit, '%Y-%m-01') >= DATE_FORMAT(DATE_ADD(CURRENT_DATE(), INTERVAL -5 MONTH), '%Y-%m-01') `+
    // `AND tr_ClinicCode = ${clinic} GROUP BY MONTH(DATE_FORMAT(tr_DateVisit, '%Y-%m-01')) ORDER BY tr_DateVisit `
    db.query(
        `SELECT IFNULL(SUM(DATE_FORMAT(tr_DateVisit, '%Y-%m-01') >= DATE_FORMAT(DATE_ADD(CURRENT_DATE(), INTERVAL -5 MONTH), '%Y-%m-01')),0) totalTransaction, `+
        `MONTHNAME(tr_DateVisit) month FROM transaction ` +
        `WHERE tr_ClinicCode = ? `+
        `GROUP BY MONTH(DATE_FORMAT(tr_DateVisit, '%Y-%m-01')) ORDER BY tr_DateVisit `, clinic
        , (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
                // res.send({mes:"patut ok"})
            }
        }
    );
})
//-----------------------------------------Get Cost this Month------------------------------------------


app.get("/getCostMonth",  validateToken, (req,res) => {    

    db.query(
        `SELECT IFNULL(SUM(tr_cost),0) costMonth FROM transaction `+
        `WHERE DATE_FORMAT(tr_DateVisit, '%Y-%m-01') = DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01')`
        , (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
                // console.log(result)
                // res.send({mes:"patut ok"})
            }
        }
    );
})

//-----------------------------------------Get Cost this Month------------------------------------------


app.get("/getCostLastMonth", validateToken, (req,res) => {    

    db.query(
        `SELECT IFNULL(SUM(tr_cost),0) costLastMonth FROM transaction `+
        `WHERE DATE_FORMAT(tr_DateVisit, '%Y-%m-01') = DATE_FORMAT(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH), '%Y-%m-01')`
        , (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
                // console.log(result)
                // res.send({mes:"patut ok"})
            }
        }
    );
})

//-----------------------------------------Get Cost this Month------------------------------------------


app.get("/getCostMonthbyClinic",  validateToken, (req,res) => {
    const clinic = req.query.clinic;

    db.query(
        `SELECT IFNULL(SUM(tr_cost),0) costMonth FROM transaction `+
        `WHERE DATE_FORMAT(tr_DateVisit, '%Y-%m-01') = DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01') `+
        `AND tr_ClinicCode = ?`, clinic
        , (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
                // console.log(result)
                // res.send({mes:"patut ok"})
            }
        }
    );
})

//-----------------------------------------Get Cost this Month------------------------------------------


app.get("/getCostLastMonthbyClinic",  validateToken, (req,res) => {
    const clinic = req.query.clinic;

    db.query(
        `SELECT IFNULL(SUM(tr_cost),0) costLastMonth FROM transaction `+
        `WHERE DATE_FORMAT(tr_DateVisit, '%Y-%m-01') = DATE_FORMAT(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH), '%Y-%m-01') ` +
        `AND tr_ClinicCode = ?`, clinic
        , (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
                // console.log(result)
                // res.send({mes:"patut ok"})
            }
        }
    );
})

//-----------------------------------------Get Report By Clinic------------------------------------------


app.get("/getReportByClinic",  validateToken, (req,res) => {

    const clinic = req.query.clinic;
    var startDate = req.query.startDate;
    const endDate = req.query.endDate;

    startDate = moment(startDate).subtract(1, 'days').format("YYYY-MM-D");


    if(clinic === "ALL"){
        db.query(
            "SELECT distinct tr.tr_id, tr.tr_deptCode, tr.tr_Code, tr.tr_EmployeeNo, tr.tr_type, tr.tr_cost, tr.tr_ClinicCode, "+
            "tr.tr_costCenter, tr.tr_costCenterNo, tr.tr_DateVisit, emp.Name, emp.IcNo "+
            "FROM transaction tr INNER JOIN employee emp ON tr.tr_EmployeeNo = emp.EmployeeNo "+
            // "INNER JOIN department dep ON emp.dep_name = dep.dept_cod " +
            "WHERE tr.tr_DateVisit BETWEEN ? AND ? ORDER BY tr_DateVisit desc", [startDate, endDate],
            (err, result) => {
                if(err) {
                    res.send({error: err})
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            }
        );
    }
    else{
        db.query(
            "SELECT distinct tr.tr_id, tr.tr_deptCode, tr.tr_Code, tr.tr_EmployeeNo, tr.tr_type, tr.tr_cost, tr.tr_ClinicCode, "+
            "tr.tr_costCenter, tr.tr_costCenterNo, tr.tr_DateVisit, emp.Name, emp.IcNo "+
            "FROM transaction tr INNER JOIN employee emp ON tr.tr_EmployeeNo = emp.EmployeeNo "+
            // "INNER JOIN department dep ON emp.dep_name = dep.dept_cod " +
            "WHERE tr.tr_DateVisit BETWEEN ? AND ? AND tr.tr_ClinicCode = ? ORDER BY tr_DateVisit desc", [startDate, endDate, clinic],
            (err, result) => {
                if(err) {
                    res.send({error: err})
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            }
        );
    }
})

//-----------------------------------------Get Report By Department------------------------------------------


app.get("/getReportByDepartment",  validateToken, (req,res) => {
    const department = req.query.department;
    var startDate = req.query.startDate;
    const endDate = req.query.endDate;

    startDate = moment(startDate).subtract(1, 'days').format("YYYY-MM-D");

    // console.log(moment());
    // console.log(moment(startDate).subtract(1, 'days').format("D-MM-YYYY"));
    // console.log(startDate);


    if(department === "ALL"){
        db.query(
            "SELECT distinct tr.tr_id, tr.tr_deptCode, tr.tr_Code, tr.tr_EmployeeNo, tr.tr_type, tr.tr_cost, tr.tr_ClinicCode, "+
            "tr.tr_costCenter, tr.tr_costCenterNo, tr.tr_DateVisit, emp.Name, emp.IcNo "+
            "FROM transaction tr INNER JOIN employee emp "+
            "ON tr.tr_EmployeeNo = emp.EmployeeNo "+
            "WHERE tr.tr_DateVisit BETWEEN ? AND ? ORDER BY tr_DateVisit desc", [startDate, endDate],
            (err, result) => {
                if(err) {
                    res.send({error: err})
                    console.log(err);
                }
                else {
                    res.send(result);
                    // console.log(result)
                }
            }
        );
    }
    else{
        db.query(
            "SELECT distinct tr.tr_id, tr.tr_deptCode, tr.tr_Code, tr.tr_EmployeeNo, tr.tr_type, tr.tr_cost, tr.tr_ClinicCode, "+
            "tr.tr_costCenter, tr.tr_costCenterNo, tr.tr_DateVisit, emp.Name, emp.IcNo "+
            "FROM transaction tr INNER JOIN employee emp "+
            "ON tr.tr_EmployeeNo = emp.EmployeeNo "+
            "WHERE tr.tr_DateVisit BETWEEN ? AND ? AND tr.tr_deptCode = ? ORDER BY tr_DateVisit desc", [startDate, endDate, department],
            (err, result) => {
                if(err) {
                    res.send({error: err})
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            }
        );
    }

})


//-----------------------------------------Get Report By Medical Code------------------------------------------


app.get("/getReportByMedical",  validateToken, (req,res) => {

    const medical = req.query.medical;
    var startDate = req.query.startDate;
    const endDate = req.query.endDate;

    startDate = moment(startDate).subtract(1, 'days').format("YYYY-MM-D");



    if(medical === "ALL"){
        db.query(
            "SELECT distinct tr.tr_id, tr.tr_deptCode, tr.tr_Code, tr.tr_EmployeeNo, tr.tr_type, tr.tr_cost, tr.tr_ClinicCode, "+
            "tr.tr_costCenter, tr.tr_costCenterNo, tr.tr_DateVisit, emp.Name, emp.IcNo "+
            "FROM transaction tr INNER JOIN employee emp ON tr.tr_EmployeeNo = emp.EmployeeNo "+
            // "INNER JOIN department dep ON emp.dep_name = dep.dept_cod AND emp.costcen = dep.cost_center " +
            "WHERE tr_DateVisit BETWEEN ? AND ? ORDER BY tr_DateVisit desc", [startDate, endDate],
            (err, result) => {
                if(err) {
                    res.send({error: err})
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            }
        );
    }
    else{
        db.query(
            "SELECT distinct tr.tr_id, tr.tr_deptCode, tr.tr_Code, tr.tr_EmployeeNo, tr.tr_type, tr.tr_cost, tr.tr_ClinicCode, "+
            "tr.tr_costCenter, tr.tr_costCenterNo, tr.tr_DateVisit, emp.Name, emp.IcNo "+
            "FROM transaction tr INNER JOIN employee emp ON tr.tr_EmployeeNo = emp.EmployeeNo "+
            // "INNER JOIN department dep ON emp.dep_name = dep.dept_cod AND emp.costcen = dep.cost_center " +
            "WHERE tr_DateVisit BETWEEN ? AND ? AND tr_Code = ? ORDER BY tr_DateVisit desc", [startDate, endDate, medical],
            (err, result) => {
                if(err) {
                    res.send({error: err})
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            }
        );
    }
})

//-----------------------------------------Get Clinic Report------------------------------------------


app.get("/getClinicReport",  validateToken, (req,res) => {
    const clinic = req.query.clinic;
    var startDate = req.query.startDate;
    const endDate = req.query.endDate;

    startDate = moment(startDate).subtract(1, 'days').format("YYYY-MM-D");


    db.query(
        "SELECT distinct tr.tr_id, tr.tr_deptCode, tr.tr_Code, tr.tr_EmployeeNo, tr.tr_type, tr.tr_cost, "+
        "tr.tr_costCenter, tr.tr_costCenterNo, tr.tr_DateVisit, emp.Name, emp.IcNo "+
        "FROM transaction tr INNER JOIN employee emp ON tr.tr_EmployeeNo = emp.EmployeeNo "+
        // "INNER JOIN department dep ON emp.dep_name = dep.dept_cod " +
        "WHERE tr_DateVisit BETWEEN ? AND ? AND tr_ClinicCode = ? ORDER BY tr_DateVisit desc", [startDate, endDate, clinic],
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
    
})


//-----------------------------------------Get Transacation of Employee------------------------------------------


app.get("/getEmployeeTransaction",  validateToken, (req,res) => {

    const tcNo = req.query.empId;

    db.query(
        "SELECT distinct tr.tr_id, tr.tr_cost, tr.tr_sickness, tr.tr_DateVisit, tr.tr_Code, tr.tr_type, tr.tr_ClinicCode, tr.tr_Family, cl.clinic_name "+
        "FROM transaction tr INNER JOIN mcms_clinic cl " +
        "ON tr.tr_ClinicCode = cl.clinic_code " +
        "WHERE tr.tr_EmployeeNo = ? ORDER BY tr.tr_DateVisit DESC", [tcNo],
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
                console.log(result)
            }
        }
    );
})

//-----------------------------------------Get Transacation------------------------------------------


app.get("/getTransaction",  validateToken, (req,res) => {

    db.query(
        "SELECT distinct tr.tr_id, tr.tr_cost, tr.tr_sickness, tr.tr_DateVisit, tr.tr_Code, tr.tr_type, tr.tr_ClinicCode, tr.tr_Family, cl.clinic_name "+
        "FROM transaction tr INNER JOIN mcms_clinic cl " +
        "ON tr.tr_ClinicCode = cl.clinic_code " +
        "ORDER BY tr.tr_DateVisit DESC LIMIT 20",
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
                console.log(result)
            }
        }
    );
})

//-----------------------------------------Get Transacation by CLINIC------------------------------------------


app.get("/getTransactionByClinic",  validateToken, (req,res) => {
    const clinic = req.query.clinicCode;

    db.query(
        "SELECT distinct tr.tr_id, tr.tr_cost, tr.tr_sickness, tr.tr_DateVisit, tr.tr_Code, tr.tr_type, tr.tr_ClinicCode, tr.tr_Family, "+
        "tr.tr_EmployeeNo, emp.Name FROM transaction tr INNER JOIN employee emp " +
        "ON tr.tr_EmployeeNo = emp.EmployeeNo " +
        "WHERE tr_ClinicCode = ? ORDER BY tr.tr_DateVisit DESC",
        [clinic], (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
                console.log(result)
            }
        }
    );
})

//-----------------------------------------Get All Employee------------------------------------------


app.get("/getAllEmployee", validateToken, (req,res) => {

    db.query(
        "SELECT * FROM employee",
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Employee by TCNO------------------------------------------


app.get("/getemployee", validateToken, (req,res) => {

    const tcNo = req.query.empId;

    db.query(
        "SELECT * FROM employee WHERE  EmployeeNo = ?", [tcNo],
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get DEPARTMENT CODE AND NAME FOR EMP------------------------------------------


app.get("/getDeptAndCode", validateToken, (req,res) => {

    const dep = req.query.dep;
    const cc = req.query.cc;


    db.query(
        "SELECT * FROM department WHERE  dept_cod = ? AND cost_center = ?", [dep, cc],
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Plant------------------------------------------

app.get("/getPlant",  validateToken, (req,res) => {

    db.query(
        "SELECT * FROM plant",
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Clinic------------------------------------------

app.get("/getClinic",  validateToken, (req,res) => {

    db.query(
        "SELECT * FROM mcms_clinic",
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Relation by TCNO------------------------------------------

app.get("/getRelation",  validateToken, (req,res) => {
    const tcNo = req.query.empId;

    db.query(
        "SELECT * FROM spouse where Employee_No = ?", [tcNo],
        (err, result) => {
            if(err) {
                console.log(err);
                res.send({error: err})
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get All User------------------------------------------

app.get("/getUsername",  validateToken, (req,res) => {

    db.query(
        "SELECT username FROM mcms_login",
        (err, result) => {
            if(err) {
                console.log(err);
                res.send({error: err})
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Clinic Code------------------------------------------

app.get("/getClinicCode",  validateToken, (req,res) => {

    db.query(
        "SELECT clinic_code FROM mcms_clinic",
        (err, result) => {
            if(err) {
                console.log(err);
                res.send({error: err})
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Admin------------------------------------------

app.get("/getAdmin",  validateToken, (req,res) => {

    db.query(
        "SELECT * FROM mcms_login where user_type = 'ADMIN'",
        (err, result) => {
            if(err) {
                console.log(err);
                res.send({error: err})
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Admin by ID------------------------------------------

app.get("/getAdminbyId",  validateToken, (req,res) => {
    const id = req.query.adminId;


    db.query(
        "SELECT * FROM mcms_login WHERE  mcms_id = ?",[id],
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                console.log(id)
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Clinic and login by MCMSID------------------------------------------

app.get("/getClinicbymcmsId",  validateToken, (req,res) => {
    const id = req.query.mcmsId;


    db.query(
        "SELECT distinct cl.mcms_id, cl.clinic_name, cl.clinic_code, cl.clinic_ref, cl.clinic_status, log.username "+
        "FROM mcms_clinic cl INNER JOIN mcms_login log "+
        "ON cl.mcms_id = log.mcms_id "+
        "WHERE  cl.mcms_id = ?",[id],
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                console.log(id)
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Clinic by MCMSID------------------------------------------

app.get("/getClinicOnly",  validateToken, (req,res) => {
    const id = req.query.mcmsId;


    db.query(
        "SELECT * FROM mcms_clinic WHERE  mcms_id = ?",[id],
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                console.log(id)
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Clinic BY Code------------------------------------------

app.get("/getClinicByCode",  validateToken, (req,res) => {
    const code = req.query.code;


    db.query(
        "SELECT * FROM mcms_clinic WHERE  clinic_code = ?",[code],
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
})
//-----------------------------------------Get Position by grade------------------------------------------

app.get("/getpositionbygrade",  validateToken, (req,res) => {
    const grade = req.query.grade;

    db.query(
        "SELECT id_position, position_desc FROM position  WHERE  position_code = ?", [grade],
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Department------------------------------------------


app.get("/getDepartment",  validateToken, (req,res) => {

    db.query(
        "SELECT distinct id, dept_cod, dept_name FROM department",
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Position------------------------------------------


app.get("/getPosition",  validateToken, (req,res) => {

    db.query(
        "SELECT * FROM position",
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Cost CATEGORY BY Cc ------------------------------------------

app.get("/getCategory",  validateToken, (req,res) => {
    const cc = req.query.cCentre;

    db.query(
        "SELECT cost_category FROM cost_centre where cost_centre = ?", [cc],
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Cost CEnTREC------------------------------------------

app.get("/getCentre",  validateToken, (req,res) => {

    db.query(
        "SELECT * FROM cost_centre",
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
})

//-----------------------------------------Get Transaction by TRID------------------------------------------

app.get("/getTransactionByTrID",  validateToken, (req,res) => {

    const id = req.query.id;

    db.query(
        "SELECT * FROM transaction where tr_id = ?", id,
        (err, result) => {
            if(err) {
                res.send({error: err})
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
})

// //-----------------------------------------Get Employee Spouse by TCNO------------------------------------------


// app.get("/getSpouse", (req,res) => {

//     console.log(req.query.empId);
//     const tcNo = req.query.empId;

//     db.query(
//         "SELECT * FROM family_spouse WHERE  EmployeeNo = ?", [tcNo],
//         (err, result) => {
//             if(err) {
//                 console.log(err);
//             }
//             else {
//                 res.send(result);
//             }
//         }
//     );
// })

// //-----------------------------------------Get Employee Children by TCNO------------------------------------------


// app.get("/getChildren", (req,res) => {

//     console.log(req.query.empId);
//     const tcNo = req.query.empId;

//     db.query(
//         "SELECT * FROM family_children WHERE  EmployeeNo = ?", [tcNo],
//         (err, result) => {
//             if(err) {
//                 console.log(err);
//             }
//             else {
//                 res.send(result);
//             }
//         }
//     );
// })

// //-----------------------------------------Get Employee Children by TCNO and CHILDID------------------------------------------


// app.get("/getChildrenById", (req,res) => {

//     console.log(req.query.empId);
//     const tcNo = req.query.empId;
//     const id = req.query.id;

//     db.query(
//         "SELECT * FROM family_children WHERE  EmployeeNo = ? AND child_id = ?", [tcNo, id],
//         (err, result) => {
//             if(err) {
//                 console.log(err);
//             }
//             else {
//                 res.send(result);
//             }
//         }
//     );
// })





//-----------------------------------------Update-----------------------------------------


app.put("/update",  validateToken, (req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    db.query("UPDATE SET try_add name = ? WHERE id = ?",
    [name, id],
    (err, result) => {
        if(err) {
                res.send({error: err})
                console.log(err);
        }
        else {
            res.send(result);
        }
    }
    );

});

// -----------------------------------------EDIT FAMILY----------------------------------------------

app.put("/editFamily",  validateToken, (req, res) => {
    console.log(req.body)

    const tcNo = req.body.tcNo
    const namaSpouse = req.body.namaSpouse
    const icSpouse = req.body.icSpouse
    const bodSpouse = req.body.bodSpouse
    const occupation = req.body.occupationSpouse
    const mobile = req.body.mobileSpouse


    const namaAnak1 = req.body.namaAnak1
    const genderAnak1 = req.body.genderAnak1
    const icAnak1 = req.body.icAnak1
    const bodAnak1 = req.body.bodAnak1

    const namaAnak2 = req.body.namaAnak2
    const genderAnak2 = req.body.genderAnak2
    const icAnak2 = req.body.icAnak2
    const bodAnak2 = req.body.bodAnak2

    const namaAnak3 = req.body.namaAnak3
    const genderAnak3 = req.body.genderAnak3
    const icAnak3 = req.body.icAnak3
    const bodAnak3 = req.body.bodAnak3

    const namaAnak4 = req.body.namaAnak4
    const genderAnak4 = req.body.genderAnak4
    const icAnak4 = req.body.icAnak4
    const bodAnak4 = req.body.bodAnak4

    const namaAnak5 = req.body.namaAnak5
    const genderAnak5 = req.body.genderAnak5
    const icAnak5 = req.body.icAnak5
    const bodAnak5 = req.body.bodAnak5

    const namaAnak6 = req.body.namaAnak6
    const genderAnak6 = req.body.genderAnak6
    const icAnak6 = req.body.icAnak6
    const bodAnak6 = req.body.bodAnak6

    const namaAnak7 = req.body.namaAnak7
    const genderAnak7 = req.body.genderAnak7
    const icAnak7 = req.body.icAnak7
    const bodAnak7 = req.body.bodAnak7

    const namaAnak8 = req.body.namaAnak8
    const genderAnak8 = req.body.genderAnak8
    const icAnak8 = req.body.icAnak8
    const bodAnak8 = req.body.bodAnak8

    const namaAnak9 = req.body.namaAnak9
    const genderAnak9 = req.body.genderAnak9
    const icAnak9 = req.body.icAnak9
    const bodAnak9 = req.body.bodAnak9

    const namaAnak10 = req.body.namaAnak10
    const genderAnak10 = req.body.genderAnak10
    const icAnak10 = req.body.icAnak10
    const bodAnak10 = req.body.bodAnak10
      
    db.query(
        "UPDATE spouse SET Name_spouse = ?, Spouse_IcNo = ?, spouse_dob = ?, Occupation_spouse = ?, Spouse_mob_num = ?, "+
        "nama_anak1 = ?, jantina1 = ?, mykid1 = ?, tarikh_lahir_anak1 = ?, nama_anak2 = ?, jantina2 = ?, mykid2 = ?, tarikh_lahir_anak = ?, "+
        "nama_anak = ?, jantina3 = ?, mykid3 = ?, tarikh_lahir_anak3 = ?, nama_anak4 = ?, jantina4 = ?, mykid4 = ?, tarikh_lahir_anak4 = ?, "+
        "nama_anak5 = ?, jantina5 = ?, mykid5 = ?, tarikh_lahir_anak5 = ?, nama_anak6 = ?, jantina6 = ?, mykid6 = ?, tarikh_lahir_anak6 = ?, "+
        "nama_anak7 = ?, jantina7 = ?, mykid7 = ?, tarikh_lahir_anak7 = ?, nama_anak8 = ?, jantina8 = ?, mykid8 = ?, tarikh_lahir_anak8 = ?, "+
        "nama_anak9 = ?, jantina9 = ?, mykid9 = ?, tarikh_lahir_anak9 = ?, nama_anak10 = ?, jantina10 = ?, mykid10 = ?, tarikh_lahir_anak10 = ? WHERE Employee_No = ?",
        [namaSpouse, icSpouse, bodSpouse, occupation, mobile, namaAnak1, genderAnak1, icAnak1, bodAnak1, 
        namaAnak2, genderAnak2, icAnak2, bodAnak2, namaAnak3, genderAnak3, icAnak3, bodAnak3, 
        namaAnak4, genderAnak4, icAnak4, bodAnak4, namaAnak5, genderAnak5, icAnak5, bodAnak5, 
        namaAnak6, genderAnak6, icAnak6, bodAnak6, namaAnak7, genderAnak7, icAnak7, bodAnak7,
        namaAnak8, genderAnak8, icAnak8, bodAnak8, namaAnak9, genderAnak9, icAnak9, bodAnak9,
        namaAnak10, genderAnak10, icAnak10, bodAnak10, tcNo], (err, result) => {
            if(err) {
                console.log(err);
                res.status(400).json({error: error})
            }
            else {
                res.send({message: "Family Updated Successfully"})
                
            }
        }
    );
});


// -----------------------------------------EDIT DELETE FAMILY CHILDREN----------------------------------------------

app.put("/editDeleteChildren",  validateToken, (req, res) => {
    const tcNo = req.body.tcNo
    const anak = req.body.anak

    const namaAnak = ""
    const genderAnak = ""
    const icAnak = ""
    const bodAnak = ""
    
    if(anak === "anak1"){
        db.query(
            "UPDATE spouse SET nama_anak1 = ?, jantina1 = ?, mykid1 = ?, tarikh_lahir_anak1 = ? WHERE Employee_No = ?",
            [namaAnak, genderAnak, icAnak, bodAnak, tcNo], (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(400).json({error: error})
                }
                else {
                    res.send({message: "Children Deleted Successfully"})
                }
            }
        );
    }else if(anak === "anak2"){
        db.query(
            "UPDATE spouse SET nama_anak2 = ?, jantina2 = ?, mykid2 = ?, tarikh_lahir_anak = ? WHERE Employee_No = ?",
            [namaAnak, genderAnak, icAnak, bodAnak, tcNo], (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(400).json({error: error})
                }
                else {
                    res.send({message: "Children Deleted Successfully"})
                }
            }
        );
    }
    else if(anak === "anak3"){
        db.query(
            "UPDATE spouse SET nama_anak = ?, jantina3 = ?, mykid3 = ?, tarikh_lahir_anak3 = ? WHERE Employee_No = ?",
            [namaAnak, genderAnak, icAnak, bodAnak, tcNo], (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(400).json({error: error})
                }
                else {
                    res.send({message: "Children Deleted Successfully"})
                }
            }
        );
    }
    else if(anak === "anak4"){
        db.query(
            "UPDATE spouse SET nama_anak4 = ?, jantina4 = ?, mykid4 = ?, tarikh_lahir_anak4 = ? WHERE Employee_No = ?",
            [namaAnak, genderAnak, icAnak, bodAnak, tcNo], (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(400).json({error: error})
                }
                else {
                    res.send({message: "Children Deleted Successfully"})
                }
            }
        );
    }
    else if(anak === "anak5"){
        db.query(
            "UPDATE spouse SET nama_anak5 = ?, jantina5 = ?, mykid5 = ?, tarikh_lahir_anak5 = ? WHERE Employee_No = ?",
            [namaAnak, genderAnak, icAnak, bodAnak, tcNo], (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(400).json({error: error})
                }
                else {
                    res.send({message: "Children Deleted Successfully"})
                }
            }
        );
    }
    else if(anak === "anak6"){
        db.query(
            "UPDATE spouse SET nama_anak6 = ?, jantina6 = ?, mykid6 = ?, tarikh_lahir_anak6 = ? WHERE Employee_No = ?",
            [namaAnak, genderAnak, icAnak, bodAnak, tcNo], (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(400).json({error: error})
                }
                else {
                    res.send({message: "Children Deleted Successfully"})
                }
            }
        );
    }
    else if(anak === "anak7"){
        db.query(
            "UPDATE spouse SET nama_anak7 = ?, jantina7 = ?, mykid7 = ?, tarikh_lahir_anak7 = ? WHERE Employee_No = ?",
            [namaAnak, genderAnak, icAnak, bodAnak, tcNo], (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(400).json({error: error})
                }
                else {
                    res.send({message: "Children Deleted Successfully"})
                }
            }
        );
    }
    else if(anak === "anak8"){
        db.query(
            "UPDATE spouse SET nama_anak8 = ?, jantina8 = ?, mykid8 = ?, tarikh_lahir_anak8 = ? WHERE Employee_No = ?",
            [namaAnak, genderAnak, icAnak, bodAnak, tcNo], (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(400).json({error: error})
                }
                else {
                    res.send({message: "Children Deleted Successfully"})
                }
            }
        );
    }
    else if(anak === "anak9"){
        db.query(
            "UPDATE spouse SET nama_anak9 = ?, jantina9 = ?, mykid9 = ?, tarikh_lahir_anak9 = ? WHERE Employee_No = ?",
            [namaAnak, genderAnak, icAnak, bodAnak, tcNo], (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(400).json({error: error})
                }
                else {
                    res.send({message: "Children Deleted Successfully"})
                }
            }
        );
    }
    else if(anak === "anak10"){
        db.query(
            "UPDATE spouse SET nama_anak10 = ?, jantina10 = ?, mykid10 = ?, tarikh_lahir_anak10 = ? WHERE Employee_No = ?",
            [namaAnak, genderAnak, icAnak, bodAnak, tcNo], (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(400).json({error: error})
                }
                else {
                    res.send({message: "Children Deleted Successfully"})
                }
            }
        );
    }
});



//-----------------------------------------EDIT ENTITLEMENT-----------------------------------------


app.put("/editentitlement",  validateToken, (req,res) => {
    const grade = req.body.grade;
    const emt = req.body.emt;
    const fmt = req.body.fmt;
    const dtl = req.body.dtl;

    // "UPDATE mcms_employee SET uop_ent = ?, uop_bal = ?, heal_entitle_1 = ?, heal_ent_bal_1 = ?, dent_entitle = ?, dent_ent_bal = ? WHERE grade = ?"


    db.query("UPDATE entitlement SET ent_cost = ? WHERE ent_grade = ? AND ent_medical = 'EMT'",
    [emt, grade],
    (err, result) => {
        if(err) {
            console.log(err);
            res.status(400).json({error: error})
        }
        else {
            res.send({message: "Entitlement Updated Successfully"})
        }
    }
    );

    db.query("UPDATE entitlement SET ent_cost = ? WHERE ent_grade = ? AND ent_medical = 'FMT'",
    [fmt, grade],
    (err, result) => {
        if(err) {
            console.log(err);
            res.status(400).json({error: error})
        }
        // else {
        //     res.send({message: "Entitlement Updated Successfully"})
        // }
    }
    );

    db.query("UPDATE entitlement SET ent_cost = ? WHERE ent_grade = ? AND ent_medical = 'EDT'",
    [dtl, grade],
    (err, result) => {
        if(err) {
            console.log(err);
            res.status(400).json({error: error})
        }
        // else {
        //     res.send({message: "Entitlement Updated Successfully"})
        // }
    }
    );

});
//-----------------------------------------EDIT TRANSACTIOn-----------------------------------------

app.put("/editTransaction",validateToken, (req, res) => {
    console.log(req.body)

    const id = req.body.id
    const empNo = req.body.tcNo
    const deptCode = req.body.deptCode
    const dateVisit = req.body.dateVisit
    const medicalCode = req.body.medicalType
    const cCenter = req.body.cCategory
    const cCenterNo = req.body.costCen
    const family = req.body.relation
    const sickness = req.body.sickness
    const type = req.body.type
    const clinicCode = req.body.clinicCode
    const cost = req.body.cost
    
    db.query(
        "UPDATE transaction SET tr_EmployeeNo = ?, tr_deptCode = ?, tr_DateVisit = ?, tr_Code = ?,tr_costCenter = ?, "+
        "tr_costCenterNo = ?, tr_Family = ?, tr_Sickness = ?, tr_type = ?,  tr_ClinicCode = ?, tr_cost = ? " +
        "WHERE tr_id = ?",
        [empNo, deptCode, dateVisit, medicalCode, cCenter, cCenterNo, family,
        sickness,type, clinicCode, cost, id], (err, result) => {
            if(err) {
                console.log(err);
                res.status(400).json({error: err})
            }
            else {
                res.send({message:"Transaction Edited Successfully"})
            }
        }
    );

});


//-----------------------------------------EDIT ADMIN-----------------------------------------


app.put("/editAdmin",  validateToken, (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const mcms_id = req.body.id;

    bcrypt.hash(password, saltRounds, (err, hash)=>{

        if(err){
            console.log(err);
        }

        db.query(
        "UPDATE mcms_login SET username = ?, password = ? WHERE mcms_id = ?",
        [username, hash, mcms_id], (err, result) => {
            if(err) {
                res.status(400).json({error: err})
            }
            else {
                res.send({message: "Admin Update Successfully"})
            }
            }
        );
    })

});

//-----------------------------------------EDIT CLINIC-----------------------------------------


app.put("/editClinic",  validateToken, (req,res) => {
    const cType = req.body.cType;
    const cCode = req.body.code;
    const cName = req.body.cName;
    const status = req.body.status;
    const username = req.body.username;
    const password = req.body.password;
    const mcms_id = req.body.id;

    bcrypt.hash(password, saltRounds, (err, hash)=>{

        if(err){
            console.log(err);
        }

        db.query(
        "UPDATE mcms_clinic mc INNER JOIN mcms_login ml ON mc.mcms_id = ml.mcms_id "+
        "SET mc.clinic_name = ?, mc.clinic_code = ?, mc.clinic_ref = ?, mc.clinic_status = ?, "+
        "ml.username = ?, ml.password = ?"+
        "WHERE mc.mcms_id = ?;",
        [cName, cCode, cType, status, username, hash, mcms_id], (err, result) => {
            if(err) {
                res.status(400).json({error: err})
            }
            else {
                res.send({message: "Update Clinic Successfully"})
            }
            }
        );
    })

});

//-----------------------------------------EDIT EMPLOYEE-------------------------------------

app.put("/editEmployee",  validateToken, (req,res) => {
    console.log(req.body)
    const tcNo = req.body.tcNo;
    const empNo = req.body.empNo;
    const name = req.body.name;
    const icNo = req.body.icNo;
    const grade = req.body.gred;
    const position = req.body.position;
    const department = req.body.department;
    const dateJoin = req.body.dateJoin;
    const costCenter = req.body.cCenter;
    // const costC_category = req.body.cCenter.cost_category;
    const plant = req.body.plant;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const age = req.body.age;
    const maritalStatus = req.body.marital;
    const spouseWork = req.body.sWork;
    const hpNo = req.body.hpNo;
    const emt = req.body.emt;
    const fmt = req.body.fmt;
    const dtl = req.body.dtl;
    const jobStatus = req.body.status;
    const dateResign = req.body.dateResign;
    const dateConfirm = req.body.dateConfirm;


    db.query(
    "UPDATE employee SET EmployeeNo = ?, Name = ?, costcen = ?, position = ?, grade = ?,"+
    "dep_name = ?, date_join = ?,date_confirm = ?, Resign = ?, hp_num = ?, gender = ?, MaritalStatus = ?, "+
    "Birth = ?, age = ?, IcNo = ?, wife_work = ?, plant = ?, job_status = ?, uop_ent = ?, "+
    "uop_bal = ?, heal_entitle_1 = ?, heal_ent_bal_1 = ?,"+
    "dent_entitle = ?, dent_ent_bal = ? WHERE EmployeeNo = ?",
    [empNo, name, costCenter, position, grade, department, dateJoin, dateConfirm, dateResign, hpNo, gender, 
    maritalStatus, dob, age, icNo, spouseWork, plant, jobStatus, emt, emt, fmt, fmt, dtl, dtl, tcNo],
    (err, result) => {
        if(err) {
            console.log(err)
            res.status(400).json({error: err})
        }
        else {
            res.send({message: "Update Employee Successfully"})
        }
    }
    );

});


// //-----------------------------------------EDIT CHILD-------------------------------------

// app.put("/editchild", (req,res) => {
//     const tcNo = req.body.tcNo;
//     const childId = req.body.childId;
//     const name = req.body.name;
//     const ic = req.body.icNo;
//     const gender = req.body.gender;
//     const dob = req.body.dob;
//     const marital = req.body.marital;
//     const study = req.body.study;

//     db.query("UPDATE  family_children SET child_name = ?, child_ic = ?, child_gender = ?, child_dob = ?, child_marital_status = ?, child_study_status = ?  WHERE EmployeeNo = ? and  child_id = ?",
//     [name, ic, gender, dob, marital, study, tcNo, childId],
//     (err, result) => {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             console.log(result.data);
//             res.send(result);
//         }
//     }
//     );

// });


// //-----------------------------------------EDIT SPOUSE-------------------------------------

// app.put("/editspouse", (req,res) => {
//     const tcNo = req.body.tcNo;
//     const spouseId = req.body.spouseId;
//     const name = req.body.name;
//     const ic = req.body.icNo;
//     const dob = req.body.dob;
//     const occupation = req.body.occupation;
//     const contact = req.body.hpNo;
//     console.log(req.body)

//     db.query("UPDATE  family_spouse SET spouse_name = ?, spouse_ic = ?, spouse_dob = ?, spouse_occupation = ?, spouse_contact = ?  WHERE EmployeeNo = ? and  spouse_id = ?",
//     [name, ic, dob, occupation, contact, tcNo, spouseId],
//     (err, result) => {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             console.log(result.data );
//             res.send(result);
//         }
//     }
//     );

// });

//-------------------------------------------------DELETE-------------------------------------------

// //-------------------------------------------------DELETE CHILD-------------------------------------------

// app.delete("/deletechild/:id", (req, res)=> {
//     const id = req.params.id;
//     db.query("DELETE from family_children WHERE child_id = ?", id, 
//     (err, result) => {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     }
//     );
// })


//-------------------------------------------------DELETE SPOUSE-------------------------------------------

// app.delete("/deletespouse/:id", (req, res)=> {
//     const id = req.params.id;
//     db.query("DELETE from family_spouse WHERE spouse_id = ?", id, 
//     (err, result) => {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     }
//     );
// })

app.delete("/deleteadmin/:id",  validateToken, (req, res)=> {
    const id = req.params.id;
    db.query("DELETE from mcms_login WHERE mcms_id = ?", id, 
    (err, result) => {
        if(err) {
            res.send({error: err})
            
        }
        else {
            res.send({message: "Delete Admin Successfully"})

        }
    }
    );
})

app.delete("/deleteclinic/:id",  validateToken, (req, res)=> {
    const id = req.params.id;
    db.query("DELETE mcms_clinic, mcms_login FROM mcms_clinic "+
    "INNER JOIN mcms_login "+
    "WHERE mcms_clinic.mcms_id = mcms_login.mcms_id AND mcms_clinic.mcms_id =?", id, 
    (err, result) => {
        if(err) {
            res.send({error: err})
        }
        else {
            res.send({message: "Delete Clinic Successfully"})
        }
    }
    );
})

app.delete("/deletefamily/:tcNo",  validateToken, (req, res)=> {
    const tcNo = req.params.tcNo;
    db.query("DELETE FROM spouse WHERE Employee_No = ?", tcNo, 
    (err, result) => {
        if(err) {
            res.send({error: err})
        }
        else {
            res.send({message: "Delete Employee Family Successfully"})
        }
    }
    );
})

app.delete("/deleteEmployee/:tcNo",  validateToken, (req, res)=> {
    const tcNo = req.params.tcNo;
    db.query("DELETE FROM employee WHERE EmployeeNo = ?", tcNo, 
    (err, result) => {
        if(err) {
            res.send({error: err})
        }
        else {
            res.send({message: "Delete Employee Successfully"})
        }
    }
    );
})

app.delete("/deleteTransaction/:id",  validateToken, (req, res)=> {
    const id = req.params.id;

    db.query("DELETE FROM transaction WHERE tr_id = ?", id, 
    (err, result) => {
        if(err) {
            res.send({error: err})          
        }
        else {
            res.send({message: "Delete Transaction Successfully"})

        }
    }
    );
})


app.listen(process.env.PORT || 3001, ()=>{
    console.log("server is running on port 3001");
});
