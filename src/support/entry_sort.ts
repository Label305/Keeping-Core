import {BaseTimesheetEntry} from '../models/timesheet_entry';
import {isSet} from './is_set';

export function sortEntries<TEntries extends BaseTimesheetEntry>(timesheetEntries: readonly TEntries[]): TEntries[] {
    return [...timesheetEntries]
        .sort((a, b) => {
            if (isSet(a.id) && isSet(b.id)) {
                return a.id - b.id;
            }
            return 0;
        })
        .sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
        .sort((a, b) => {
            if (isSet(a.started_at) && isSet(b.started_at)) {
                return new Date(a.started_at).valueOf() - new Date(b.started_at).valueOf();
            }
            return 0;
        });
}
