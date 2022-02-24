import userAccountActions from "../actions/userAccountActions";

const initState = {
    listUser: [],
}
const userAccountReducer = (state = initState, action) => {
    switch (action.type) {
        case userAccountActions.type.GET_ALL_USER_SUCCESS:
            return {...state, listUser: action.data}
        case userAccountActions.type.SEARCH_USER_SUCCESS:
            return {...state, listUser: action.data}
        case userAccountActions.type.FILTER_USER_BY_TIME_SUCCESS:
            return {...state, listUser: action.data}
        default:
            return {...state}
    }
}
export default userAccountReducer