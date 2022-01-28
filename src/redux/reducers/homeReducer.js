import homeActions from "../actions/homeActions";

const initState = {
    userAccountProfile: {},
}
const homeReducer = (state = initState, action) => {
    switch (action.type) {
        case homeActions.type.GET_USER_ACCOUNT_PROFILE_SUCCESS:
            return {...state, userAccountProfile: action.data}
        default :
            return {...state}
    }
}
export default homeReducer