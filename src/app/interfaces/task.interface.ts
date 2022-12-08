import { Activity } from "./Activity.interface";
import { Image } from "./image.interface";
import { Project } from "./project.interface";
import { TaskComment } from "./taskComment.interface";
import { Usuario } from "./usuario.interface";

export interface Task {
    id?: number;
    name?: string;
    description?: string;
    priority?: number;
    state?: number;
    numHours?: number;
    project?: Project;
    comments?: Array<TaskComment>;
    activities?: Array<Activity>;
    creator?: Usuario;
    assignedUsers?: Array<Usuario>;
    creationDate?: Date;
    startDate?: Date;
    endDate?: Date;
    images?: Array<Image>;
}