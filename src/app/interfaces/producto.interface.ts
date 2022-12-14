import { FileEntity } from "./file.interface";
import { Image } from "./image.interface";
import { ManualEntity } from "./manual.interface";
import { ProductoRate } from "./ProductRate.interface";

export interface Producto{
    id?: number;
    name?: string;
    description?: string;
    sortDescription?: string;
    forSale?: boolean;
    features?: string;
    price?: number;
    rating?: number;
    file?: FileEntity;
    profileImage?: Image;
    images?: Array<Image>;
    manuals?: Array<ManualEntity>;
    rates?: Array<ProductoRate>;
}