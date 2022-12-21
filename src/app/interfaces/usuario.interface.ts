import { Basket } from "./basket.interface";
import { Producto } from "./producto.interface";
import { Project } from "./project.interface";
import { Task } from "./task.interface";

export interface Usuario{
    id?: number;
    name?: string;
    firstLastName?: string;
    secondLastName?: string;
    email?: string;
    nickname?: string;
    password?: string;
    userType?: number;
    tlf?: number;
    city?: string;
    address?: string;
    zipcode?: number;
    profilePicture?: string;
    flagActive?: number;
    assignedTasks?: Array<Task>;
    projectsAssigned?: Array<Project>;
    productsBought?: Array<Producto>;
    basket?: Basket;
}