import { Express } from "express";
import ObterProdutoPorId from "@/core/produto/service/ObterProdutoPorId";
import UsuarioMiddleware from "./UsuarioMiddleware";

export default class ObterProdutoPorIdController {
    constructor(servidor: Express, casoDeUso: ObterProdutoPorId, ...middlewares: any[]) {
        servidor.get("/api/produtos/:id", ...middlewares, async (req, resp) => {
            try {
                const id = (req as any).params.id;
                const produto = await casoDeUso.executar(id);
                resp.status(200).send(produto);
            } catch (erro: any) {
                resp.status(400).send(erro.message);
            }
        });
    }
}
