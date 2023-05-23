const jwt = require("jsonwebtoken");
const {
    errorTypes,
    UnauthorizedError,
    InvalidTokenError,
} = require("../error");

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

function handleError(err, req, res, next) {
    for (const errorType of errorTypes) {
        if (err instanceof errorType) {
            return res.status(err.statusCode).json({ erro: err.message });
        }
    }

    res.status(500).json({ erro: "Erro interno do servidor" });
}

module.exports = {
    handleAuthentication,
    handleError,
};
