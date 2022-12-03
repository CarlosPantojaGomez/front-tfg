import { Activity } from "./Activity.interface";
import { Producto } from "./producto.interface";
import { Task } from "./task.interface";
import { Usuario } from "./usuario.interface";

export interface Project{
    id: number;
    name?: string;
    description?: string;
    priority?: number;
    tasks?: Array<Task>;
    product?: Producto;
    creator?: Usuario;
    usersRelated?: Array<Usuario>;
    activities?: Array<Activity>;
}