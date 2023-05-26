const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const secretKey = 'someSecretKey';
        const decodedToken = jwt.verify(token, secretKey);
        const _id = decodedToken._id;
        const user = await User.findOne({ _id, 'tokens.token': token });
        if (!user) {
            throw new Error('Authentication failed');
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please Authenticate' });
    }
}

module.exports = auth;