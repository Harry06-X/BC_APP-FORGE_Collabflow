const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied"});
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({msg : "Accesse denied, invalide token"});
    }
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ msg: "Token is not valid"});
    }
};
//auth();
module.exports = auth;
