import {SubscriptionPlans} from '../enums/subscription_plants';
import {Organisation} from '../models/organisation';
import {isSet} from './is_set';

export function allowInjections(organisation: Organisation | null): boolean {
    if (!isSet(organisation)) {
        return false;
    }

    return (
        organisation.subscription.plan === SubscriptionPlans.PLUS_MONTHLY_2019 ||
        organisation.subscription.plan === SubscriptionPlans.PLUS_YEARLY_2019 ||
        organisation.subscription.plan === SubscriptionPlans.ENTERPRISE_MONTHLY_2019 ||
        organisation.subscription.plan === SubscriptionPlans.ENTERPRISE_YEARLY_2019
    );
}
