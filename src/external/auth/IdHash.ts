import Id from "@/core/shared/Id";
import { v4 as uuid } from "uuid";

export default class IdHash implements Id {
    gerarHash(): string {
        return uuid();
    }
}
