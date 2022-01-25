import axios from "axios";
import {BASE_URL} from "../url";

export const axiosJwt = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Authorization': localStorage.getItem('sessionTokenAdmin') ? `Bearer ${  localStorage.getItem('sessionTokenAdmin')}` : 'Bearer ',
        'Content-Type': 'application/json',
    }
})