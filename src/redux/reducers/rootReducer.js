import {combineReducers} from "redux";
import feedbackReducer from "./feedbackReducer";

const rootReducer = combineReducers({
        feedback: feedbackReducer,
    }
)
export default rootReducer