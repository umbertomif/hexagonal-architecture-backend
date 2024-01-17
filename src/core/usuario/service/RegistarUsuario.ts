import CasoDeUso from "@/core/shared/CasoDeUso";
import Usuario from "../model/usuario";
import Erros from "@/core/shared/Erros";
import Id from "@/core/shared/Id";
import ProvedorCriptografia from "./ProvedorCriptografia";
import RepositorioUsuario from "./RepositorioUsuario";

export default class RegistrarUsuario implements CasoDeUso<Usuario, void> {
    constructor(
        private repositorio: RepositorioUsuario,
        private provedorCripto: ProvedorCriptografia,
        private id: Id
    ) {}

    async executar(usuario: Usuario): Promise<void> {
        if (!usuario.senha) throw new Error(Erros.SENHA_OBRIGATORIA);
        const senhaCripto = this.provedorCripto.criptografar(usuario.senha);
        const usuarioExistente = await this.repositorio.buscarPorEmail(usuario.email);
        if (usuarioExistente) throw new Error(Erros.USUARIO_JA_EXISTENTE);
        const novoUsuario: Usuario = {
            id: this.id.gerarHash(),
            nome: usuario.nome,
            email: usuario.email,
            senha: senhaCripto,
        };
        this.repositorio.inserir(novoUsuario);
        console.log(`\n\n ${JSON.stringify(novoUsuario)}`);
    }
}