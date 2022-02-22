import {AxiosDriver, getDefaultHeaders, axiosErrorHandler} from './driver/axios';
import {UserAccount} from '../models/user_account';
import {Credentials} from '../models/credentials';
import {ErrorMessages} from '../models/error_messages';

export class UserAccountApi {
    constructor(
        private axiosDriver: AxiosDriver,
        private keepingApiUrl: string,
        private errorMessages: ErrorMessages,
    ) {}

    public async fetchMe(credentials: Credentials | undefined): Promise<UserAccount> {
        const defaultHeaders = await getDefaultHeaders(credentials, this.errorMessages);

        try {
            const response = await this.axiosDriver.get(`${this.keepingApiUrl}/user-account`, {
                headers: defaultHeaders,
            });
            return response.data.user_account as UserAccount;
        } catch (error) {
            throw axiosErrorHandler(error, this.errorMessages);
        }
    }
}
