require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
    handleError,
    handleAuthentication,
} = require("./middleware/custom-middlewares.js");
const UserController = require("./controller/user-controller");
const ComponentRepository = require("./repository/component-repository");

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.post("/signup", async (req, res, next) => {
    const { email, nome, senha } = req.body;

    let response;
    try {
        response = await UserController.signup(email, nome, senha);
    } catch (e) {
        return next(e);
    }

    res.json(response);
});

app.post("/login", async (req, res, next) => {
    const { email, senha } = req.body;

    let response;
    try {
        response = await UserController.login(email, senha);
    } catch (e) {
        return next(e);
    }

    res.json(response);
});

app.get("/componentes", handleAuthentication, async (req, res, next) => {
    let components;
    try {
        components = await ComponentRepository.findComponents(req.query);
    } catch (e) {
        return next(e);
    }

    res.json(components);
});

app.post("/componentes", handleAuthentication, async (req, res, next) => {
    let id_comp_fotovoltaico;
    try {
        id_comp_fotovoltaico = await ComponentRepository.insertComponent({
            ...req.body,
            id_usuario: req.user.id_usuario,
        });
    } catch (e) {
        return next(e);
    }

    res.json({ id_comp_fotovoltaico });
});

app.delete(
    "/componentes/:id_comp_fotovoltaico",
    handleAuthentication,
    async (req, res, next) => {
        try {
            await ComponentRepository.deleteComponentById(
                req.params.id_comp_fotovoltaico
            );
        } catch (e) {
            return next(e);
        }

        res.sendStatus(204);
    }
);

app.put(
    "/componentes/:id_comp_fotovoltaico",
    handleAuthentication,
    async (req, res, next) => {
        try {
            await ComponentRepository.updateComponentById(
                req.params.id_comp_fotovoltaico,
                req.body
            );
        } catch (e) {
            return next(e);
        }

        res.sendStatus(204);
    }
);

app.post("/projetos/cubagem", handleAuthentication, async (req, res, next) => {
    let response;
    try {
        response = await ComponentRepository.aggregateCubagem(req.body);
    } catch (e) {
        return next(e);
    }

    res.json(response);
});

app.use(handleError);

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
