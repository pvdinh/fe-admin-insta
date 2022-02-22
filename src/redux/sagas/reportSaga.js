import {all, call, put, takeEvery} from "@redux-saga/core/effects";
import {deleteReport, filterReportByTime, getReport, searchReport} from "../../services/ReportApiServices";
import reportActions from "../actions/reportActions";

// eslint-disable-next-line camelcase
function *getReport_saga(action) {
    try {
        const response = yield call(getReport,action.payload)
        yield action.callback(response)
        if(response.statusCode === 200){
            yield put({type:reportActions.type.GET_REPORT_SUCCESS,data:response.data})
        }
    }catch (e) {
        console.log('err',e)
    }
}

// eslint-disable-next-line camelcase
function *searchReport_saga(action) {
    try {
        const response = yield call(searchReport,action.payload)
        yield action.callback(response)
        if(response.statusCode === 200){
            yield put({type:reportActions.type.SEARCH_REPORT_SUCCESS,data:response.data})
        }
    }catch (e) {
        console.log('err',e)
    }
}

// eslint-disable-next-line camelcase
function *deleteReport_saga(action) {
    try {
        const response = yield call(deleteReport,action.id)
        yield action.callback(response)
    }catch (e) {
        console.log('err',e)
    }
}


// eslint-disable-next-line camelcase
function *filterReportByTime_saga(action) {
    try {
        const response = yield call(filterReportByTime,action.payload)
        yield action.callback(response)
        if(response.statusCode === 200){
            yield put({type:reportActions.type.FILTER_REPORT_BY_TIME_SUCCESS,data:response.data})
        }
    }catch (e) {
        console.log('err',e)
    }
}

function *listen() {
    yield takeEvery(reportActions.type.GET_REPORT,getReport_saga)
    yield takeEvery(reportActions.type.SEARCH_REPORT,searchReport_saga)
    yield takeEvery(reportActions.type.DELETE_REPORT,deleteReport_saga)
    yield takeEvery(reportActions.type.FILTER_REPORT_BY_TIME,filterReportByTime_saga)
}

function *reportSaga() {
    yield all([listen()])
}
export default reportSaga