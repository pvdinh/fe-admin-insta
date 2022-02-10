import {all, call, put, takeEvery} from "@redux-saga/core/effects";
import userAccountActions from "../actions/userAccountActions";
import {getAllUser, getUserAccountSettingById, searchUser} from "../../services/UserAccountApiServices";


// eslint-disable-next-line camelcase
function *getUserAccountSettingById_saga(action) {
    try {
        const response = yield call(getUserAccountSettingById,action.uId)
        if(response.statusCode === 200){
            action.callback(response.data)
        }
    }catch (e) {
        console.log('err',e)
    }
}

// eslint-disable-next-line camelcase
function *getAllUser_saga(action) {
    try {
        const response = yield call(getAllUser,action.payload)
        if(response.statusCode === 200){
            yield put({type:userAccountActions.type.GET_ALL_USER_SUCCESS,data:response.data})
            yield action.callback(response)
        }
    }catch (e) {
        console.log('err',e)
    }
}

// eslint-disable-next-line camelcase
function *searchUser_saga(action) {
    try {
        const response = yield call(searchUser,action.payload)
        if(response.statusCode === 200){
            yield put({type:userAccountActions.type.SEARCH_USER_SUCCESS,data:response.data})
            yield action.callback(response)
        }
    }catch (e) {
        console.log('err',e)
    }
}

function *listen() {
    yield takeEvery(userAccountActions.type.GET_USER_ACCOUNT_SETTING_BY_ID,getUserAccountSettingById_saga)
    yield takeEvery(userAccountActions.type.GET_ALL_USER,getAllUser_saga)
    yield takeEvery(userAccountActions.type.SEARCH_USER,searchUser_saga)
}
function *userAccountSaga() {
    yield all([listen()])
}
export default userAccountSaga