import {all, takeEvery, call, put} from "@redux-saga/core/effects";
import homeActions from "../actions/homeActions";
import {
    getUserAccountProfile
} from "../../services/HomeApiService";

// eslint-disable-next-line camelcase
function* saga_getUserAccountProfile(action) {
    try {
        const response = yield call(getUserAccountProfile)
        yield put({type: homeActions.type.GET_USER_ACCOUNT_PROFILE_SUCCESS, data: response.data})
        yield action.callback(response.data)
    } catch (e) {
        console.log('err', e)
    }
}

function* listen() {
    yield takeEvery(homeActions.type.GET_USER_ACCOUNT_PROFILE, saga_getUserAccountProfile)
}

export default function* homeSaga() {
    yield all([listen()])
}