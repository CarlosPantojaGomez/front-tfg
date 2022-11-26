import { FileEntity } from "./file.interface";
import { Image } from "./image.interface";
import { Producto } from "./producto.interface";

export interface ProductoRequest{
    product: Producto;
    mainImages?: Image[];
    profileImage?: Image;
    file?: FileEntity;
    manuals?: FileEntity[];
}