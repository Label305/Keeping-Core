import {ReferenceType} from '../enums/reference_type';

export interface ReportExternalReference {
    readonly external_identifier: string;
    readonly type: ReferenceType;
    readonly name: string;
    readonly url: string;
    readonly meta: Record<string, unknown>;
    readonly hours: number;
    readonly hours_formatted: string;
    readonly entries_report_url: string;
}
