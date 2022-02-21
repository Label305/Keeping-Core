import {Organisation} from './organisation';

export interface UserAccount {
    readonly id: number;
    readonly avatar_initials: string;
    readonly avatar_url: string;
    readonly name: string;
    readonly organisations: ReadonlyArray<Organisation>;
    readonly preferred_language: string;
    readonly tester_role?: 'internal';
}
