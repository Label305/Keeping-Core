import {Task} from './task';

export interface TaskAssignment {
    id: number;
    task: Task;
    project_id: number;
    task_id: number;
}
