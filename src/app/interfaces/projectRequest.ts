import { Producto } from "./producto.interface";
import { Project } from "./project.interface";

export interface ProjectRequest{
    project: Project;
    product: Producto;
}