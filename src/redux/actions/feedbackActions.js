const type = {
    GET_FEEDBACK: "GET_FEEDBACK",
    GET_FEEDBACK_SUCCESS: "GET_FEEDBACK_SUCCESS",
    SEARCH_FEEDBACK: "SEARCH_FEEDBACK",
    SEARCH_FEEDBACK_SUCCESS: "SEARCH_FEEDBACK_SUCCESS",
    DELETE_FEEDBACK: "DELETE_FEEDBACK",
    DELETE_FEEDBACK_SUCCESS: "DELETE_FEEDBACK_SUCCESS",
    FILTER_FEEDBACK_BY_TIME: "FILTER_FEEDBACK_BY_TIME",
    FILTER_FEEDBACK_BY_TIME_SUCCESS: "FILTER_FEEDBACK_BY_TIME_SUCCESS",
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
    }),
    filterFeedbackByTime: (payload, callback) => ({
        type: type.FILTER_FEEDBACK_BY_TIME,
        payload,
        callback,
    }),
}
export default {type, action}