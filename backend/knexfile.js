require("dotenv").config();

module.exports = {
    [process.env.NODE_ENV]: {
        client: "pg",
        connection: {
            host: process.env.POSTGRES_HOST,
            port: 5432,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        },
        migrations: {
            directory: "./src/migrations",
        },
    },
};
