import PostRequest from "../requests/PostRequest";

export const getPostInformationFromPId = (pId) =>{
    const postRequest = new PostRequest()
    return postRequest.getPostInformationFromPId(pId)
}

export const getAllCommentInPost = (pId) =>{
    const postRequest = new PostRequest()
    return postRequest.getAllCommentInPost(pId)
}

export const getAllUserSavedPost = (pId) =>{
    const postRequest = new PostRequest()
    return postRequest.getAllUserSavedPost(pId)
}