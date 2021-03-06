import BaseRequest from "./BaseRequest";

class FeedbackRequest extends BaseRequest{
    getFeedback(payload){
        const url = `admin/manage-feedback?page=${payload.page}&size=${payload.size}`
        return this.get(url)
    }

    searchFeedback(payload){
        const url = `admin/manage-feedback/${payload.search}/search?page=${payload.page}&size=${payload.size}`
        return this.get(url)
    }

    deleteFeedback(id){
        const url = `admin/manage-feedback/${id}/delete`
        return this.delete(url)
    }

    filterFeedbackByTime(payload){
        const url = `admin/manage-feedback/filter?start=${payload.start}&end=${payload.end}&page=${payload.page}&size=${payload.size}`
        return this.get(url)
    }
}
export default FeedbackRequest