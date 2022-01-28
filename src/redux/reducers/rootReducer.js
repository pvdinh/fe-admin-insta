import {combineReducers} from "redux";
import feedbackReducer from "./feedbackReducer";
import homeReducer from "./homeReducer";
import userAccountReducer from "./userAccountReducer";

const rootReducer = combineReducers({
        feedback: feedbackReducer,
        home: homeReducer,
        userAccount: userAccountReducer,
    }
)
export default rootReducer