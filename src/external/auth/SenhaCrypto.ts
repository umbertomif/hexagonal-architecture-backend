import ProvedorCriptografia from "../../core/usuario/service/ProvedorCriptografia";
import bcrypt from "bcrypt";

// Na arquitetura hexagonal esta classe eh um Adaptador
// O Adaptador nao faz parte do core da sua aplicacao
export default class SenhaCrypto implements ProvedorCriptografia {
    criptografar(senha: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(senha, salt);
    }
}
