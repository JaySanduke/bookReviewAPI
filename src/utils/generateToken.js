const jwt = require('jsonwebtoken');

const generateToken = (userid) => {
    const jwtExpiration = process.env.JWT_EXPIRATION || '1d';
    return jwt.sign({ id: userid }, process.env.JWT_SECRET, { expiresIn: jwtExpiration });
};

module.exports = generateToken;
