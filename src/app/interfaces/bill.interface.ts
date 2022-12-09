import { Producto } from "./producto.interface";
import { Usuario } from "./usuario.interface";

export interface Bill{
    id?: number;
    saleDate: Date;
    iva: number;
    netValue: number;
    grossValue: number;
    companyName: string;
    cif: string;
    companyAddress: string;
    user: Usuario;
    product: Producto;
}