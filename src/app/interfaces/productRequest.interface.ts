import { Producto } from "./producto.interface";

export interface ProductoRequest{
    product: Producto;
    mainImages?: any;
    profileImage?: any;
    file?: any;
}