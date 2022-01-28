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
}
export default FeedbackRequest