const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
require('dotenv').config();


// authMiddleware.js

const verifyToken = (req, res, next) => {
    try {
        // Check if the user is authenticated
        if (req.isAuthenticated()) {
            console.log(req.isAuthenticated);
            // If authenticated, proceed to the next middleware or route handler
            return next();
        } else {
            // If not authenticated, send a 401 Unauthorized status
            return res.sendStatus(401);
        }
    } catch (error) {
        // If an error occurs, handle it and send a 500 Internal Server Error status
        console.error('Error in authentication middleware:', error);
        return res.sendStatus(500);
    }
};
    
module.exports = verifyToken;
