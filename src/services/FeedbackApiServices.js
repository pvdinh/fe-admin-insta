import FeedbackRequest from "../requests/FeedbackRequest";

export const getFeedback = (payload) => {
    const feedbackRequest = new FeedbackRequest()
    return feedbackRequest.getFeedback(payload)
}