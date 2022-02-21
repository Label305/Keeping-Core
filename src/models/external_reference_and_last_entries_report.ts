import {ExternalReferenceReport} from './external_reference_report';
import {TimesheetEntry} from './timesheet_entry';

export interface ApiExRefAndLastEntriesReport {
    readonly entries: ReadonlyArray<TimesheetEntry>;
    readonly external_references_report: ExternalReferenceReport;
}

export interface ExRefAndLastEntriesReport extends ApiExRefAndLastEntriesReport {
    readonly exrefs: ReadonlyArray<string>;
}
