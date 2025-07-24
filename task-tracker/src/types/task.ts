export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskCategory = 'work' | 'personal' | 'shopping' | 'health' | 'education' | 'other';

export interface Task {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority?: TaskPriority;
    category?: TaskCategory;
    due_date?: string;
    created_at: string;
    updated_at?: string;
}

export interface CreateTaskInput {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    category?: TaskCategory;
    due_date?: string;
}

export interface UpdateTaskInput {
    id: string;
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    category?: TaskCategory;
    due_date?: string;
}
