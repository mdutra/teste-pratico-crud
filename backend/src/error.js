class EmailExists extends Error {
    constructor(message) {
        super(message || "Email já existe");
        this.statusCode = 409;
        this.message;
    }
}

class InvalidEmailOrPassword extends Error {
    constructor(message) {
        super(message || "Email ou senha inválida");
        this.statusCode = 401;
        this.message;
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message || "Não autorizado");
        this.statusCode = 401;
        this.message;
    }
}

class InvalidTokenError extends Error {
    constructor(message) {
        super(message || "Token inválido");
        this.statusCode = 403;
        this.message;
    }
}

class InvalidRequestError extends Error {
    constructor(message) {
        super(message || "Requisição inválida");
        this.statusCode = 400;
        this.message;
    }
}

const errorTypes = [
    EmailExists,
    InvalidEmailOrPassword,
    UnauthorizedError,
    InvalidTokenError,
    InvalidRequestError,
];

module.exports = {
    errorTypes,
    EmailExists,
    InvalidEmailOrPassword,
    UnauthorizedError,
    InvalidTokenError,
    InvalidRequestError,
};
