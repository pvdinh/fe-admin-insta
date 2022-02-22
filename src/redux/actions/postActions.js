const type = {
    GET_POST_INFORMATION_FROM_PID: "GET_POST_INFORMATION_FROM_PID",
    GET_POST_INFORMATION_FROM_PID_SUCCESS: "GET_POST_INFORMATION_FROM_PID_SUCCESS",
    GET_ALL_COMMENT_IN_POST: "GET_ALL_COMMENT_IN_POST",
    GET_ALL_COMMENT_IN_POST_SUCCESS: "GET_ALL_COMMENT_IN_POST_SUCCESS",
    GET_ALL_USER_SAVED_POST: "GET_ALL_USER_SAVED_POST",
    GET_ALL_USER_SAVED_POST_SUCCESS: "GET_ALL_USER_SAVED_POST_SUCCESS",
    GET_ALL_USER_LIKED_POST: "GET_ALL_USER_LIKED_POST",
    GET_ALL_USER_LIKED_POST_SUCCESS: "GET_ALL_USER_LIKED_POST_SUCCESS",
    GET_ALL_POST: "GET_ALL_POST",
    FETCH_MORE_POST: "FETCH_MORE_POST",
    FETCH_MORE_POST_SUCCESS: "FETCH_MORE_POST_SUCCESS",
    GET_ALL_POST_SUCCESS: "GET_ALL_POST_SUCCESS",
    SEARCH_POST: "SEARCH_POST",
    SEARCH_POST_SUCCESS: "SEARCH_POST_SUCCESS",
    BLOCK_POST: "BLOCK_POST",
    BLOCK_POST_SUCCESS: "BLOCK_POST_SUCCESS",
    UN_BLOCK_POST: "UN_BLOCK_POST",
    UN_BLOCK_POST_SUCCESS: "UN_BLOCK_POST_SUCCESS",
    GET_POST_BLOCK_BY_ID: "GET_POST_BLOCK_BY_ID",
    GET_POST_BLOCK_BY_ID_SUCCESS: "GET_POST_BLOCK_BY_ID_SUCCESS",
    DELETE_COMMENT: "DELETE_COMMENT",
}
const action = {
    getPostInformationFromPId: (pid, callback) => ({
        type: type.GET_POST_INFORMATION_FROM_PID,
        id: pid,
        callback,
    }),
    getAllCommentInPost: (pId, callback) => ({
        type: type.GET_ALL_COMMENT_IN_POST,
        id: pId,
        callback,
    }),
    getAllUserSavedPost: (pId, callback) => ({
        type: type.GET_ALL_USER_SAVED_POST,
        id: pId,
        callback,
    }),
    getAllUserLikedPost: (pId, callback) => ({
        type: type.GET_ALL_USER_LIKED_POST,
        id: pId,
        callback,
    }),
    getAllPost: (payload, callback) => ({
        type: type.GET_ALL_POST,
        payload,
        callback,
    }),
    fetchMorePost: (payload, callback) => ({
        type: type.FETCH_MORE_POST,
        payload,
        callback,
    }),
    searchPost: (payload, callback) => ({
        type: type.SEARCH_POST,
        payload,
        callback,
    }),
    blockPost: (pId, callback) => ({
        type: type.BLOCK_POST,
        id: pId,
        callback,
    }),
    unBlockPost: (pId, callback) => ({
        type: type.UN_BLOCK_POST,
        id: pId,
        callback,
    }),
    getPostBlockByPostId: (pId, callback) => ({
        type: type.GET_POST_BLOCK_BY_ID,
        id: pId,
        callback,
    }),
    deleteComment: (id, callback) => ({
        type: type.DELETE_COMMENT,
        id,
        callback,
    }),
}
export default {type, action}