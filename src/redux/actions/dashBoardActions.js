const type = {
    GET_STATISTICAL_OVERVIEW: "GET_STATISTICAL_OVERVIEW",
    GET_PERCENTAGE_AUTH_USER: "GET_PERCENTAGE_AUTH_USER",
    GET_STATISTICAL_OVERVIEW_SUCCESS: "GET_STATISTICAL_OVERVIEW_SUCCESS",
    CHART_QUANTITY_POST_USER: "CHART_QUANTITY_POST_USER",
}
const action = {
    getStatisticalOverview: (callback) => ({
        type: type.GET_STATISTICAL_OVERVIEW,
        callback,
    }),
    getPercentageAuthUser: (callback) => ({
        type: type.GET_PERCENTAGE_AUTH_USER,
        callback,
    }),
    chartQuantityPostUser: (year,callback) => ({
        type: type.CHART_QUANTITY_POST_USER,
        year,
        callback,
    }),
}
export default {type, action}