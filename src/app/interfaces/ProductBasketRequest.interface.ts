import { Producto } from "./producto.interface";
import { Usuario } from "./usuario.interface";

export interface ProductoBasketRequest{
    product: Producto;
    user?: Usuario;
}