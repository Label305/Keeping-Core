import {CurrencyFormat} from '../enums/currency_format';
import {DateFormat} from '../enums/date_format';
import {FractionalFormat} from '../enums/fractional_format';
import {NumberFormat} from '../enums/number_format';
import {TimeFormat} from '../enums/time_format';
import {TimesheetTimes} from '../enums/timesheet_times';
import {WeekStartsOn} from '../enums/week_starts_on';

import {User} from './user';
import {SubscriptionPlans} from '../enums/subscription_plants';

export interface Organisation {
    id: number;
    name: string;
    my_user: User;
    my_user_id: number;
    subdomain: string;
    subdomain_url: string;
    avatar_initials: string;
    avatar_url: string | null;
    settings: {
        formatting: {
            currency: string;
            currency_format: CurrencyFormat;
            date_format: DateFormat;
            number_format: NumberFormat;
            time_display: FractionalFormat;
            time_format: TimeFormat;
            week_starts_on: WeekStartsOn;
        };
        timesheet_type: TimesheetTimes;
        is_projects_enabled: boolean;
        is_tasks_enabled: boolean;
        is_breaks_enabled: boolean;
        timezone: string;
    };
    subscription: {
        plan: SubscriptionPlans;
    };
}
