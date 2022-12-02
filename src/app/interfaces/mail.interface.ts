import { Usuario } from "./usuario.interface";

export interface Mail{
    id?: number;
    subject: string;
    text: string;
    creationDate?:number;
    writer?:Usuario;
    writerName?:string;
    receiver?:Usuario;
    receiverName?:string;
    saw?: boolean;

}