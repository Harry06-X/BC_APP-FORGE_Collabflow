function adminOnly(req, res, next){
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Acess denied: admin only"});
    }
    next();
}

module.exports = { adminOnly };