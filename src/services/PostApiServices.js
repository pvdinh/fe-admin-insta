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

export const getAllUserLikedPost = (pId) =>{
    const postRequest = new PostRequest()
    return postRequest.getAllUserLikedPost(pId)
}

export const getAllPost = (payload) =>{
    const postRequest = new PostRequest()
    return postRequest.getAllPost(payload)
}

export const searchPost = (payload) =>{
    const postRequest = new PostRequest()
    return postRequest.searchPost(payload)
}

export const blockPost = (pId) =>{
    const postRequest = new PostRequest()
    return postRequest.blockPost(pId)
}

export const unBlockPost = (pId) =>{
    const postRequest = new PostRequest()
    return postRequest.unBlockPost(pId)
}

export const getPostBlockByPostId = (pId) =>{
    const postRequest = new PostRequest()
    return postRequest.getPostBlockByPostId(pId)
}

export const deleteComment = (id) =>{
    const postRequest = new PostRequest()
    return postRequest.deleteComment(id)
}
