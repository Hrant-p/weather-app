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
        case weatherActionTypes.CHANNEL_ON:
            return state.set('channelStatus', fromJS('on'));
        case weatherActionTypes.CHANNEL_OFF:
            return state
                .set('channelStatus', fromJS('off'))
                .set('serverStatus', fromJS('unknown'));
        case weatherActionTypes.SERVER_ON:
            return  state.set('serverStatus', fromJS('on'));
        case weatherActionTypes.SERVER_OFF:
            return state.set('serverStatus', fromJS('off'));
        case weatherActionTypes.SET_LOADING_STATE:
            return state.set('isLoading', fromJS(payload.isLoading));
        case weatherActionTypes.SET_ERROR_STATE:
            return state.set('error', fromJS(payload.error));
        default:
            return state
    }
}
