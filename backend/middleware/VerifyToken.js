require('dotenv').config()
const jwt=require('jsonwebtoken')
const { sanitizeUser } = require('../utils/SanitizeUser')



exports.verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) return res.status(401).json("You are not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.user = user;
    next();
  });
};