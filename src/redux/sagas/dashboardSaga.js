import {all, takeEvery, call, put} from "@redux-saga/core/effects";
import dashBoardActions from "../actions/dashBoardActions";
import {
    chartQuantityPostUser,
    getPercentageAuthUser,
    getStatisticalOverview
} from "../../services/DashboardApiServices";

// eslint-disable-next-line camelcase
function* getStatisticalOverview_saga(action) {
    try {
        const response = yield call(getStatisticalOverview)
        yield action.callback(response.data)
    } catch (e) {
        console.log('err', e)
    }
}

// eslint-disable-next-line camelcase
function* getPercentageAuthUser_saga(action) {
    try {
        const response = yield call(getPercentageAuthUser)
        yield action.callback(response.data)
    } catch (e) {
        console.log('err', e)
    }
}


// eslint-disable-next-line camelcase
function* chartQuantityPostUser_saga(action) {
    try {
        const response = yield call(chartQuantityPostUser,action.year)
        yield action.callback(response.data)
    } catch (e) {
        console.log('err', e)
    }
}

function* listen() {
    yield takeEvery(dashBoardActions.type.GET_STATISTICAL_OVERVIEW, getStatisticalOverview_saga)
    yield takeEvery(dashBoardActions.type.GET_PERCENTAGE_AUTH_USER, getPercentageAuthUser_saga)
    yield takeEvery(dashBoardActions.type.CHART_QUANTITY_POST_USER, chartQuantityPostUser_saga)
}

export default function* dashboardSaga() {
    yield all([listen()])
}