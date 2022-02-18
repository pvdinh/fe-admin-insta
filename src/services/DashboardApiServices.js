import DashboardRequest from "../requests/DashboardRequest";

export const getStatisticalOverview = () =>{
    const dashboardRequest = new DashboardRequest()
    return dashboardRequest.statisticalOverview()
}

export const getPercentageAuthUser = () =>{
    const dashboardRequest = new DashboardRequest()
    return dashboardRequest.getPercentageAuthUser()
}

export const chartQuantityPostUser = (year) =>{
    const dashboardRequest = new DashboardRequest()
    return dashboardRequest.chartQuantityPostUser(year)
}