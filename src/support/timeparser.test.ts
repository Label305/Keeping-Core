/**
 * @jest-environment jsdom
 */

import * as TimeParser from './timeparser';

describe('TimeParser', function () {
    describe('parseTimeString', function () {
        it('should parse 800', function () {
            const result = TimeParser.parseTimeString('800', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour as number).toBe(8);
            expect(result?.minute as number).toBe(0);
        });

        it('should parse 860', function () {
            const result = TimeParser.parseTimeString('860', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(9);
            expect(result?.minute).toBe(0);
        });

        it('should parse 903', function () {
            const result = TimeParser.parseTimeString('903', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(9);
            expect(result?.minute).toBe(3);
        });

        it('should parse 0904', function () {
            const result = TimeParser.parseTimeString('0904', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(9);
            expect(result?.minute).toBe(4);
        });

        it('should parse 1310', function () {
            const result = TimeParser.parseTimeString('1310', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(13);
            expect(result?.minute).toBe(10);
        });

        it('should parse 131', function () {
            const result = TimeParser.parseTimeString('131', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(1);
            expect(result?.minute).toBe(31);
        });

        it('should parse 13:1', function () {
            const result = TimeParser.parseTimeString('13:1', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(13);
            expect(result?.minute).toBe(10);
        });

        it('should parse 13:01', function () {
            const result = TimeParser.parseTimeString('13:01', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(13);
            expect(result?.minute).toBe(1);
        });

        it('should parse 13::01', function () {
            const result = TimeParser.parseTimeString('13::01', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(13);
            expect(result?.minute).toBe(1);
        });

        it('should parse 13:::01', function () {
            const result = TimeParser.parseTimeString('13:::01', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(13);
            expect(result?.minute).toBe(1);
        });

        it('should parse 2:3:04', function () {
            const result = TimeParser.parseTimeString('2:3:04', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(2);
            expect(result?.minute).toBe(30);
        });

        it('should parse 2:03:04', function () {
            const result = TimeParser.parseTimeString('2:03:04', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(2);
            expect(result?.minute).toBe(3);
        });

        it('should parse 13   01', function () {
            const result = TimeParser.parseTimeString('13   01', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(13);
            expect(result?.minute).toBe(1);
        });

        /**AM PM TESTS**/
        it('should parse 12pm', function () {
            const result = TimeParser.parseTimeString('12pm', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(12);
            expect(result?.minute).toBe(0);
        });

        it('should parse 12am', function () {
            const result = TimeParser.parseTimeString('12am', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(0);
            expect(result?.minute).toBe(0);
        });

        it('should parse 1am', function () {
            const result = TimeParser.parseTimeString('1am', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(1);
            expect(result?.minute).toBe(0);
        });

        it('should parse 1pm', function () {
            const result = TimeParser.parseTimeString('1pm', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(13);
            expect(result?.minute).toBe(0);
        });

        it('should parse 10am', function () {
            const result = TimeParser.parseTimeString('10am', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(10);
            expect(result?.minute).toBe(0);
        });

        it('should parse 11pm', function () {
            const result = TimeParser.parseTimeString('11pm', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(23);
            expect(result?.minute).toBe(0);
        });

        it('should parse 1AM', function () {
            const result = TimeParser.parseTimeString('1AM', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(1);
            expect(result?.minute).toBe(0);
        });

        it('should parse 1PM', function () {
            const result = TimeParser.parseTimeString('1PM', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(13);
            expect(result?.minute).toBe(0);
        });

        it('should parse 1:00am', function () {
            const result = TimeParser.parseTimeString('1:00am', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(1);
            expect(result?.minute).toBe(0);
        });

        it('should parse 1:00pm', function () {
            const result = TimeParser.parseTimeString('1:00pm', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(13);
            expect(result?.minute).toBe(0);
        });

        it('should parse 1:0am', function () {
            const result = TimeParser.parseTimeString('1:0am', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(1);
            expect(result?.minute).toBe(0);
        });

        it('should parse 1:0pm', function () {
            const result = TimeParser.parseTimeString('1:0pm', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(13);
            expect(result?.minute).toBe(0);
        });

        it('should parse 0100am', function () {
            const result = TimeParser.parseTimeString('0100am', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(1);
            expect(result?.minute).toBe(0);
        });

        it('should parse 0100pm', function () {
            const result = TimeParser.parseTimeString('0100pm', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(13);
            expect(result?.minute).toBe(0);
        });

        it('should parse 01:00am', function () {
            const result = TimeParser.parseTimeString('01:00am', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(1);
            expect(result?.minute).toBe(0);
        });

        it('should parse 01:00pm', function () {
            const result = TimeParser.parseTimeString('01:00pm', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(13);
            expect(result?.minute).toBe(0);
        });

        it('should parse 01:0am', function () {
            const result = TimeParser.parseTimeString('01:0am', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(1);
            expect(result?.minute).toBe(0);
        });

        it('should parse 01:0pm', function () {
            const result = TimeParser.parseTimeString('01:0pm', 'utc');

            expect(result).not.toBeNull();
            expect(result?.hour).toBe(13);
            expect(result?.minute).toBe(0);
        });

        it('it should return false when parsing 13am', function () {
            const result = TimeParser.parseTimeString('13am', 'utc');
            expect(result).toBe(null);
        });

        it('it should return false when parsing 25', function () {
            const result = TimeParser.parseTimeString('25', 'utc');
            expect(result).toBe(null);
        });

        it('it should return false when parsing 2523', function () {
            const result = TimeParser.parseTimeString('2523', 'utc');
            expect(result).toBe(null);
        });

        it('it should return false when parsing abc', function () {
            const result = TimeParser.parseTimeString('abc', 'utc');
            expect(result).toBe(null);
        });

        it('it should return false when parsing :', function () {
            const result = TimeParser.parseTimeString(':', 'utc');
            expect(result).toBe(null);
        });

        it('it should return false when parsing :pm', function () {
            const result = TimeParser.parseTimeString(':pm', 'utc');
            expect(result).toBe(null);
        });

        it('it should return false when parsing 13:415', function () {
            const result = TimeParser.parseTimeString('13:415', 'utc');
            expect(result).toBe(null);
        });
    });

    describe('parseHourString', function () {
        it('it should process 0,5', function () {
            const result = TimeParser.parseHourString('0,5');
            expect(result).toBe(0.5);
        });

        it('it should process 1,5', function () {
            const result = TimeParser.parseHourString('1,5');
            expect(result).toBe(1.5);
        });

        it('it should process 1.5', function () {
            const result = TimeParser.parseHourString('1.5');
            expect(result).toBe(1.5);
        });

        it('it should process 903', function () {
            const result = TimeParser.parseHourString('903');
            expect(result).toBe(903);
        });

        it('it should process 0901', function () {
            const result = TimeParser.parseHourString('901');
            expect(result).toBe(901);
        });

        it('it should process 1304', function () {
            const result = TimeParser.parseHourString('1304');
            expect(result).toBe(1304);
        });

        it('it should process 131', function () {
            const result = TimeParser.parseHourString('131');
            expect(result).toBe(131);
        });

        it('it should process 13:1', function () {
            const result = TimeParser.parseHourString('13:1');

            expect(result).not.toBeNull();
            expect(Math.round(result as number)).toBe(Math.round(13 + 10 / 60));
        });

        it('it should process 13:', function () {
            const result = TimeParser.parseHourString('13:');
            expect(result).toBe(13);
        });

        it('it should process 13:01', function () {
            const result = TimeParser.parseHourString('13:01');

            expect(result).not.toBeNull();
            expect(Math.round(result as number)).toBe(Math.round(13 + 1 / 60));
        });

        it('it should process 13::01', function () {
            const result = TimeParser.parseHourString('13::01');

            expect(result).not.toBeNull();
            expect(Math.round(result as number)).toBe(Math.round(13 + 1 / 60));
        });

        it('should parse 13:::01', function () {
            const result = TimeParser.parseHourString('13:::01');

            expect(result).not.toBeNull();
            expect(Math.round(result as number)).toBe(Math.round(13 + 1 / 60));
        });

        it('should parse 2:3', function () {
            const result = TimeParser.parseHourString('2:3');
            expect(result).toBe(2.5);
        });

        it('should parse 2:3:04', function () {
            const result = TimeParser.parseHourString('2:3:04');
            expect(result).toBe(2.5);
        });

        it('should parse 2:03:04', function () {
            const result = TimeParser.parseHourString('2:03:04');
            expect(result).toBe(2 + 3 / 60);
        });

        it('should parse 2:003', function () {
            const result = TimeParser.parseHourString('2:003');
            expect(result).toBe(2 + 3 / 60);
        });

        it('it should process 13   01', function () {
            const result = TimeParser.parseHourString('13   01');

            expect(result).not.toBeNull();
            expect(Math.round(result as number)).toBe(Math.round(13 + 1 / 60));
        });

        it('it should process 13 01', function () {
            const result = TimeParser.parseHourString('13 01');

            expect(result).not.toBeNull();
            expect(Math.round(result as number)).toBe(Math.round(13 + 1 / 60));
        });

        it('it should process 0', function () {
            const result = TimeParser.parseHourString('0');
            expect(result).toBe(0);
        });

        it('it should process 9', function () {
            const result = TimeParser.parseHourString('9');
            expect(result).toBe(9);
        });

        it('it should process 09', function () {
            const result = TimeParser.parseHourString('9');
            expect(result).toBe(9);
        });

        it('it should process 0900', function () {
            const result = TimeParser.parseHourString('0900');
            expect(result).toBe(900);
        });

        it('it should process 13:0', function () {
            const result = TimeParser.parseHourString('13:0');
            expect(result).toBe(13);
        });

        it('it should process 13:00', function () {
            const result = TimeParser.parseHourString('13:00');
            expect(result).toBe(13);
        });

        it('it should return an error with 13am', function () {
            const result = TimeParser.parseHourString('13am');
            expect(result).toBe(null);
        });

        it('it should return an error with 9pm', function () {
            const result = TimeParser.parseHourString('9am');
            expect(result).toBe(null);
        });

        it('it should return an error with abc', function () {
            const result = TimeParser.parseHourString('abc');
            expect(result).toBe(null);
        });

        it('it should return an error with :', function () {
            const result = TimeParser.parseHourString(':');
            expect(result).toBe(null);
        });

        it('it should return an error with empty', function () {
            const result = TimeParser.parseHourString('');
            expect(result).toBe(null);
        });

        it('it should return an error with 13:415', function () {
            const result = TimeParser.parseHourString('13:415');
            expect(result).toBe(null);
        });

        it('it should return an error with 13 415', function () {
            const result = TimeParser.parseHourString('13 415');
            expect(result).toBe(null);
        });
    });
});
