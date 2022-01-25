import {all, call, put, takeEvery} from "@redux-saga/core/effects";
import feedbackActions from "../actions/feedbackActions";
import {getFeedback} from "../../services/FeedbackApiServices";

// eslint-disable-next-line camelcase
function *getFeedback_saga(action) {
    try {
        const response = yield call(getFeedback,action.payload)
        yield action.callback(response)
        if(response.statusCode === 200){
            yield put({type:feedbackActions.type.GET_FEEDBACK_SUCCESS,data:response.data})
        }
    }catch (e) {
        console.log('err',e)
    }
}

function *listen() {
    yield takeEvery(feedbackActions.type.GET_FEEDBACK,getFeedback_saga)
}

function *feedbackSaga() {
    yield all([listen()])
}
export default feedbackSaga