import {AxiosDriver, getDefaultHeaders} from './driver/axios';
import {
    BreakTimesheetEntry,
    PartialTimesheetEntry,
    TimesheetEntry,
    WorkTimesheetEntry,
} from '../models/timesheet_entry';

import {Credentials} from '../models/credentials';
import {EntryPurpose} from '../enums/entry_purpose';
import {Organisation} from '../models/organisation';

export class EntryApi {
    constructor(private axiosDriver: AxiosDriver, private keepingApiUrl: string) {}

    public async fetchTimesheetForDay(
        organisation: Organisation,
        credentials: Credentials,
        day: Date,
    ): Promise<TimesheetEntry[]> {
        const defaultHeaders = await getDefaultHeaders(credentials);
        const date = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(
            day.getDate(),
        ).padStart(2, '0')}`;

        const result = await this.axiosDriver.get(`${this.keepingApiUrl}/users/${organisation.my_user_id}/entries`, {
            headers: defaultHeaders,
            params: {
                date: date,
            },
        });
        return result.data.entries as TimesheetEntry[];
    }

    public async saveTimesheetEntry(
        timesheetEntry: TimesheetEntry,
        credentials: Credentials,
    ): Promise<TimesheetEntry[]> {
        const defaultHeaders = await getDefaultHeaders(credentials);

        const result = await this.axiosDriver.post(`${this.keepingApiUrl}/users/${timesheetEntry.user_id}/entries`, {
            headers: defaultHeaders,
        });
        return result.data.entries as TimesheetEntry[];
    }

    public async editTimesheetEntry(
        timesheetEntry: PartialTimesheetEntry,
        credentials: Credentials,
    ): Promise<TimesheetEntry[]> {
        const defaultHeaders = await getDefaultHeaders(credentials);

        const result = await this.axiosDriver.put(
            `${this.keepingApiUrl}/users/${timesheetEntry.user_id}/entries/${timesheetEntry.id}`,
            timesheetToApiTimesheet(timesheetEntry),
            {headers: defaultHeaders},
        );
        return result.data.entries as TimesheetEntry[];
    }

    public async stopTimesheetEntry(
        timesheetEntry: TimesheetEntry,
        credentials: Credentials,
    ): Promise<TimesheetEntry[]> {
        const defaultHeaders = await getDefaultHeaders(credentials);

        const result = await this.axiosDriver.put(
            `${this.keepingApiUrl}/users/${timesheetEntry.user_id}/entries/${timesheetEntry.id}/stop`,
            null,
            {headers: defaultHeaders},
        );
        return result.data.entries as TimesheetEntry[];
    }

    public async resumeTimesheetEntry(
        timesheetEntry: TimesheetEntry,
        credentials: Credentials,
    ): Promise<TimesheetEntry[]> {
        const defaultHeaders = await getDefaultHeaders(credentials);

        const result = await this.axiosDriver.put(
            `${this.keepingApiUrl}/users/${timesheetEntry.user_id}/entries/${timesheetEntry.id}/resume`,
            null,
            {headers: defaultHeaders},
        );
        return result.data.entries as TimesheetEntry[];
    }

    public async deleteTimesheetEntry(
        timesheetEntry: TimesheetEntry,
        credentials: Credentials,
    ): Promise<TimesheetEntry[]> {
        const defaultHeaders = await getDefaultHeaders(credentials);

        const result = await this.axiosDriver.delete(
            `${this.keepingApiUrl}/users/${timesheetEntry.user_id}/entries/${timesheetEntry.id}`,
            {headers: defaultHeaders},
        );
        return result.data.entries as TimesheetEntry[];
    }
}

function timesheetToApiTimesheet(timesheetEntry: TimesheetEntry): WorkTimesheetEntry | BreakTimesheetEntry {
    switch (timesheetEntry.purpose) {
        case EntryPurpose.WORK:
            return {
                purpose: EntryPurpose.WORK,
                id: timesheetEntry.id,
                user_id: timesheetEntry.user_id,
                is_ongoing: timesheetEntry.is_ongoing,
                date: timesheetEntry.date,
                started_at: timesheetEntry.started_at,
                ended_at: timesheetEntry.ended_at,
                notes: timesheetEntry.notes,
                task_id: timesheetEntry.task_id,
                project_id: timesheetEntry.project_id,
                external_references: timesheetEntry.external_references,
            };
        case EntryPurpose.BREAK:
            return {
                purpose: EntryPurpose.BREAK,
                id: timesheetEntry.id,
                user_id: timesheetEntry.user_id,
                is_ongoing: timesheetEntry.is_ongoing,
                date: timesheetEntry.date,
                started_at: timesheetEntry.started_at,
                ended_at: timesheetEntry.ended_at,
                notes: timesheetEntry.notes,
            };
    }
}
