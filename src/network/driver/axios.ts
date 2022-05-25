import AxiosInstance, {AxiosError, AxiosResponse} from 'axios';

import {Credentials} from '../../models/credentials';
import {ErrorMessages} from '../../models/error_messages';
import {SocketsContainer} from '../../models/sockets_container';
import {setTimeOffset} from '../../support/time';

type AxiosUnauthorizedInterceptor = (error: AxiosError) => Promise<AxiosResponse<unknown>>;

export type AxiosDriver = typeof AxiosInstance;

export function initAxiosInstance(
    socketsContainer: SocketsContainer,
    AxiosUnauthorizedInterceptor: AxiosUnauthorizedInterceptor,
) {
    AxiosInstance.interceptors.response.use((response) => response, AxiosUnauthorizedInterceptor);
    AxiosInstance.interceptors.response.use((response) => {
        const serverTime = parseInt(response.headers['x-server-time-ms'], 10);
        const roundTrip = Date.now() - parseInt((response.config as {requestStart: string}).requestStart || '150', 10);
        if (!isNaN(serverTime)) {
            setTimeOffset(serverTime, roundTrip);
        }
        return response;
    });
    AxiosInstance.interceptors.request.use((value) => {
        return new Promise((resolve) => {
            if (socketsContainer.Echo && value.headers) {
                value.headers['X-Socket-ID'] = socketsContainer.Echo.socketId();
            }
            (value as {requestStart: number}).requestStart = Date.now();
            resolve(value);
        });
    });

    return AxiosInstance;
}

export async function getDefaultHeaders(credentials: Credentials) {
    return {
        Authorization: 'Bearer ' + credentials.access_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
}

function isAxiosError(error: AxiosError | unknown): error is AxiosError {
    return error !== null && typeof error === 'object' && 'isAxiosError' in error && (error as AxiosError).isAxiosError;
}

export function axiosErrorHandler(error: AxiosError | unknown, errorMessages: ErrorMessages) {
    if (isAxiosError(error)) {
        if (error.response) {
            if (error.response.data && error.response.data.warning) {
                return new Error(error.response.data.warning);
            }
            if (error.response.status >= 500) {
                return new Error(errorMessages['network.500']);
            } else if (error.response.status >= 400) {
                return new Error(errorMessages['network.400']);
            } else {
                return new Error(errorMessages['network.unknown']);
            }
        } else if (error.request) {
            return new Error(errorMessages['network.possibly_no_network']);
        }
    }

    return error;
}
