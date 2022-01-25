import feedbackActions from "../actions/feedbackActions";

const initState = {
    listFeedback: []
}
const feedbackReducer = (state = initState, action) => {
    switch (action.type) {
        case feedbackActions.type.GET_FEEDBACK_SUCCESS:
            return {...state, listFeedback: action.data}
        default:
            return {...state}
    }
}
export default feedbackReducer