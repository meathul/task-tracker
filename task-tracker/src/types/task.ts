export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    created_at: string;
}

export interface CreateTaskInput {
    title: string;
    description?: string;
    status?: TaskStatus;
}

export interface UpdateTaskInput {
    id: string;
    title?: string;
    description?: string;
    status?: TaskStatus;
}
