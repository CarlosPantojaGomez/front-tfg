import { Basket } from "./basket.interface";

export interface PurchaseRequest {
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
    basket?: Basket;
}