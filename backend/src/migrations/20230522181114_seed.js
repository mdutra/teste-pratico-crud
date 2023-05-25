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
            nome: "Componente 1",
            gtin: "143981732",
            segmento: "Ongrid",
            id_grupo: 1,
            id_usuario: 1,
            altura: 2.9,
            largura: 3.7,
            profundidade: 4.1,
            peso_bruto: 5.8,
            peso_liquido: 4.5,
        },
        {
            nome: "Componente 2",
            gtin: "213981012",
            segmento: "Offgrid",
            id_grupo: 3,
            id_usuario: 2,
            altura: 3.4,
            largura: 2.1,
            profundidade: 3.1,
            peso_bruto: 2.0,
            peso_liquido: 1.0,
        },
        {
            nome: "Outro Componente",
            gtin: "011701314",
            segmento: "Offgrid",
            id_grupo: 2,
            id_usuario: 1,
            altura: 4.3,
            largura: 1.2,
            profundidade: 1.3,
            peso_bruto: 0.2,
            peso_liquido: 0.1,
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
