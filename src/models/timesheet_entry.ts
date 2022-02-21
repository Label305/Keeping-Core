import {EntryPurpose} from '../enums/entry_purpose';

import {Alert} from './alert';
import {ExternalReference} from './external_reference';
import {Project} from './project';
import {Task} from './task';

export interface BaseTimesheetEntry {
    id?: number;
    user_id: number;
    is_ongoing: boolean;
    purpose: EntryPurpose;
    date: string;
    started_at?: string;
    ended_at?: string;
    notes?: string;
}

export interface BaseKeepingTimesheetEntry extends BaseTimesheetEntry {
    is_overlapping?: boolean;
    is_internal_overlapping?: boolean;
    is_locked?: boolean;
    is_start_overlapping?: boolean;
    is_end_overlapping?: boolean;
    hours?: number;
    hours_with_ongoing?: number;
    hours_only_confirmed?: number;
    started_last_ongoing_at?: string | null;
    alerts?: Alert[];
}

export interface WorkTimesheetEntry extends BaseKeepingTimesheetEntry {
    purpose: EntryPurpose.WORK;
    task_id?: number;
    project_id?: number;
    project?: Project;
    task?: Task;
    external_references?: ExternalReference[];
}

export interface BreakTimesheetEntry extends BaseKeepingTimesheetEntry {
    purpose: EntryPurpose.BREAK;
}

export type TimesheetEntry = WorkTimesheetEntry | BreakTimesheetEntry;

export type PartialTimesheetEntry = BaseTimesheetEntry & Partial<TimesheetEntry>;
