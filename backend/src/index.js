require("dotenv").config();
const express = require("express");
const cors = require("cors");
const knex = require("knex");

const PORT = 5000;

const db = knex({
    client: "pg",
    connection: {
        host: process.env.POSTGRES_HOST,
        port: 5432,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    },
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
