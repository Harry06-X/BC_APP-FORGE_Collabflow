const jwt = require("jsonwebtoken");

function generateToken(id, role) {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET || "abcdef",
        {expiresIn: "1h"}
    );
}

module.exports = generateToken;