import {DateTime, Settings} from 'luxon';

import {FractionalFormat} from '../enums/fractional_format';
import {NumberFormat} from '../enums/number_format';
import {TimeFormat} from '../enums/time_format';
import {isSet} from './is_set';

Settings.defaultLocale = isSet(window.navigator.language) ? navigator.language : 'nl';

export const setTimeOffset = (serverTimeMs?: number | null, roundTrip = 150) => {
    if (serverTimeMs === undefined || serverTimeMs === null || Math.abs(roundTrip) > 60 * 1000) {
        return;
    }

    const serverOffset = new Date(serverTimeMs).getTime() + roundTrip / 2 - Date.now();
    try {
        localStorage.setItem('last-server-offset', serverOffset + '');
    } catch (error) {
        // Noop
    }
    Settings.now = () => serverOffset + Date.now();
};

try {
    const lastServerOffset = localStorage.getItem('last-server-offset');
    const parsedLastServerOffset = parseInt(isSet(lastServerOffset) ? lastServerOffset : '', 10);
    if (!isNaN(parsedLastServerOffset)) {
        Settings.now = () => parsedLastServerOffset + Date.now();
    }
} catch (err) {
    Settings.now = () => Date.now();
}

/**
 * Format a fractional hour input to a string
 * @param fractionalHours
 * @returns {string}
 */
function formatHoursToHoursAndMinutes(fractionalHours: number): string {
    if (fractionalHours === null) {
        return '00:00';
    }

    let hours = Math.floor(fractionalHours);

    const fractionalMinutes = (fractionalHours % 1) * 60.0;
    let minutes = Math.floor(fractionalMinutes);

    const fractionalSeconds = (fractionalMinutes % 1) * 60.0;
    const seconds = Math.floor(fractionalSeconds);

    if (seconds >= 30) {
        minutes += 1.0;
    }
    if (minutes >= 60) {
        hours += 1.0;
        minutes = minutes % 60;
    }

    return hours + ':' + ('0' + minutes).slice(-2);
}

function formatDecimal(fractionalHours: number, numberFormat: NumberFormat): string {
    let ds = '.';
    let ts = ',';
    const x = 3;
    const n = 2;

    switch (numberFormat) {
        case NumberFormat.POINT_DECIMAL_COMMA_GROUP:
            ds = '.';
            ts = ',';
            break;
        case NumberFormat.COMMA_DECIMAL_POINT_GROUP:
            ds = ',';
            ts = '.';
            break;
        case NumberFormat.COMMA_DECIMAL_SPACE_GROUP:
            ds = ',';
            ts = ' ';
            break;
    }

    if (fractionalHours === null) {
        fractionalHours = 0;
    }

    const re = '\\d(?=(\\d{' + (isSet(x) ? x : 3) + '})+' + (n > 0 ? '\\D' : '$') + ')';
    const num = fractionalHours.toFixed(Math.max(0, Math.floor(n)));

    return (isSet(ds) ? num.replace('.', ds) : num).replace(new RegExp(re, 'g'), '$&' + (isSet(ts) ? ts : ','));
}

export function hours(
    fractionalHours: number,
    fractionalFormat: FractionalFormat,
    numberFormat: NumberFormat,
): string | null {
    switch (fractionalFormat) {
        case FractionalFormat.HOURS_AND_MINUTES:
            return formatHoursToHoursAndMinutes(fractionalHours);
        case FractionalFormat.DECIMAL:
            return formatDecimal(fractionalHours, numberFormat);
        default:
            console.warn('Unknown format type requested: ' + fractionalFormat);
    }
    return null;
}

export function time(date: string, timeZone: string, timeFormat: TimeFormat): string | null {
    switch (timeFormat) {
        case TimeFormat.TWENTY_FOUR_HOUR_CLOCK:
            return format(date, 'HH:mm', timeZone);
        case TimeFormat.TWELVE_HOUR_CLOCK:
            return format(date, 'hh:mm a', timeZone).toLowerCase();
        default:
            console.warn('Unknown format type requested: ' + timeFormat);
    }
    return null;
}

/**
 * Format a date input, corrected for UTC_OFFSET
 * @param date
 * @param format
 * @param timeZone TZ format
 * @return string
 */
export function format(date: string, format: string, timeZone: string): string {
    return date !== null ? DateTime.fromISO(date, {zone: timeZone}).toFormat(format) : '';
}

/**
 * Calculate the diff in fractionalhours between two dates
 * @param from
 * @param till
 * @param timeZone
 * @return number
 */
export function diff(from: string, till: string | null, timeZone: string): number {
    //if from and till are available we can simply use the native dates since these dates are ISO thus have timezone
    const f = new Date(from);
    const t = till === null ? now(timeZone) : new Date(till);
    const diffMs = t.valueOf() - f.valueOf();

    const diff = diffMs / 1000 / 60 / 60;

    return diff < 0 ? diff + 24 : diff;
}

/**
 * Get now formatted as ISO 8601 string
 * @return string
 */
export function now(timeZone: string): DateTime {
    return DateTime.local().setZone(timeZone);
}

/**
 * Transform time to full iso
 * @param time
 * @param timeZone
 * @return string|null
 */
export function fromTime(time: string | null, timeZone: string): string | null {
    if (time === null) {
        return null;
    }

    return DateTime.fromFormat(time, 'Hh:mm', {zone: timeZone}).toISO();
}
