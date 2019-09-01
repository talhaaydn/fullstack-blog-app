const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifiedToken = jwt.verify(token, config.TOKEN_SECRET_KEY);
        res.locals.user = verifiedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
}