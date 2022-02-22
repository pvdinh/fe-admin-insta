import {all, takeEvery, call, put} from "@redux-saga/core/effects";
import postActions from "../actions/postActions";
import {
    // eslint-disable-next-line import/named
    blockPost, deleteComment,
    getAllCommentInPost, getAllPost,
    getAllUserLikedPost,
    // eslint-disable-next-line import/named
    getAllUserSavedPost, getPostBlockByPostId,
    getPostInformationFromPId, searchPost, unBlockPost
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

// eslint-disable-next-line camelcase
function* getAllPost_saga(action) {
    try {
        const response = yield call(getAllPost,action.payload)
        if(response.statusCode === 200){
            yield put({type:postActions.type.GET_ALL_POST_SUCCESS,data:response.data})
        }
    } catch (e) {
        console.log('err', e)
    }
}

// eslint-disable-next-line camelcase
function* fetchMorePost_saga(action) {
    try {
        const response = yield call(getAllPost,action.payload)
        if(response.statusCode === 200){
            yield put({type:postActions.type.FETCH_MORE_POST_SUCCESS,data:response.data})
        }
    } catch (e) {
        console.log('err', e)
    }
}

// eslint-disable-next-line camelcase
function* searchPost_saga(action) {
    try {
        const response = yield call(searchPost,action.payload)
        if(response.statusCode === 200){
            yield action.callback(response.data)
            yield put({type:postActions.type.SEARCH_POST_SUCCESS,data:response.data})
        }
    } catch (e) {
        console.log('err', e)
    }
}

// eslint-disable-next-line camelcase
function* blockPost_saga(action) {
    try {
        const response = yield call(blockPost, action.id)
        yield action.callback(response)
    } catch (e) {
        console.log('err', e)
    }
}

// eslint-disable-next-line camelcase
function* unBlockPost_saga(action) {
    try {
        const response = yield call(unBlockPost, action.id)
        yield action.callback(response)
    } catch (e) {
        console.log('err', e)
    }
}

// eslint-disable-next-line camelcase
function* getPostBlockByPostId_saga(action) {
    try {
        const response = yield call(getPostBlockByPostId, action.id)
        yield action.callback(response)
    } catch (e) {
        console.log('err', e)
    }
}

// eslint-disable-next-line camelcase
function* deleteComment_saga(action) {
    try {
        const response = yield call(deleteComment, action.id)
        if(response.statusCode === 200){
            yield action.callback(response)
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
    yield takeEvery(postActions.type.GET_ALL_POST, getAllPost_saga)
    yield takeEvery(postActions.type.FETCH_MORE_POST, fetchMorePost_saga)
    yield takeEvery(postActions.type.SEARCH_POST, searchPost_saga)
    yield takeEvery(postActions.type.BLOCK_POST, blockPost_saga)
    yield takeEvery(postActions.type.UN_BLOCK_POST, unBlockPost_saga)
    yield takeEvery(postActions.type.GET_POST_BLOCK_BY_ID, getPostBlockByPostId_saga)
    yield takeEvery(postActions.type.DELETE_COMMENT, deleteComment_saga)
}

export default function* postSaga() {
    yield all([listen()])
}