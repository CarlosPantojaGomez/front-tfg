import { Project } from "./project.interface";

export interface Task {
    id?: number;
    name?: string;
    description?: string;
    priority?: number;
    state?: number;
    numHours?: number;
    project?: Project;
}