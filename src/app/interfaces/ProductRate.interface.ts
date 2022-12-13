import { Producto } from "./producto.interface";
import { Usuario } from "./usuario.interface";

export interface ProductoRate{
    id?: number;
    rate?: number;
    product?: Producto;
    rater?: Usuario;
}