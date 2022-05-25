import * as io from 'socket.io-client';

import {Credentials, ErrorMessages, SocketsContainer} from '../models';

import Echo from 'laravel-echo';
import {UnauthenticatedError} from '../support';

export async function activatePushMessaging(
    credentials: Credentials | undefined,
    userId: number,
    socketsContainer: SocketsContainer,
    errorMessages: ErrorMessages,
    keepingEchoUrl: string,
    onRefreshRequested: (date: string, entry_id: number, user_id: number) => void,
) {
    if (credentials === undefined) {
        throw new UnauthenticatedError(
            errorMessages['flash.unauthorized']
                ? errorMessages['flash.unauthorized']
                : 'No credentials available, please login again.',
        );
    }

    socketsContainer.io = io;

    if (socketsContainer.Echo !== undefined && socketsContainer.Echo !== null) {
        socketsContainer.Echo.disconnect();
    }
    socketsContainer.Echo = new Echo({
        broadcaster: 'socket.io',
        host: keepingEchoUrl,
        path: '/socket.io',
        encrypted: true,
        namespace: 'Keeping.Events',
        auth: {
            headers: {
                Authorization: 'Bearer ' + credentials.access_token,
            },
        },
    });

    socketsContainer.Echo.private(`timesheet.user.${userId}`).listen(
        'Support.InteractsForTimesheetRefresh',
        (e: {date: string; entry_id: number; socket: null; user_id: number}) => {
            onRefreshRequested(e.date, e.entry_id, e.user_id);
        },
    );
}
