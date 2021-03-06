import FeedbackRequest from "../requests/FeedbackRequest";

export const getFeedback = (payload) => {
    const feedbackRequest = new FeedbackRequest()
    return feedbackRequest.getFeedback(payload)
}
export const searchFeedback = (payload) => {
    const feedbackRequest = new FeedbackRequest()
    return feedbackRequest.searchFeedback(payload)
}
export const deleteFeedback = (id) => {
    const feedbackRequest = new FeedbackRequest()
    return feedbackRequest.deleteFeedback(id)
}
export const filterFeedbackByTime = (payload) => {
    const feedbackRequest = new FeedbackRequest()
    return feedbackRequest.filterFeedbackByTime(payload)
}