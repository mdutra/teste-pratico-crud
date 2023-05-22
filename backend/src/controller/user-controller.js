const bcrypt = require('bcrypt');
const jwt = require( 'jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const { EmailExists } = require('../error')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

async function signup(email, nome, senha) {
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
        throw new EmailExists();
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const id_usuario = await UserRepository.insertUser(email, nome, hashedPassword)

    const token = jwt.sign(
        { id_usuario },
        JWT_SECRET_KEY,
        {
            expiresIn: "1h",
        }
    );

    return token;
}

module.exports = {
  signup,
}
