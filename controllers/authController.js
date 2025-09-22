const User = require("../models/User");
const generateToken = require("../utils/generateToken");

async function registerUser(req, res) {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            })
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch(error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser
};