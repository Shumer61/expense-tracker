const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    try {
        // check if token exists in request headers
        const token = req.headers.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).json({ message: 'No token, access denied' });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user id to request
        req.userId = decoded.userId;

        next();

    } catch(error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = protect;