import {all, takeEvery, call, put} from "@redux-saga/core/effects";
import postActions from "../actions/postActions";
import {
    getAllCommentInPost,
    getAllUserLikedPost,
    getAllUserSavedPost,
    getPostInformationFromPId
} from "../../services/PostApiServices";

// eslint-disable-next-line camelcase
function* getPostInformationFromPId_saga(action) {
    try {
        const response = yield call(getPostInformationFromPId,action.id)
        if(response.statusCode === 200){
            yield action.callback(response.data)
        }
    } catch (e) {
        console.log('err', e)
    }
}

// eslint-disable-next-line camelcase
function* getAllCommentInPost_saga(action) {
    try {
        const response = yield call(getAllCommentInPost,action.id)
        if(response.statusCode === 200){
            yield action.callback(response.data)
        }
    } catch (e) {
        console.log('err', e)
    }
}

// eslint-disable-next-line camelcase
function* getAllUserSavedPost_saga(action) {
    try {
        const response = yield call(getAllUserSavedPost,action.id)
        if(response.statusCode === 200){
            yield action.callback(response.data)
        }
    } catch (e) {
        console.log('err', e)
    }
}

// eslint-disable-next-line camelcase
function* getAllUserLikedPost_saga(action) {
    try {
        const response = yield call(getAllUserLikedPost,action.id)
        if(response.statusCode === 200){
            yield action.callback(response.data)
        }
    } catch (e) {
        console.log('err', e)
    }
}

function* listen() {
    yield takeEvery(postActions.type.GET_POST_INFORMATION_FROM_PID, getPostInformationFromPId_saga)
    yield takeEvery(postActions.type.GET_ALL_COMMENT_IN_POST, getAllCommentInPost_saga)
    yield takeEvery(postActions.type.GET_ALL_USER_SAVED_POST, getAllUserSavedPost_saga)
    yield takeEvery(postActions.type.GET_ALL_USER_LIKED_POST, getAllUserLikedPost_saga)
}

export default function* postSaga() {
    yield all([listen()])
}