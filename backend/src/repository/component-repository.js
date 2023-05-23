const db = require("./knex-client");

async function findComponents() {
    return db("comp_fotovoltaico").select("*").whereNull("deleted_at");
}

module.exports = {
    findComponents,
};
