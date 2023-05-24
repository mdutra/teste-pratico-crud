const db = require("./knex-client");

async function insertUser(email, nome, senha) {
    const [newUser] = await db("usuario")
        .insert({
            email,
            nome,
            senha,
        })
        .returning(["id_usuario", "nome"]);

    return {
        id_usuario: newUser.id_usuario,
        nome: newUser.nome,
    };
}

async function findUserByEmail(email) {
    return db("usuario").where({ email }).first();
}

module.exports = {
    insertUser,
    findUserByEmail,
};
