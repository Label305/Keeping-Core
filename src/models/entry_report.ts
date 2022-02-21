import {TimesheetEntry} from './timesheet_entry';

export interface EntryReport {
    readonly entries: ReadonlyArray<TimesheetEntry>;
    readonly organisationId: number;
    readonly externalIdentifiers: ReadonlyArray<string>;
    readonly userIds?: ReadonlyArray<number>;
    readonly fromDate?: Date;
    readonly tillDate?: Date;
}
