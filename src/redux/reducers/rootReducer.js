import {combineReducers} from "redux";
import feedbackReducer from "./feedbackReducer";
import homeReducer from "./homeReducer";
import userAccountReducer from "./userAccountReducer";
import reportReducer from "./reportReducer";

const rootReducer = combineReducers({
        feedback: feedbackReducer,
        home: homeReducer,
        userAccount: userAccountReducer,
        report: reportReducer,
    }
)
export default rootReducer