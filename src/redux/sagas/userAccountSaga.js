import {all, call, takeEvery} from "@redux-saga/core/effects";
import userAccountActions from "../actions/userAccountActions";
import {getUserAccountSettingById} from "../../services/UserAccountApiServices";


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

function *listen() {
    yield takeEvery(userAccountActions.type.GET_USER_ACCOUNT_SETTING_BY_ID,getUserAccountSettingById_saga)
}
function *userAccountSaga() {
    yield all([listen()])
}
export default userAccountSaga