import {Organisation} from '../models/organisation';
import {
    BreakTimesheetEntry,
    PartialTimesheetEntry,
    TimesheetEntry,
    WorkTimesheetEntry,
} from '../models/timesheet_entry';
import {Axios, getDefaultHeaders, axiosErrorHandler} from './driver/axios';
import {EntryPurpose} from '../enums/entry_purpose';
import {Credentials} from '../models/credentials';
import {ErrorMessages} from '../models/error_messages';

export class EntryApi {
    constructor(private keepingApiUrl: string, private errorMessages: ErrorMessages) {}

    public async fetchTimesheetForToday(
        organisation: Organisation,
        credentials?: Credentials,
    ): Promise<TimesheetEntry[]> {
        const defaultHeaders = await getDefaultHeaders(credentials, this.errorMessages);

        try {
            const result = await Axios.get(`${this.keepingApiUrl}/users/${organisation.my_user_id}/entries`, {
                headers: defaultHeaders,
            });
            return result.data.entries as TimesheetEntry[];
        } catch (error) {
            throw axiosErrorHandler(error, this.errorMessages);
        }
    }

    public async saveTimesheetEntry(
        timesheetEntry: TimesheetEntry,
        credentials?: Credentials,
    ): Promise<TimesheetEntry[]> {
        const defaultHeaders = await getDefaultHeaders(credentials, this.errorMessages);

        try {
            const result = await Axios.post(`${this.keepingApiUrl}/users/${timesheetEntry.user_id}/entries`, {
                headers: defaultHeaders,
            });
            return result.data.entries as TimesheetEntry[];
        } catch (error) {
            throw axiosErrorHandler(error, this.errorMessages);
        }
    }

    public async editTimesheetEntry(
        timesheetEntry: PartialTimesheetEntry,
        credentials?: Credentials,
    ): Promise<TimesheetEntry[]> {
        const defaultHeaders = await getDefaultHeaders(credentials, this.errorMessages);

        try {
            const result = await Axios.put(
                `${this.keepingApiUrl}/users/${timesheetEntry.user_id}/entries/${timesheetEntry.id}`,
                timesheetToApiTimesheet(timesheetEntry),
                {headers: defaultHeaders},
            );
            return result.data.entries as TimesheetEntry[];
        } catch (error) {
            throw axiosErrorHandler(error, this.errorMessages);
        }
    }

    public async stopTimesheetEntry(
        timesheetEntry: TimesheetEntry,
        credentials?: Credentials,
    ): Promise<TimesheetEntry[]> {
        const defaultHeaders = await getDefaultHeaders(credentials, this.errorMessages);

        try {
            const result = await Axios.put(
                `${this.keepingApiUrl}/users/${timesheetEntry.user_id}/entries/${timesheetEntry.id}/stop`,
                null,
                {headers: defaultHeaders},
            );
            return result.data.entries as TimesheetEntry[];
        } catch (error) {
            throw axiosErrorHandler(error, this.errorMessages);
        }
    }

    public async resumeTimesheetEntry(
        timesheetEntry: TimesheetEntry,
        credentials?: Credentials,
    ): Promise<TimesheetEntry[]> {
        const defaultHeaders = await getDefaultHeaders(credentials, this.errorMessages);

        try {
            const result = await Axios.put(
                `${this.keepingApiUrl}/users/${timesheetEntry.user_id}/entries/${timesheetEntry.id}/resume`,
                null,
                {headers: defaultHeaders},
            );
            return result.data.entries as TimesheetEntry[];
        } catch (error) {
            throw axiosErrorHandler(error, this.errorMessages);
        }
    }

    public async deleteTimesheetEntry(
        timesheetEntry: TimesheetEntry,
        credentials?: Credentials,
    ): Promise<TimesheetEntry[]> {
        const defaultHeaders = await getDefaultHeaders(credentials, this.errorMessages);

        try {
            const result = await Axios.delete(
                `${this.keepingApiUrl}/users/${timesheetEntry.user_id}/entries/${timesheetEntry.id}`,
                {headers: defaultHeaders},
            );
            return result.data.entries as TimesheetEntry[];
        } catch (error) {
            throw axiosErrorHandler(error, this.errorMessages);
        }
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
