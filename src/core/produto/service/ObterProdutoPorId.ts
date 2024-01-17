import CasoDeUso from "@/core/shared/CasoDeUso";
import Produto from "../model/produto";

export default class ObterProdutoPorId implements CasoDeUso<String, Produto> {
    async executar(id: string): Promise<Produto> {
        return {
            id,
            nome: "Produto 1",
            preco: 10.0,
        };
    }
}
