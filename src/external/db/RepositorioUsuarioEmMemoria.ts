import Usuario from "../../core/usuario/model/usuario";

export default class RepositorioEmMemoria {
    private static readonly items: Usuario[] = [];

    async inserir(usuario: Usuario) {
        const items = RepositorioEmMemoria.items;
        const usuarioExistente = await this.buscarPorEmail(usuario.email);
        if (usuarioExistente) return;
        items.push(usuario);
    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        const items = RepositorioEmMemoria.items;
        return items.find((u) => u.email === email) ?? null;
    }
}
