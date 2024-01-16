import ProvedorCriptografia from "../../core/usuario/service/ProvedorCriptografia";

// Na arquitetura hexagonal esta classe eh um Adaptador
// O Adaptador nao faz parte do core da sua aplicacao
export default class EspacoSenhaCrypto implements ProvedorCriptografia {
    criptografar(senha: string): string {
        return senha.split("").join(" ");
    }
}
