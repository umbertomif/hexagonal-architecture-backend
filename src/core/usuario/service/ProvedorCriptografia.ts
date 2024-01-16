// Na arquitetura hexagonal esta interface eh uma porta
// A porta faz parte do core da sua aplicacao
export default interface ProvedorCriptografia {
    criptografar(texto: string): string;
}
