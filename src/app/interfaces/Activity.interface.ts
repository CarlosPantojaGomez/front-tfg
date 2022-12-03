import { Mail } from "./mail.interface";
import { Producto } from "./producto.interface";
import { Project } from "./project.interface";
import { Task } from "./task.interface";
import { Usuario } from "./usuario.interface";

export interface Activity{
    id: number;
    action?: string;
    activityDate?: number;
    assignedUsers?: Array<Usuario>;
    creator?: Usuario;
    product?: Producto;
    task?: Task;
    project?: Project;
    mail?: Mail;
    object: string;
}