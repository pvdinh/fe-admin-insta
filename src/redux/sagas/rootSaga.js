import {all} from "@redux-saga/core/effects";
import feedbackSaga from "./feedbackSaga";
import loginSaga from "./loginSaga";

export default function* rootSaga () {
    yield all([feedbackSaga(),loginSaga(),])
}