const jwt = require("jsonwebtoken");
const { UnauthorizedError, InvalidTokenError } = require("../error");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function handleAuthentication(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        next(new UnauthorizedError());
    } else {
        try {
            const decoded = jwt.verify(
                token.replace("Bearer ", ""),
                JWT_SECRET_KEY
            );

            req.user = decoded;

            next();
        } catch (error) {
            next(new InvalidTokenError());
        }
    }
}

module.exports = {
    handleAuthentication,
};
