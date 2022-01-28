const type={
    GET_FEEDBACK:"GET_FEEDBACK",
    GET_FEEDBACK_SUCCESS:"GET_FEEDBACK_SUCCESS",
    SEARCH_FEEDBACK:"SEARCH_FEEDBACK",
    SEARCH_FEEDBACK_SUCCESS:"SEARCH_FEEDBACK_SUCCESS",
}
const action={
    getFeedback:(payload,callback)=>({
            type:type.GET_FEEDBACK,
            payload,
            callback,
        }),
    searchFeedback:(payload,callback)=>({
            type:type.SEARCH_FEEDBACK,
            payload,
            callback,
        }),

}
export default {type,action}