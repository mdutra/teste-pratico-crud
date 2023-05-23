const db = require("./knex-client");

async function findComponents({ nome, id_grupo }) {
    const query = db("comp_fotovoltaico").select("*").whereNull("deleted_at");

    if (nome) {
        query.where("nome", "LIKE", `%${nome}%`);
    }
    if (id_grupo) {
        query.where("id_grupo", "=", id_grupo);
    }

    console.log(query.toSQL().sql);

    return query;
}

module.exports = {
    findComponents,
};
