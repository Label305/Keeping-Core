import {
    ApiExRefAndLastEntriesReport,
    ExRefAndLastEntriesReport,
} from '../models/external_reference_and_last_entries_report';
import {AxiosDriver, getDefaultHeaders} from './driver/axios';

import {Credentials} from '../models/credentials';
import {EntryReport} from '../models/entry_report';
import {Organisation} from '../models/organisation';
import {TimesheetEntry} from '../models/timesheet_entry';
import {dateStr} from '../support/date';

export class ReportsApi {
    constructor(private axiosDriver: AxiosDriver, private keepingApiUrl: string) {}

    public async entriesReport(
        credentials: Credentials,
        organisation: Organisation,
        externalIdentifiers: readonly string[],
        userIds?: readonly number[],
        fromDate?: Date,
        tillDate?: Date,
    ): Promise<EntryReport> {
        const defaultHeaders = await getDefaultHeaders(credentials);
        const from = fromDate ? dateStr(fromDate) : undefined;
        const till = tillDate ? dateStr(tillDate) : undefined;
        const selecting = from === undefined && till === undefined ? 'all' : undefined;
        const users = userIds ? [...new Set(userIds)].join(',') : undefined;
        const exrefs = [...new Set(externalIdentifiers)].join(',');

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
    }

    public async exRefAndLastEntriesReport(
        credentials: Credentials,
        organisation: Organisation,
        externalIdentifiers: readonly string[],
        userIds?: readonly number[],
        fromDate?: Date,
        tillDate?: Date,
    ): Promise<ExRefAndLastEntriesReport> {
        const defaultHeaders = await getDefaultHeaders(credentials);
        const from = fromDate ? dateStr(fromDate) : undefined;
        const till = tillDate ? dateStr(tillDate) : undefined;
        const selecting = from === undefined && till === undefined ? 'all' : undefined;
        const users = userIds ? [...new Set(userIds)].join(',') : undefined;
        const exrefs = [...new Set(externalIdentifiers)];

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
    }
}
