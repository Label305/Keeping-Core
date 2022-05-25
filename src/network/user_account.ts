import {AxiosDriver, getDefaultHeaders} from './driver/axios';

import {Credentials} from '../models/credentials';
import {UserAccount} from '../models/user_account';

export class UserAccountApi {
    constructor(private axiosDriver: AxiosDriver, private keepingApiUrl: string) {}

    public async fetchMe(credentials: Credentials): Promise<UserAccount> {
        const defaultHeaders = await getDefaultHeaders(credentials);

        const response = await this.axiosDriver.get(`${this.keepingApiUrl}/user-account`, {
            headers: defaultHeaders,
        });
        return response.data.user_account as UserAccount;
    }
}
