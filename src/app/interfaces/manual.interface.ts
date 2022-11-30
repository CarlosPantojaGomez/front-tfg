import { FileEntity } from "./file.interface";
import { Producto } from "./producto.interface";

export interface ManualEntity{
    id?: number;
    name?: string;
    file?: FileEntity;
    product?: Producto;
}