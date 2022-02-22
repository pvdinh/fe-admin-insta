import FeedbackRequest from "../requests/FeedbackRequest";
import ReportRequest from "../requests/ReportRequest";

export const getReport = (payload) => {
    const reportRequest = new ReportRequest()
    return reportRequest.getReport(payload)
}
export const searchReport = (payload) => {
    const reportRequest = new ReportRequest()
    return reportRequest.searchReport(payload)
}
export const deleteReport = (id) => {
    const reportRequest = new ReportRequest()
    return reportRequest.deleteReport(id)
}
export const filterReportByTime = (payload) => {
    const reportRequest = new ReportRequest()
    return reportRequest.filterReportByTime(payload)
}