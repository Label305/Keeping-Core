import {InvoiceReferenceType, ReferenceType, WorkReferenceType} from '../enums/reference_type';

export function humanReadableReferenceType(type: ReferenceType): string {
    switch (type) {
        case WorkReferenceType.BASECAMP_1_TODO: {
            return 'Basecamp Classic';
        }
        case WorkReferenceType.BASECAMP_2_TODO: {
            return 'Basecamp 2';
        }
        case WorkReferenceType.BASECAMP_3_TODO: {
            return 'Basecamp 3';
        }
        case WorkReferenceType.TRELLO_CARD: {
            return 'Trello';
        }
        case WorkReferenceType.ASANA_TASK: {
            return 'Asana';
        }
        case WorkReferenceType.GITHUB_ISSUE: {
            return 'GitHub';
        }
        case WorkReferenceType.JIRA_ISSUE: {
            return 'Jira';
        }
        case WorkReferenceType.TODOIST_TODO: {
            return 'Todoist';
        }
        case InvoiceReferenceType.MONEYBIRD_INVOICE: {
            return 'Moneybird';
        }
        case InvoiceReferenceType.EXACT_ONLINE_INVOICE: {
            return 'Exact Online';
        }
    }
}

export function isInvoiceReferenceType(type: ReferenceType): type is InvoiceReferenceType {
    return Object.values(InvoiceReferenceType).some((irf) => type === irf);
}

export function isWorkReferenceType(type: ReferenceType): type is WorkReferenceType {
    return Object.values(WorkReferenceType).some((wrt) => type === wrt);
}

interface ExternalReferenceBase {
    readonly id?: number;
    readonly type: ReferenceType;
    readonly external_identifier: string;
    readonly name: string;
    readonly url: string;
    readonly meta: Record<string, unknown>;
}

interface WorkExternalReference extends ExternalReferenceBase {
    readonly type: WorkReferenceType;
}

interface InvoiceExternalReference extends ExternalReferenceBase {
    readonly type: InvoiceReferenceType;
    readonly attributed_revenue: number;
    readonly invoice_id: number;
}

export type ExternalReference = WorkExternalReference | InvoiceExternalReference;
