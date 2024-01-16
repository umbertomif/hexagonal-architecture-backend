import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const port = process.env.API_PORT ?? 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// ----- ROTAS ABERTAS ----- //
import RepositorioUsuarioPg from "./external/db/RepositorioUsuarioPg";
import SenhaCrypto from "./external/auth/SenhaCrypto";
import RegistrarUsuario from "./core/usuario/service/RegistarUsuario";
import IdHash from "./external/auth/IdHash";
import RegistrarUsuarioController from "./external/api/RegistrarUsuarioController";

const repositorioUsuario = new RepositorioUsuarioPg();
const provedorCripto = new SenhaCrypto();
const id = new IdHash();
const registrarUsuario = new RegistrarUsuario(repositorioUsuario, provedorCripto, id);
new RegistrarUsuarioController(app, registrarUsuario);
