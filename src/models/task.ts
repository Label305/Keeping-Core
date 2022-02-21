export interface Task {
    id: number;
    name: string;
    code: string | null;
    is_archived: boolean;
    is_default_selected_for_user?: boolean;
    will_be_assigned_to_new_projects: boolean;
    archived_at: string | null;
    organisation_id: number;
}
