import { Task } from "./task.interface";
import { Usuario } from "./usuario.interface";

export interface TaskComment {
    id?: number;
    text?: string;
    creator?: Usuario;
    task?: Task;
    creationDate?: number;
}