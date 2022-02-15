const type = {
    GET_REPORT: "GET_REPORT",
    GET_REPORT_SUCCESS: "GET_REPORT_SUCCESS",
    SEARCH_REPORT: "SEARCH_REPORT",
    SEARCH_REPORT_SUCCESS: "SEARCH_REPORT_SUCCESS",
    DELETE_REPORT: "DELETE_REPORT",
    DELETE_REPORT_SUCCESS: "DELETE_REPORT_SUCCESS",
}
const action = {
    getReport: (payload, callback) => ({
        type: type.GET_REPORT,
        payload,
        callback,
    }),
    searchReport: (payload, callback) => ({
        type: type.SEARCH_REPORT,
        payload,
        callback,
    }),
    deleteReport: (id, callback) => ({
        type: type.DELETE_REPORT,
        id,
        callback,
    })
}
export default {type, action}