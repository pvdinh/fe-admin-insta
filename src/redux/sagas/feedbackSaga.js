import {all, call, put, takeEvery} from "@redux-saga/core/effects";
import feedbackActions from "../actions/feedbackActions";
import {deleteFeedback, filterFeedbackByTime, getFeedback, searchFeedback} from "../../services/FeedbackApiServices";

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

// eslint-disable-next-line camelcase
function *searchFeedback_saga(action) {
    try {
        const response = yield call(searchFeedback,action.payload)
        yield action.callback(response)
        if(response.statusCode === 200){
            yield put({type:feedbackActions.type.SEARCH_FEEDBACK_SUCCESS,data:response.data})
        }
    }catch (e) {
        console.log('err',e)
    }
}

// eslint-disable-next-line camelcase
function *deleteFeedback_saga(action) {
    try {
        const response = yield call(deleteFeedback,action.id)
        yield action.callback(response)
    }catch (e) {
        console.log('err',e)
    }
}


// eslint-disable-next-line camelcase
function *filterFeedbackByTime_saga(action) {
    try {
        const response = yield call(filterFeedbackByTime,action.payload)
        yield action.callback(response)
        if(response.statusCode === 200){
            yield put({type:feedbackActions.type.FILTER_FEEDBACK_BY_TIME_SUCCESS,data:response.data})
        }
    }catch (e) {
        console.log('err',e)
    }
}

function *listen() {
    yield takeEvery(feedbackActions.type.GET_FEEDBACK,getFeedback_saga)
    yield takeEvery(feedbackActions.type.SEARCH_FEEDBACK,searchFeedback_saga)
    yield takeEvery(feedbackActions.type.DELETE_FEEDBACK,deleteFeedback_saga)
    yield takeEvery(feedbackActions.type.FILTER_FEEDBACK_BY_TIME,filterFeedbackByTime_saga)
}

function *feedbackSaga() {
    yield all([listen()])
}
export default feedbackSaga