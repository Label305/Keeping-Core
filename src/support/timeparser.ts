import {DateTime, Settings} from 'luxon';

import {isSet} from './is_set';

Settings.defaultLocale = isSet(navigator.language) ? navigator.language : 'nl';

function getFormattedTimeString(timeString: string): string | null {
    const str = removeAllUnneededChars(timeString);
    if (str.indexOf(' ') === -1) {
        return splitAfterHours(str);
    }
    return str;
}

function removeAllUnneededChars(str: string): string {
    let result = str.replace('am', '');
    result = result.replace('pm', '');
    result = result.replace(/[^0-9\-: ]/, '');
    result = result.replace(/:/g, ' ');
    result = result.replace(/\s+/g, ' ');
    result = result.trim();
    return result;
}

function splitAfterHours(timeString: string): string | null {
    switch (timeString.length) {
        case 1:
        case 2:
            return timeString + ' 00';
        case 3:
            return getSplittedStringFromTimeStringLengthThree(timeString);
        case 4:
            return timeString.substring(0, 2) + ' ' + timeString.substring(2);
    }
    return null;
}

function getSplittedStringFromTimeStringLengthThree(timeString: string): string {
    const minutes = parseInt(timeString.substring(timeString.length - 2), 10);
    if (minutes <= 60 && minutes >= 0) {
        return '0' + timeString.substring(0, 1) + ' ' + timeString.substring(1);
    } else {
        return '0' + timeString.substring(0, 2) + ' ' + timeString.substring(2);
    }
}

function getHours(hours: string, isPM: boolean, isAM: boolean): number {
    if (isPM === true && parseInt(hours, 10) < 12) {
        return parseInt(hours, 10) + 12;
    } else if (isAM === true && parseInt(hours, 10) === 12) {
        return 0;
    }
    return parseInt(hours, 10);
}

function getMinutes(minutes: string): number {
    if (minutes.length === 1) {
        return parseInt(minutes, 10) * 10;
    }
    return parseInt(minutes, 10);
}

function trim(str: string, chars: string[]): string {
    let flag = false;
    if (chars.indexOf(str[0]) !== -1) {
        flag = true;
        str = str.substring(1);
    }
    if (chars.indexOf(str[str.length - 1]) !== -1) {
        flag = true;
        str = str.substring(0, str.length - 1);
    }

    return flag ? trim(str, chars) : str;
}

function normalize(str: string): string {
    const result = str.replace('::', ':').replace('  ', ' ').replace(',', '.');

    return result === str ? result : normalize(result);
}

function parseSplittedTimeHourString(a: string, b: string): number | null {
    const hours = parseHourString(a);
    let minutes = parseHourString(b);
    if (minutes !== null && b.length === 1) {
        minutes *= 10;
    }

    if (hours === null && minutes === null) {
        return null;
    } else if (hours === null && minutes !== null && parseFloat(String(minutes)) < 60) {
        return minutes / 60;
    } else if (minutes === null) {
        return hours;
    }

    return parseFloat(String(minutes)) < 60 ? (isSet(hours) ? hours : 0) + minutes / 60 : null;
}

/**
 * Accepts user formatted hour string
 * @param hourString
 */
export function parseHourString(hourString: string): number | null {
    hourString = trim(hourString, [' ', ':']);
    hourString = normalize(hourString);

    if (hourString === '') {
        return null;
    }

    //if hourstring with leading zeros removed is the same e.g. if `04` return `4`
    if (hourString.endsWith(String(parseInt(hourString, 10)))) {
        return parseInt(hourString, 10);
    }

    const colonSeparated = hourString.split(':');
    if (colonSeparated.length >= 2) {
        return parseSplittedTimeHourString(colonSeparated[0], colonSeparated[1]);
    }

    const spaceSeparated = hourString.split(' ');
    if (spaceSeparated.length >= 2) {
        return parseSplittedTimeHourString(spaceSeparated[0], spaceSeparated[1]);
    }

    return String(parseFloat(hourString)) === hourString ? parseFloat(hourString) : null;
}

/**
 * Accepts all String inputs, and tries to format them,
 * Returns false when the time cannot be formatted.
 * It is also possible to declare a timezoneOffset,
 * You should use the moment.js Z timezone format for this.
 * @param timeString
 * @returns Moment|null
 */
export function parseTimeString(timeString: string, timeZone: string): DateTime | null {
    if (typeof timeString !== 'string') {
        return null;
    }

    let str: string | null = timeString.toLowerCase();

    const isAM = str.indexOf('a') > -1;
    const isPM = str.indexOf('p') > -1;
    if (isAM && isPM) {
        //Both am and pm
        return null;
    }

    str = getFormattedTimeString(str);
    if (typeof str === 'undefined' || str === null) {
        //Invalid format
        return null;
    }

    const exploded = str.split(' ');

    let hour = getHours(exploded[0], isPM, isAM);
    let minute = getMinutes(exploded[1]);
    if (isNaN(hour) || isNaN(minute)) {
        return null;
    }
    if (minute === 60) {
        hour++;
        minute = 0;
    }
    if (hour > 24 || (hour > 12 && isAM)) {
        return null;
    }
    if (minute > 60) {
        return null;
    }

    return DateTime.fromObject({hour, minute}, {zone: timeZone});
}
