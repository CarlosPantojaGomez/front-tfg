import { Producto } from "./producto.interface";
import { Usuario } from "./usuario.interface";

export interface Noticia{
    id?: number;
    description: string;
    sortDescription: string;
    title: string;
    cardImage?:string;
    productsRelated?: Array<Producto>;
    creator?:Usuario;
    fecha?:number;
}