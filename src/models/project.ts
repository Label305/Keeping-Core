import {Client} from './client';
import {TaskAssignment} from './task_assignment';

export interface Project {
    id: number;
    name: string;
    code: string | null;
    is_archived: boolean;
    archived_at: string | null;
    organisation_id: number;
    client?: Client;
    client_id: number | null;
    task_assignments: TaskAssignment[];
    is_default_selected_for_user?: boolean;
    default_task_id_for_user?: number;
}
