export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

export interface Project {
    id: number;
    name: string;
    tasks: Task[];
}
