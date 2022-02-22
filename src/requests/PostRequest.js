import BaseRequest from "./BaseRequest";

class PostRequest extends BaseRequest{
    getPostInformationFromPId(pId){
        const url = `admin/manage-post/${pId}/get`
        return this.get(url)
    }

    getAllCommentInPost(pId){
        const url = `admin/manage-post/${pId}/comment`
        return this.get(url)
    }

    getAllUserSavedPost(pId){
        const url = `admin/manage-post/${pId}/get-user-saved`
        return this.get(url)
    }

    getAllUserLikedPost(pId){
        const url = `admin/manage-post/${pId}/get-user-liked`
        return this.get(url)
    }

    getAllPost(payload){
        const url = `admin/manage-post/get-all-post?filter=${payload.filter}&page=${payload.page}&size=${payload.size}`
        return this.get(url)
    }

    searchPost(payload){
        const url = `admin/manage-post/${payload.search}/search?page=${payload.page}&size=${payload.size}`
        return this.get(url)
    }

    blockPost(pId){
        const url = `admin/manage-post/${pId}/block`
        return this.post(url)
    }

    unBlockPost(pId){
        const url = `admin/manage-post/${pId}/unblock`
        return this.post(url)
    }

    getPostBlockByPostId(pId){
        const url = `admin/manage-post/block?id=${pId}`
        return this.get(url)
    }

    deleteComment(id){
        const url = `admin/manage-post/${id}/delete-comment`
        return this.delete(url)
    }
}
export default PostRequest