import Echo from 'laravel-echo';
import * as io from 'socket.io-client';

export interface SocketsContainer {
    io: io;
    Echo: Echo;
}
