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

export enum TaskState {
    Todo , 
    Development, 
    ToTest, 
    Done 
}

export const StateLabelMapping: Record<TaskState, string> = {
    [TaskState.Todo]: "Para desarrollar",
    [TaskState.Development]: "En desarrollo",
    [TaskState.ToTest]: "Lista para verificar",
    [TaskState.Done]: "Completada"
}