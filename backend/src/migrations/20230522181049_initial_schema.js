/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable("usuario", function (table) {
        table.increments("id_usuario").primary();
        table.string("nome").notNullable();
        table.string("email").notNullable().unique();
        table.string("senha").notNullable();
        table.timestamps(true, true);
    });

    await knex.schema.createTable("grupo", function (table) {
        table.increments("id_grupo").primary();
        table.string("nome").notNullable();
        table.timestamps(true, true);
    });

    await knex.schema.createTable("comp_fotovoltaico", function (table) {
        table.increments("id_comp_fotovoltaico").primary();
        table.string("nome").notNullable();
        table.string("gtin").notNullable().unique();
        table.enu("segmento", ["Ongrid", "Offgrid"]).notNullable();
        table
            .integer("id_grupo")
            .unsigned()
            .notNullable()
            .references("grupo.id_grupo");
        table
            .integer("id_usuario")
            .unsigned()
            .notNullable()
            .references("usuario.id_usuario");
        table.decimal("altura", 5, 3).unsigned().notNullable();
        table.decimal("largura", 5, 3).unsigned().notNullable();
        table.decimal("profundidade", 5, 3).unsigned().notNullable();
        table.decimal("peso_bruto", 5, 3).unsigned().notNullable();
        table.decimal("peso_liquido", 5, 3).unsigned().notNullable();
        table.timestamps(true, true);
        table.timestamp("deleted_at");
    });

    // index para o otimizar o filtro de componentes por nome
    await knex.raw(
        "CREATE INDEX comp_fotovoltaico_nome_btree ON comp_fotovoltaico (nome)"
    );
    // partial index para o otimizar o filtro de componentes removidos
    await knex.raw(
        "CREATE INDEX comp_fotovoltaico_deleted_at_non_null ON comp_fotovoltaico (deleted_at) WHERE deleted_at IS NOT NULL;"
    );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("comp_fotovoltaico");
    await knex.schema.dropTableIfExists("grupo");
    await knex.schema.dropTableIfExists("usuario");
};
