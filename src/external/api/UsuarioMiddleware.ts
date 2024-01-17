import { Request, Response, NextFunction } from "express";
import ProvedorJwt from "./ProvedorJwt";
import RepositorioUsuario from "@/core/usuario/service/RepositorioUsuario";
import Usuario from "@/core/usuario/model/usuario";

export default function UsuarioMiddleware(repositorio: RepositorioUsuario) {
    return async (req: Request, resp: Response, next: NextFunction) => {
        const token = req.headers.authorization?.replace("Bearer", "");
        if (!token) {
            return resp.status(403).send("Token invalido");
        }
        const provedorJwt = new ProvedorJwt(process.env.JWT_SECRET!);
        const usuarioToken = provedorJwt.obter(token) as Usuario;
        const usuario = repositorio.buscarPorEmail(usuarioToken.email);
        if (!usuario) {
            return resp.status(403).send("Token invalido");
        }
        (req as any).usuario = usuario;
        next();
    };
}
