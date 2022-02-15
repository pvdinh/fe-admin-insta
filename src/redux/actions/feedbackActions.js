const type = {
    GET_FEEDBACK: "GET_FEEDBACK",
    GET_FEEDBACK_SUCCESS: "GET_FEEDBACK_SUCCESS",
    SEARCH_FEEDBACK: "SEARCH_FEEDBACK",
    SEARCH_FEEDBACK_SUCCESS: "SEARCH_FEEDBACK_SUCCESS",
    DELETE_FEEDBACK: "DELETE_FEEDBACK",
    DELETE_FEEDBACK_SUCCESS: "DELETE_FEEDBACK_SUCCESS",
}
const action = {
    getFeedback: (payload, callback) => ({
        type: type.GET_FEEDBACK,
        payload,
        callback,
    }),
    searchFeedback: (payload, callback) => ({
        type: type.SEARCH_FEEDBACK,
        payload,
        callback,
    }),
    deleteFeedback: (id, callback) => ({
        type: type.DELETE_FEEDBACK,
        id,
        callback,
    })
}
export default {type, action}