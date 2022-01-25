import { Navigate } from 'react-router-dom';
import React from "react";

const ProtectedRoute = (props) => (
        localStorage.getItem("sessionTokenAdmin") ? {...props} : <Navigate to="/login"/>
    )
export default ProtectedRoute