import {Organisation} from '../models/organisation';
import {TimesheetEntry} from '../models/timesheet_entry';
import {getDefaultHeaders, axiosErrorHandler, AxiosDriver} from './driver/axios';
import {EntryReport} from '../models/entry_report';
import {dateStr} from '../support/date';
import {
    ApiExRefAndLastEntriesReport,
    ExRefAndLastEntriesReport,
} from '../models/external_reference_and_last_entries_report';
import {Credentials} from '../models/credentials';
import {ErrorMessages} from '../models/error_messages';

export class ReportsApi {
    constructor(
        private axiosDriver: AxiosDriver,
        private keepingApiUrl: string,
        private errorMessages: ErrorMessages,
    ) {}

    public async entriesReport(
        credentials: Credentials | undefined,
        organisation: Organisation,
        externalIdentifiers: readonly string[],
        userIds?: readonly number[],
        fromDate?: Date,
        tillDate?: Date,
    ): Promise<EntryReport> {
        const defaultHeaders = await getDefaultHeaders(credentials, this.errorMessages);
        const from = fromDate ? dateStr(fromDate) : undefined;
        const till = tillDate ? dateStr(tillDate) : undefined;
        const selecting = from === undefined && till === undefined ? 'all' : undefined;
        const users = userIds ? [...new Set(userIds)].join(',') : undefined;
        const exrefs = [...new Set(externalIdentifiers)].join(',');

        try {
            const response = await this.axiosDriver.get<{entries: TimesheetEntry[]}>(
                `${this.keepingApiUrl}/organisations/${organisation.id}/entries-report`,
                {
                    params: {
                        timesheet_entries: true,
                        exrefs,
                        users,
                        from,
                        till,
                        selecting,
                    },
                    headers: defaultHeaders,
                },
            );
            const payload: EntryReport = {
                entries: response.data.entries,
                organisationId: organisation.id,
                externalIdentifiers,
                userIds,
                fromDate: undefined,
                tillDate: undefined,
            };
            return payload;
        } catch (error) {
            throw axiosErrorHandler(error, this.errorMessages);
        }
    }

    public async exRefAndLastEntriesReport(
        credentials: Credentials | undefined,
        organisation: Organisation,
        externalIdentifiers: readonly string[],
        userIds?: readonly number[],
        fromDate?: Date,
        tillDate?: Date,
    ): Promise<ExRefAndLastEntriesReport> {
        const defaultHeaders = await getDefaultHeaders(credentials, this.errorMessages);
        const from = fromDate ? dateStr(fromDate) : undefined;
        const till = tillDate ? dateStr(tillDate) : undefined;
        const selecting = from === undefined && till === undefined ? 'all' : undefined;
        const users = userIds ? [...new Set(userIds)].join(',') : undefined;
        const exrefs = [...new Set(externalIdentifiers)];

        try {
            const response = await this.axiosDriver.get<ApiExRefAndLastEntriesReport>(
                `${this.keepingApiUrl}/organisations/${organisation.id}/combined-external-references-last-entries-report`,
                {
                    params: {
                        timesheet_entries: true,
                        exrefs: exrefs.join(','),
                        users,
                        from,
                        till,
                        selecting,
                    },
                    headers: defaultHeaders,
                },
            );
            return {...response.data, exrefs};
        } catch (error) {
            throw axiosErrorHandler(error, this.errorMessages);
        }
    }
}
