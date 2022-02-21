export interface Alert {
    alerted_at: string;
    entry_id: number;
    id: number;
    is_resolved: boolean;
    resolved_at: string | null;
    type: string;
}
