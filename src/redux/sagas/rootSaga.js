import {all} from "@redux-saga/core/effects";
import feedbackSaga from "./feedbackSaga";
import loginSaga from "./loginSaga";
import homeSaga from "./homeSaga";
import userAccountSaga from "./userAccountSaga";

export default function* rootSaga () {
    yield all([feedbackSaga(),loginSaga(),homeSaga(),userAccountSaga(),])
}