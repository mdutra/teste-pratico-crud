const db = require("./knex-client");

async function findComponents({ nome, id_grupo }) {
    const query = db("comp_fotovoltaico").select("*").whereNull("deleted_at");

    if (nome) {
        query.where("nome", "LIKE", `%${nome}%`);
    }
    if (id_grupo) {
        query.where("id_grupo", "=", id_grupo);
    }

    return query;
}

// os parametros estão todos explícitos para não inserir valores indesejados
// como por exemplo: deleted_at
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

// os parametros estão todos explícitos para não atualizar valores indesejados
// como por exemplo: deleted_at
async function updateComponentById(
    id_comp_fotovoltaico,
    {
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
    }
) {
    const columnsToUpdate = {};

    if (nome) {
        columnsToUpdate.nome = nome;
    }
    if (gtin) {
        columnsToUpdate.gtin = gtin;
    }
    if (segmento) {
        columnsToUpdate.segmento = segmento;
    }
    if (id_grupo) {
        columnsToUpdate.id_grupo = id_grupo;
    }
    if (altura) {
        columnsToUpdate.altura = altura;
    }
    if (largura) {
        columnsToUpdate.largura = largura;
    }
    if (profundidade) {
        columnsToUpdate.profundidade = profundidade;
    }
    if (peso_bruto) {
        columnsToUpdate.peso_bruto = peso_bruto;
    }
    if (peso_liquido) {
        columnsToUpdate.peso_liquido = peso_liquido;
    }

    if (Object.values(columnsToUpdate).length) {
        columnsToUpdate.id_usuario = id_usuario;

        await db("comp_fotovoltaico")
            .where("id_comp_fotovoltaico", "=", id_comp_fotovoltaico)
            .update(columnsToUpdate);
    }
}

module.exports = {
    findComponents,
    insertComponent,
    deleteComponentById,
    updateComponentById,
};
