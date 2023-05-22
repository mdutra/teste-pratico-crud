const db = require('./knex-client');

async function insertUser(email, nome, senha) {
  const newUser = await db("usuario")
        .insert({
            email,
            nome,
            senha,
        })
        .returning("id_usuario");

  return newUser[0].id_usuario
}

async function findUserByEmail(email) {
  return db("usuario").where({ email }).first()
}

module.exports = {
  insertUser,
  findUserByEmail,
}
