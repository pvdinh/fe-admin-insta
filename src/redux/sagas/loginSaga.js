import {all, call, takeEvery} from "@redux-saga/core/effects";
import loginActions from "../actions/loginActions";
import {login} from "../../services/LoginApiServices";


// eslint-disable-next-line camelcase
function *login_saga(action) {
    try {
        const response = yield call(login,action.payload)
        if(response.statusCode === 200){
            localStorage.setItem("sessionTokenAdmin", response.data.authorization)
            yield action.callback(response)
            window.location.href = "/dashboard/app"
        } else {
            window.location.href = "/login"
        }
    }catch (e) {
        console.log('err',e)
    }
}

function *listen() {
    yield takeEvery(loginActions.type.LOGIN,login_saga)
}
function *loginSaga() {
    yield all([listen()])
}
export default loginSaga