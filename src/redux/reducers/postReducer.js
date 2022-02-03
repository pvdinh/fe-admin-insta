import postActions from "../actions/postActions";

const initState ={
    listPost:[],
    listResultSearchPost:[],
}
const postReducer = (state = initState,action) =>{
    switch (action.type) {
        case postActions.type.GET_ALL_POST_SUCCESS:
            return {...state,listPost: action.data}
        case postActions.type.FETCH_MORE_POST_SUCCESS:
            return {...state,listPost: [...state.listPost,...action.data]}
        case postActions.type.SEARCH_POST_SUCCESS:
            return {...state,listResultSearchPost: action.data}
        default:
            return {...state}
    }
}
export default postReducer