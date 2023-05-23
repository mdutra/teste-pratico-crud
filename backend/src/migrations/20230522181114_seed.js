const bcrypt = require("bcrypt");

async function somePassword() {
    return bcrypt.hash("123", 10);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex("usuario").insert([
        {
            id_usuario: 1,
            nome: "João Silva",
            email: "joao@exemplo.com",
            senha: await somePassword(),
        },
        {
            id_usuario: 2,
            nome: "Maria Alves",
            email: "maria@exemplo.com",
            senha: await somePassword(),
        },
    ]);
    await knex("grupo").insert([
        { id_grupo: 1, nome: "Perfil" },
        { id_grupo: 2, nome: "Modulo" },
        { id_grupo: 3, nome: "Inversor" },
        { id_grupo: 4, nome: "Cabos" },
        { id_grupo: 5, nome: "Conectores" },
        { id_grupo: 6, nome: "Bateria" },
    ]);
    await knex("comp_fotovoltaico").insert([
        {
            nome: "Teste 1",
            gtin: "123981732",
            segmento: "Ongrid",
            id_grupo: 1,
            id_usuario: 1,
            altura: 1.1,
            largura: 1.1,
            profundidade: 1.1,
            peso_bruto: 1.1,
            peso_liquido: 1.1,
        },
        {
            nome: "Teste 1",
            gtin: "223981732",
            segmento: "Ongrid",
            id_grupo: 1,
            id_usuario: 1,
            altura: 1.1,
            largura: 1.1,
            profundidade: 1.1,
            peso_bruto: 1.1,
            peso_liquido: 1.1,
        },
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex("comp_fotovoltaico").del();
    await knex("usuario").del();
    await knex("grupo").del();
};
