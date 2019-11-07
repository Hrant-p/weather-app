import { call, all } from 'redux-saga/effects'
import {weatherSaga} from "../../reduxSaga/weatherSaga";

export default function* middleware() {
    yield all([
        call(weatherSaga)
    ])
}