const {sign, verify} = require("jsonwebtoken");

const createToken = (user) => {
    const accessToken = sign({
        id: user.mcms_id,
        userType: user.user_type,
        username: user.username,
    }, "jwtSecret",);

    return accessToken;  
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if(!accessToken) 
        return res.json({error: "User not Authenticated!!"})
    try{
        const validToken = verify(accessToken, "jwtSecret")
        if(validToken){
            req.token = accessToken;
            req.authenticated = true;
            req.user = validToken;
            return next();
        }
    }catch(err) {
        return res.status(400).json({error: err})
    }
}

module.exports = {createToken, validateToken};






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