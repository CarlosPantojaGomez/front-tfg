import { Producto } from "./producto.interface";
import { Task } from "./task.interface";

export interface Project{
    id: number;
    name?: string;
    description?: string;
    priority?: number;
    tasks?: Array<Task>;
    product?: Producto;
}