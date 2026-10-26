const jwt = require("jsonwebtoken");
const privileged = require("../specialUsers");

const isAuthenticated = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ msg: "A JWT Token is required to access this endpoint ;)" })
    }
    const token = req.headers.authorization.substring(7)

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ msg: "Invalid token" })
        }
        req.user = user;
        next();
    })
}

const isAdmin = (req, res, next) => {
    console.log("[isAdmin Middleware] This is the req.user: ", req.user);
    if (!privileged.includes(req.user.email)) {
        return res.status(401).json({ msg: "unauthorized" })
    }
    return next()
}

module.exports = { isAuthenticated, isAdmin };