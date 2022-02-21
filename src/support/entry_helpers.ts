import {EntryPurpose} from '../enums/entry_purpose';
import {BreakTimesheetEntry, TimesheetEntry, WorkTimesheetEntry} from '../models/timesheet_entry';
import {isSet} from './is_set';

export function isWorkEntry(entry?: TimesheetEntry): entry is WorkTimesheetEntry {
    return isSet(entry) && entry.purpose === EntryPurpose.WORK;
}

export function isBreakEntry(entry?: TimesheetEntry): entry is BreakTimesheetEntry {
    return isSet(entry) && entry.purpose === EntryPurpose.BREAK;
}

export function getProjectId(entry?: TimesheetEntry) {
    return isWorkEntry(entry) ? entry.project_id : undefined;
}

export function getTaskId(entry?: TimesheetEntry) {
    return isWorkEntry(entry) ? entry.task_id : undefined;
}

export function getProject(entry?: TimesheetEntry) {
    return isWorkEntry(entry) ? entry.project : undefined;
}

export function getTask(entry?: TimesheetEntry) {
    return isWorkEntry(entry) ? entry.task : undefined;
}

export function getExternalReferences(entry?: TimesheetEntry) {
    return isWorkEntry(entry) ? entry.external_references : undefined;
}

export function duplicateEntry(
    entry: TimesheetEntry,
    extraProps?: Partial<TimesheetEntry>,
): WorkTimesheetEntry | BreakTimesheetEntry {
    return {
        ...entry,
        ...extraProps,
    };
}

export function onlyWorkEntries(entries: readonly TimesheetEntry[]): WorkTimesheetEntry[] {
    return entries.filter((e): e is WorkTimesheetEntry => isWorkEntry(e));
}
