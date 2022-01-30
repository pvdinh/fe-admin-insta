const type={
    GET_POST_INFORMATION_FROM_PID:"GET_POST_INFORMATION_FROM_PID",
    GET_POST_INFORMATION_FROM_PID_SUCCESS:"GET_POST_INFORMATION_FROM_PID_SUCCESS",
    GET_ALL_COMMENT_IN_POST:"GET_ALL_COMMENT_IN_POST",
    GET_ALL_COMMENT_IN_POST_SUCCESS:"GET_ALL_COMMENT_IN_POST_SUCCESS",
    GET_ALL_USER_SAVED_POST:"GET_ALL_USER_SAVED_POST",
    GET_ALL_USER_SAVED_POST_SUCCESS:"GET_ALL_USER_SAVED_POST_SUCCESS",
    GET_ALL_USER_LIKED_POST:"GET_ALL_USER_LIKED_POST",
    GET_ALL_USER_LIKED_POST_SUCCESS:"GET_ALL_USER_LIKED_POST_SUCCESS",
}
const action={
    getPostInformationFromPId: (pid,callback) =>({
          type:type.GET_POST_INFORMATION_FROM_PID,
          id:pid,
          callback,
      }),
    getAllCommentInPost:(pId,callback) =>({
        type:type.GET_ALL_COMMENT_IN_POST,
        id:pId,
        callback,
    }),
    getAllUserSavedPost:(pId,callback) =>({
        type:type.GET_ALL_USER_SAVED_POST,
        id:pId,
        callback,
    }),
    getAllUserLikedPost:(pId,callback) =>({
        type:type.GET_ALL_USER_LIKED_POST,
        id:pId,
        callback,
    }),
}
export default {type,action}