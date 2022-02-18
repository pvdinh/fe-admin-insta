import {merge} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {Card, CardHeader, Box, Stack, TextField, MenuItem, Container} from '@mui/material';
//
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {BaseOptionChart} from '../../charts';
import dashBoardActions from "../../../redux/actions/dashBoardActions";
import {axiosJwt} from "../../../axios/axiosConfig";
import {BASE_URL} from "../../../url";

// ----------------------------------------------------------------------

const CHART_DATA = [
    {
        name: 'Posts',
        type: 'area',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        name: 'Users',
        type: 'area',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
];

function AppWebsiteVisits(props) {

    const [year, setYear] = useState("2022")
    const [chartData, setChartData] = useState(CHART_DATA)

    useEffect(() => {
        axiosJwt.get(`${BASE_URL}/api/v1/user-account-setting/get`).then((res) => {
            props.chartQuantityPostUser(year, (data) => {
                setData(data)
            })
        }).catch((err) => {
            console.log('err', err)
        })
    }, [])

    const setData = (data) => {
        const dt = [
            {
                name: 'Posts',
                type: 'area',
                data: Object.values(data.post)
            },
            {
                name: 'Users',
                type: 'area',
                data: Object.values(data.user)
            }
        ];
        setChartData(dt)
    }

    const chartOptions = merge(BaseOptionChart(), {
        stroke: {width: [0, 2, 3]},
        plotOptions: {bar: {columnWidth: '11%', borderRadius: 4}},
        fill: {type: ['solid', 'gradient', 'solid']},
        labels: [
            '01/01/2021',
            '02/01/2021',
            '03/01/2021',
            '04/01/2021',
            '05/01/2021',
            '06/01/2021',
            '07/01/2021',
            '08/01/2021',
            '09/01/2021',
            '10/01/2021',
            '11/01/2021',
            '12/01/2021'
        ],
        min: new Date('01/01/2021').getTime(),
        xaxis: {categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],},
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y) => {
                    if (typeof y !== 'undefined') {
                        return `${y.toFixed(0)} users`;
                    }
                    return y;
                }
            }
        }
    });

    return (
        <Card>
            <CardHeader title="Chart quantity post and user" subheader=""/>
            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between"
                   style={{paddingLeft: "24px", paddingTop: "10px"}}>
                <TextField select size="small" value={year} onChange={(e) => {
                    console.log(new Date().getFullYear())
                    setYear(e.target.value)
                    props.chartQuantityPostUser(e.target.value, (data) => {
                        setData(data)
                    })
                }}>
                    <MenuItem key="2021" value={2021}>
                        2021
                    </MenuItem>
                    <MenuItem key="2022" value={2022}>
                        2022
                    </MenuItem>
                </TextField>
            </Stack>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart type="line" series={chartData} options={chartOptions} height={364}/>
            </Box>
        </Card>
    );
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        chartQuantityPostUser: (year, callback) => {
            dispatch(dashBoardActions.action.chartQuantityPostUser(year, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWebsiteVisits)