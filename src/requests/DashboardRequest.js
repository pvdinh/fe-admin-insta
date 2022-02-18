import BaseRequest from "./BaseRequest";

class DashboardRequest extends BaseRequest{
    statisticalOverview(){
        const url = `admin/dashboard/overview`
        return this.get(url)
    }

    getPercentageAuthUser(){
        const url = `admin/dashboard/percentage-auth`
        return this.get(url)
    }

    chartQuantityPostUser(year){
        const url = `admin/dashboard/${year}/chart-data`
        return this.get(url)
    }
}
export default DashboardRequest