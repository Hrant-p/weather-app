import { weatherActionTypes } from "../store/actions/types";
import { all, put, take, call, takeLatest } from 'redux-saga/effects';
import { getRequestSucceed, setErrorState } from "../store/action-creators";
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { endpoint } from "../API";

let socket;

// wrapping function for socket.on
function connectSocket() {
    socket = io(endpoint);
    return new Promise(resolve => {
        socket.on('FromAPI', () => {
            resolve(socket);
        });
    });
}

// This is how a channel is created
const createSocketChannel = socket => eventChannel(emit => {
    const handler = data => emit(data);
    socket.on('FromAPI', handler);
    return () => socket.off('FromAPI', handler);
});

// saga that listens to the socket and puts the new data into the reducer
function* listenServerSaga() {
    try {
        // connect to the server
        const socket = yield call(connectSocket);
        // then create a socket channel
        const socketChannel = yield call(createSocketChannel, socket);
        // then put the new data into the reducer
        while (true) {
            const payload = yield take(socketChannel);
            yield put(getRequestSucceed(payload));
        }
    } catch (e) {
        yield put(setErrorState(e));
        console.log(e);
    }
}

export function* weatherSaga() {
    yield all([
        takeLatest(weatherActionTypes.GET_REQUEST, listenServerSaga )
    ])
}
