import {weatherActionTypes} from "../actions/types";

export function getRequest() {
    return {
        type: weatherActionTypes.GET_REQUEST,
        payload: {}
    }
}

export function getRequestSucceed(data) {
    return {
        type: weatherActionTypes.REQUEST_SUCCEED,
        payload: { data }
    }
}

export function setLoadingState(isLoading) {
    return {
        type: weatherActionTypes.SET_LOADING_STATE,
        payload: { isLoading }
    }
}

export function setErrorState(error) {
    return {
        type: weatherActionTypes.SET_LOADING_STATE,
        payload: { error }
    }
}

export function getTest() {
    return {
        type: weatherActionTypes.GET_TEST_SAGA,
        payload: {}
    }
}
