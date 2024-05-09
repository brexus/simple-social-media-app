const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    //const token = req.cookies.token;

    const token = req.headers.authorization.split(" ")[1];

    if(!token) {
        // console.log("!token");
        return res.status(400).json("The token was not available");
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            // console.log("!token else");
            if(err) return res.status(400).json("Token is wrong");
            req.userEmail = decoded.email;
            next();
        })
    }
};

module.exports = isAuthenticated;
