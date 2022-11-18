import { Image } from "./image.interface";

export interface Noticia{
    id$?: number;
    description: string;
    sortDescription: string;
    title: string;
    cardImage:Image;
    fecha?:number;
}