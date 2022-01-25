import BaseRequest from "./BaseRequest";

class FeedbackRequest extends BaseRequest{
    getFeedback(payload){
        const url = `admin/manage-feedback?page=${payload.page}&size=${payload.size}`
        return this.get(url,payload)
    }
}
export default FeedbackRequest