import axios from "axios";
import {axiosJwt} from "../axios/axiosConfig";
import {BASE_URL} from "../url";

export default class BaseRequest {
    version = 'api/v1';

    async get(url, params = {}) {
        try {
            const response = await axiosJwt.get(`${BASE_URL}/${this.version}/${url}`, {params})
            return this._responseHandle(response)
        } catch (e) {
            this._errorHandle(e)
        }
    }

    async post(url, data = {}) {
        try {
            const response = await axiosJwt.post(`${BASE_URL}/${this.version}/${url}`, {...data})
            return this._responseHandle(response)
        } catch (e) {
            this._errorHandle(e)
        }
    }

    async postRegister(url, data = {}) {
        try {
            const response = await axios.post(`${BASE_URL}/${this.version}/${url}`, {...data})
            return this._responseHandle(response)
        } catch (e) {
            this._errorHandle(e)
        }
    }

    async postImageToCloud(url, data = {}) {
        try {
            const formData = new FormData();
            formData.append("file", data.file);
            formData.append("upload_preset", "instagram-clone");
            const response = await axios.post(`${url}`, formData)
            return response
        } catch (e) {
            this._errorHandle(e)
        }
    }

    async put(url, data = {}) {
        try {
            const response = await axiosJwt.put(`${BASE_URL}/${this.version}/${url}`, {...data})
            return this._responseHandle(response)
        } catch (e) {
            this._errorHandle(e)
        }
    }

    async delete(url, params = {}) {
        try {
            const response = await axiosJwt.delete(`${BASE_URL}/${this.version}/${url}`, {params})
            return this._responseHandle(response)
        } catch (e) {
            this._errorHandle(e)
        }
    }

    // eslint-disable-next-line class-methods-use-this
    _responseHandle(response) {
        if (response.data.statusCode === 200) {
            if (response.data.data === undefined) {
                return {
                    statusCode: response.data.statusCode,
                    data: response.data.message,
                }
            }
            if(response.data.total !== undefined){
                return {
                    statusCode: response.data.statusCode,
                    data: response.data.data,
                    total:response.data.total,
                }
            }
            return {
                statusCode: response.data.statusCode,
                data: response.data.data,
            }
        } 
            return {
                statusCode: response.data.statusCode,
                message: response.data.message,
            }

        
    }

    // eslint-disable-next-line class-methods-use-this
    _errorHandle(err) {
        if (err.response && err.response.status === 401) {
            window.location.href = "/"
        }
        throw err
    }
}