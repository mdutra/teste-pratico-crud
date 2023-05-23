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

async function insertComponent({
    nome,
    gtin,
    segmento,
    id_grupo,
    altura,
    largura,
    profundidade,
    peso_bruto,
    peso_liquido,
    id_usuario,
}) {
    const newComponent = await db("comp_fotovoltaico")
        .insert({
            nome,
            gtin,
            segmento,
            id_grupo,
            altura,
            largura,
            profundidade,
            peso_bruto,
            peso_liquido,
            id_usuario,
        })
        .returning("id_comp_fotovoltaico");

    return newComponent[0].id_comp_fotovoltaico;
}

async function deleteComponentById(id_comp_fotovoltaico) {
    await db("comp_fotovoltaico")
        .where("id_comp_fotovoltaico", "=", id_comp_fotovoltaico)
        .update({ deleted_at: db.raw("CURRENT_TIMESTAMP") });
}

module.exports = {
    findComponents,
    insertComponent,
    deleteComponentById,
};
