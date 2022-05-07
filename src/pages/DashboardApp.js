// material
import {Box, Grid, Container, Typography} from '@mui/material';
// components
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import Page from '../components/Page';
import {
    AppWebsiteVisits,
    AppTrafficBySite,
} from '../components/_dashboard/app';
import TotalUserComponent from "../components/_dashboard/app/TotalUserComponent";
import TotalPostComponent from "../components/_dashboard/app/TotalPostComponent";
import TotalFeedbackComponent from "../components/_dashboard/app/TotalFeedbackComponent";
import TotalReportComponent from "../components/_dashboard/app/TotalReportComponent";
import dashBoardActions from "../redux/actions/dashBoardActions";
import {axiosJwt} from "../axios/axiosConfig";
import {BASE_URL} from "../url";
import PercentageAuthUser from "../components/_dashboard/app/PercentageAuthUser";

// ----------------------------------------------------------------------

function DashboardApp(props) {

    const [statisticalOverview, setStatisticalOverview] = useState({})
    const [percentageAuthUser, setPercentageAuthUser] = useState([])

    useEffect(() => {
      axiosJwt.get(`${BASE_URL}/api/v1/user-account-setting/get`).then((res) => {
          console.log(res)
        props.getStatisticalOverview((data)=>{
          setStatisticalOverview(data)
        })
          props.getPercentageAuthUser((data)=>{
              setPercentageAuthUser(Object.values(data))
          })
      }).catch((err) => {
        console.log('err', err)
      })
    }, [])

    return (
        <Page title="Dashboard | Minimal-UI">
            <Container maxWidth="xl">
                <Box sx={{pb: 5}}>
                    <Typography variant="h4">Hi, Welcome back</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <TotalUserComponent total={statisticalOverview.totalUser}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TotalPostComponent total={statisticalOverview.totalPost}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TotalFeedbackComponent total={statisticalOverview.totalFeedback}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TotalReportComponent total={statisticalOverview.totalReport}/>
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppWebsiteVisits/>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <PercentageAuthUser data={percentageAuthUser} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppTrafficBySite/>
                    </Grid>

                </Grid>
            </Container>
        </Page>
    );
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        getStatisticalOverview: (callback) => {
            dispatch(dashBoardActions.action.getStatisticalOverview(callback))
        },
        getPercentageAuthUser: (callback) => {
            dispatch(dashBoardActions.action.getPercentageAuthUser(callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardApp)
