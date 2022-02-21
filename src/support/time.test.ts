/**
 * @jest-environment jsdom
 */

import {FractionalFormat, NumberFormat} from '../enums';
import * as Time from './time';

describe('Time formatter', function () {
    describe('hours', function () {
        it('Should format zero to 0:00', function () {
            //Given
            const input = 0;

            //When
            const formatted = Time.hours(
                input,
                FractionalFormat.HOURS_AND_MINUTES,
                NumberFormat.POINT_DECIMAL_COMMA_GROUP,
            );

            //Then
            expect(formatted).toBe('0:00');
        });
        it('Should format -1 to -1:00', function () {
            //Given
            const input = -1;

            //When
            const formatted = Time.hours(
                input,
                FractionalFormat.HOURS_AND_MINUTES,
                NumberFormat.POINT_DECIMAL_COMMA_GROUP,
            );

            //Then
            expect(formatted).toBe('-1:00');
        });
        it('Should format 0.25 to 0:15', function () {
            //Given
            const input = 0.25;

            //When
            const formatted = Time.hours(
                input,
                FractionalFormat.HOURS_AND_MINUTES,
                NumberFormat.POINT_DECIMAL_COMMA_GROUP,
            );

            //Then
            expect(formatted).toBe('0:15');
        });
        it('Should format 0.10 to 0.06 (leading zero)', function () {
            //Given
            const input = 0.1;

            //When
            const formatted = Time.hours(
                input,
                FractionalFormat.HOURS_AND_MINUTES,
                NumberFormat.POINT_DECIMAL_COMMA_GROUP,
            );

            //Then
            expect(formatted).toBe('0:06');
        });
        it('Should format number larget than 24 hours', function () {
            //Given
            const input = 26.25;

            //When
            const formatted = Time.hours(
                input,
                FractionalFormat.HOURS_AND_MINUTES,
                NumberFormat.POINT_DECIMAL_COMMA_GROUP,
            );

            //Then
            expect(formatted).toBe('26:15');
        });
        it('Should round up minutes', function () {
            //Given
            const input = 4 + 31 / 60 + 59 / 3600;

            //When
            const formatted = Time.hours(
                input,
                FractionalFormat.HOURS_AND_MINUTES,
                NumberFormat.POINT_DECIMAL_COMMA_GROUP,
            );

            //Then
            expect(formatted).toBe('4:32');
        });
        it('Should round up hours', function () {
            //Given
            const input = 4 + 59 / 60 + 59 / 3600;

            //When
            const formatted = Time.hours(
                input,
                FractionalFormat.HOURS_AND_MINUTES,
                NumberFormat.POINT_DECIMAL_COMMA_GROUP,
            );

            //Then
            expect(formatted).toBe('5:00');
        });
    });
});
