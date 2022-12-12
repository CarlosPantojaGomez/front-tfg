import { Image } from "./image.interface";
import { Producto } from "./producto.interface";
import { Usuario } from "./usuario.interface";

export interface Noticia{
    id?: number;
    description: string;
    sortDescription: string;
    title: string;
    cardImage?:string;
    product?:Producto;
    creator?:Usuario;
    fecha?:number;
}