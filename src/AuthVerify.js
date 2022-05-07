// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

export const verifyToken = (token) => {
    try {
        const decoded = jwt_decode(token);
        if (decoded.exp < Math.round(new Date().getTime() / 1000)) {
            localStorage.removeItem("sessionTokenAdmin")
            return false;
        }
        return true;
    } catch (e) {
        localStorage.removeItem("sessionTokenAdmin")
        return false;
    }
}