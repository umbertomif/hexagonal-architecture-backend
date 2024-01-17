import CasoDeUso from "@/core/shared/CasoDeUso";
import Usuario from "../model/usuario";
import RepositorioUsuario from "./RepositorioUsuario";
import ProvedorCriptografia from "./ProvedorCriptografia";
import Erros from "@/core/shared/Erros";

export type Entrada = {
    email: string;
    senha: string;
};

export default class LoginUsuario implements CasoDeUso<Entrada, Usuario> {
    constructor(private repositorio: RepositorioUsuario, private provedorCripto: ProvedorCriptografia) {}

    async executar(entrada: Entrada): Promise<Usuario> {
        const usuarioExistente = await this.repositorio.buscarPorEmail(entrada.email);
        if (!usuarioExistente) throw new Error(Erros.USUARIO_NAO_EXISTENTE);

        const mesmaSenha = this.provedorCripto.comparar(entrada.senha, usuarioExistente.senha!);
        if (!mesmaSenha) throw new Error(Erros.SENHA_INCORRETA);
        return {
            ...usuarioExistente,
            senha: undefined,
        };
    }
}
