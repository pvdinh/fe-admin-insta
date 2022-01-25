const type={
    GET_FEEDBACK:"GET_FEEDBACK",
    GET_FEEDBACK_SUCCESS:"GET_FEEDBACK_SUCCESS",
}
const action={
    getFeedback:(payload,callback)=>({
            type:type.GET_FEEDBACK,
            payload,
            callback,
        })
}
export default {type,action}