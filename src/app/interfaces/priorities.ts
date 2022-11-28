export enum TaskPriority {
    Baja , 
    Media, 
    Alta 
}

export const PriorityLabelMapping: Record<TaskPriority, string> = {
    [TaskPriority.Baja]: "Baja",
    [TaskPriority.Media]: "Media",
    [TaskPriority.Alta]: "Alta",
}