const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        require: [true, "Email is required"]
    },

    role: {
        type: String,
        enum: ["admin", "member"],
        default: "memmber"
    },

    createAt: {
        type: Date,
        default: Date.now
    }
});//, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    const salt = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (entreredPassword) {
    return await bcrypt.compare(entreredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;