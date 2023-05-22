class EmailExists extends Error {
  constructor(message) {
    super(message || "Email já existe");
    this.statusCode = 409
    this.message
  }
}

const errorTypes = [EmailExists];

module.exports = {
  errorTypes,
  EmailExists,
}
