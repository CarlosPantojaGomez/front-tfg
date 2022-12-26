import { Producto } from "./producto.interface";
import { Usuario } from "./usuario.interface";

export interface ProductComment {
    id?: number;
    text?: string;
    creator?: Usuario;
    product?: Producto;
    creationDate?: number;
}