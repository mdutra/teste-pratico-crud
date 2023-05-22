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

const errorTypes = [EmailExists, InvalidEmailOrPassword];

module.exports = {
    errorTypes,
    EmailExists,
    InvalidEmailOrPassword,
};
