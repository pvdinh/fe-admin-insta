const type={
    GET_REPORT:"GET_REPORT",
    GET_REPORT_SUCCESS:"GET_REPORT_SUCCESS",
    SEARCH_REPORT:"SEARCH_REPORT",
    SEARCH_REPORT_SUCCESS:"SEARCH_REPORT_SUCCESS",
}
const action={
    getReport:(payload,callback)=>({
        type:type.GET_REPORT,
        payload,
        callback,
    }),
    searchReport:(payload,callback)=>({
        type:type.SEARCH_REPORT,
        payload,
        callback,
    }),

}
export default {type,action}