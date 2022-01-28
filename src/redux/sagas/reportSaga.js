import {all, call, put, takeEvery} from "@redux-saga/core/effects";
import {getReport, searchReport} from "../../services/ReportApiServices";
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

function *listen() {
    yield takeEvery(reportActions.type.GET_REPORT,getReport_saga)
    yield takeEvery(reportActions.type.SEARCH_REPORT,searchReport_saga)
}

function *reportSaga() {
    yield all([listen()])
}
export default reportSaga