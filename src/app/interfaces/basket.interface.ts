import { Producto } from "./producto.interface";
import { Usuario } from "./usuario.interface";

export interface Basket{
    id?: number;
    amount?: number;
    user?: Usuario;
    products?: Array<Producto>;
}