import {Project} from './project';
import {Task} from './task';

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    last_name_for_sorting: string;
    code: string | null;
    role: string;
    state: string;
    avatar_url: string | null;
    avatar_initials: string;
    organisation_id: number;
    user_account_id: number;
    name: string;
    active_projects?: Project[];
    active_tasks?: Task[];
}
