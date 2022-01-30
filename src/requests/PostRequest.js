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
}
export default PostRequest