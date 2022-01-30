import {combineReducers} from "redux";
import feedbackReducer from "./feedbackReducer";
import homeReducer from "./homeReducer";
import userAccountReducer from "./userAccountReducer";
import reportReducer from "./reportReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
        feedback: feedbackReducer,
        home: homeReducer,
        userAccount: userAccountReducer,
        report: reportReducer,
        post: postReducer,
    }
)
export default rootReducer