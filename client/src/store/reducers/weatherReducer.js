import { fromJS } from "immutable";
import {weatherActionTypes} from "../actions/types";

const initialState = fromJS({
    temperature: null,
    serverStatus: 'unknown',
    channelStatus: 'off',
    error: null,
    isLoading: false
});

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case weatherActionTypes.REQUEST_SUCCEED:
            return state.set('temperature', fromJS(payload.data));
        case weatherActionTypes.SET_CHANNEL_STATUS:
            return state.set('channelStatus', fromJS(payload.status));
        case weatherActionTypes.SET_SERVER_STATUS:
            return  state.set('serverStatus', fromJS(payload.status));
        case weatherActionTypes.SET_LOADING_STATE:
            return state.set('isLoading', fromJS(payload.isLoading));
        case weatherActionTypes.SET_ERROR_STATE:
            return state.set('error', fromJS(payload.error));
        default:
            return state
    }
}
