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

    let token;
    try {
        token = await UserController.signup(email, nome, senha);
    } catch (e) {
        return next(e);
    }

    res.json({ token });
});

app.post("/login", async (req, res, next) => {
    const { email, senha } = req.body;

    let token;
    try {
        token = await UserController.login(email, senha);
    } catch (e) {
        return next(e);
    }

    res.json({ token });
});

app.get("/componentes", handleAuthentication, async (req, res) => {
    const componentes = await ComponentRepository.findComponents();

    res.json(componentes);
});

app.use(handleError);

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
