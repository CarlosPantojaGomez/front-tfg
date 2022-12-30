import { Producto } from "./producto.interface";
import { Usuario } from "./usuario.interface";

export interface Bill{
    id?: number;
    saleDate?: Date;
    billNumber?: string;
    iva?: number;
    netValue?: number;
    grossValue?: number;
    cif?: string;
    companyName?: string;
    companyAddress?: string;
    address_line_1?: string;
    address_line_2?: string;
    admin_area_1?: string;
    admin_area_2?: string;
    country_code?: string;
    postal_code?: string;
    email_address?: string;
    name?: string;
    surname?: string;
    national_number?: string;
    user?: Usuario;
    products?: Array<Producto>;
}