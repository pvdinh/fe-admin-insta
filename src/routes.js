import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import React from "react";
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import FeedbackComponent from "./components/feedback/FeedbackComponent";
import ReportComponent from "./components/report/ReportComponent";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: localStorage.getItem("sessionTokenAdmin") ? <DashboardApp /> : <Navigate to="/login"/>},
        { path: 'app', element: localStorage.getItem("sessionTokenAdmin") ? <DashboardApp /> : <Navigate to="/login"/>},
        { path: 'user', element: localStorage.getItem("sessionTokenAdmin") ? <User /> : <Navigate to="/login"/> },
        // { path: 'products', element:  localStorage.getItem("sessionTokenAdmin") ? <Products /> : <Navigate to="/login"/> },
        { path: 'post', element:  localStorage.getItem("sessionTokenAdmin") ? <Blog /> : <Navigate to="/login"/> },
        { path: 'feedback', element:  localStorage.getItem("sessionTokenAdmin") ? <FeedbackComponent /> : <Navigate to="/login"/> },
        { path: 'report', element:  localStorage.getItem("sessionTokenAdmin") ? <ReportComponent /> : <Navigate to="/login"/> },
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
