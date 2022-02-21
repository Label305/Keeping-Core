export enum WorkReferenceType {
    BASECAMP_1_TODO = 'basecamp_1_todo',
    BASECAMP_2_TODO = 'basecamp_2_todo',
    BASECAMP_3_TODO = 'basecamp_3_todo',
    TRELLO_CARD = 'trello_card',
    ASANA_TASK = 'asana_task',
    GITHUB_ISSUE = 'github_issue',
    // GITHUB_PULLREQUEST = 'github_pullrequest',
    JIRA_ISSUE = 'jira_issue',
    // TEAMWEEK_TASK = 'teamweek_task',
    TODOIST_TODO = 'todoist_todo',
}

export enum InvoiceReferenceType {
    MONEYBIRD_INVOICE = 'moneybird_invoice',
    EXACT_ONLINE_INVOICE = 'exact_online_invoice',
}

export type ReferenceType = WorkReferenceType | InvoiceReferenceType;
