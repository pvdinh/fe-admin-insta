import reportActions from "../actions/reportActions";

const initState = {
    listReport: []
}
const reportReducer = (state = initState, action) => {
    switch (action.type) {
        case reportActions.type.GET_REPORT_SUCCESS:
            return {...state, listReport: action.data}
        case reportActions.type.SEARCH_REPORT_SUCCESS:
            return {...state, listReport: action.data}
        case reportActions.type.FILTER_REPORT_BY_TIME_SUCCESS:
            return {...state, listReport: action.data}
        default:
            return {...state}
    }
}
export default reportReducer