import {EntryPurpose} from '../enums/entry_purpose';
import {FractionalFormat} from '../enums/fractional_format';
import {NumberFormat} from '../enums/number_format';
import {TimesheetTimes} from '../enums/timesheet_times';
import {TimesheetEntry} from '../models/timesheet_entry';

import {isSet} from './is_set';
import {Time} from './time';

export function entryFractialHours(entry: TimesheetEntry, type: TimesheetTimes, timeZone: string): number {
    //TODO, do we really want this? This is also how keeping.nl does it but keeping backend doesn't save seconds in the hour prop
    if (!entry.is_ongoing && isSet(entry.hours_only_confirmed) && entry.hours_only_confirmed !== 0) {
        return entry.hours_only_confirmed;
    }

    if (type === TimesheetTimes.TIMESHEET_TYPE_DAY_WITH_TIMES) {
        return Time.diff(
            isSet(entry.started_at) ? entry.started_at : '',
            isSet(entry.ended_at) ? entry.ended_at : null,
            timeZone,
        );
    } else {
        return (
            (isSet(entry.hours_only_confirmed) ? entry.hours_only_confirmed : 0) +
            (entry.is_ongoing && isSet(entry.started_last_ongoing_at)
                ? Time.diff(entry.started_last_ongoing_at, null, timeZone)
                : 0)
        );
    }
}

export function entryTime(
    entry: TimesheetEntry,
    type: TimesheetTimes,
    timeZone: string,
    fractionalFormat: FractionalFormat,
    numberFormat: NumberFormat,
): string | null {
    const frac = entryFractialHours(entry, type, timeZone);
    //If the time is insane large, something went wrong
    if (frac > 1000) {
        return '-';
    }
    return Time.hours(frac, fractionalFormat, numberFormat);
}

export function entriesTime(
    entries: TimesheetEntry[],
    type: TimesheetTimes,
    timeZone: string,
    fractionalFormat: FractionalFormat,
    numberFormat: NumberFormat,
    includeBreaks = false,
): string | null {
    const totalHours = entries
        .filter((entry) => includeBreaks || entry.purpose === EntryPurpose.WORK)
        .reduce((acc, cV) => acc + entryFractialHours(cV, type, timeZone), 0);

    //If the time is insane large, something went wrong
    if (totalHours > 1000) {
        return '-';
    }
    return Time.hours(totalHours, fractionalFormat, numberFormat);
}
