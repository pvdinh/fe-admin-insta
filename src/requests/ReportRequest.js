import BaseRequest from "./BaseRequest";

class ReportRequest extends BaseRequest{
    getReport(payload){
        const url = `admin/manage-report?page=${payload.page}&size=${payload.size}`
        return this.get(url)
    }

    searchReport(payload){
        const url = `admin/manage-report/${payload.search}/search?page=${payload.page}&size=${payload.size}`
        return this.get(url)
    }

    deleteReport(id){
        const url = `admin/manage-report/${id}/delete`
        return this.delete(url)
    }

    filterReportByTime(payload){
        const url = `admin/manage-report/filter?start=${payload.start}&end=${payload.end}&page=${payload.page}&size=${payload.size}`
        return this.get(url)
    }
}
export default ReportRequest