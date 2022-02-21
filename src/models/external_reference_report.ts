import {ReportExternalReference} from './report_external_reference';

export interface ExternalReferenceReport {
    readonly entries_report_url: string;
    readonly from: string;
    readonly till: string;
    readonly total_hours: number;
    readonly total_hours_formatted: string;
    readonly external_references: ReportExternalReference[];
}
