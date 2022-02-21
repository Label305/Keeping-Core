import Axios from 'axios';

import {Credentials} from '../models/credentials';

export class AuthApi {
    constructor(
        private keepingApiUrl: string,
        private keepingClientId: string,
        private keepingClientSecret: string,
        private redirectUrl: string,
    ) {}

    /**
     * Fetch credentials from authorization code
     * @param code
     * @returns Promise<Credentials>
     */
    public async byCode(code: string): Promise<Credentials> {
        const response = await Axios.create().post(`${this.keepingApiUrl}/oauth/token`, {
            grant_type: 'authorization_code',
            client_id: this.keepingClientId,
            client_secret: this.keepingClientSecret,
            redirect_uri: this.redirectUrl,
            code: code,
        });
        return response.data as Credentials;
    }

    /**
     * Fetch credentials from authorization code
     * @param refreshToken
     * @returns Promise<Credentials>
     */
    public async byRefreshToken(refreshToken: string): Promise<Credentials> {
        const response = await Axios.create().post(this.keepingApiUrl + '/oauth/token', {
            grant_type: 'refresh_token',
            client_id: this.keepingClientId,
            client_secret: this.keepingClientSecret,
            refresh_token: refreshToken,
        });
        return response.data as Credentials;
    }
}
