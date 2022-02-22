import PropTypes from 'prop-types';
import {Icon} from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import {styled} from '@mui/material/styles';
import {
    Box,
    Toolbar,
    Tooltip,
    IconButton,
    Typography,
    OutlinedInput,
    InputAdornment, Container, Button
} from '@mui/material';
import closeOutline from '@iconify/icons-eva/close-outline';
import {connect} from "react-redux";
import React, {useState} from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateRangePicker from "@mui/lab/DateRangePicker";
import TextField from "@mui/material/TextField";
import reportActions from "../../redux/actions/reportActions";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({theme}) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({theme}) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {width: 320, boxShadow: theme.customShadows.z8},
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`
    }
}));

// ----------------------------------------------------------------------

function ReportListToolbar({getReport, searchReport, resultTotalReport, setOnTypeFilerReport, page, size, filterReportByTime}) {

    const [valueRangeDate, setValueRangeDate] = React.useState([null, null]);
    const [search, setSearch] = useState("")

    const onChangeSearch = (e) => {
        console.log("e.target.value", e.target.value)
        setSearch(e.target.value)
        if (e.target.value.split(" ").join("") !== "") {
            const payload = {
                search: e.target.value, page, size,
            }
            searchReport(payload, (data) => {
                resultTotalReport(data.total)
                setOnTypeFilerReport(e.target.value, 1)
            })
        } else {
            reset()
        }
    }

    const onFilterByTime = () => {
        const payload = {
            start: Date.parse(valueRangeDate[0]),
            end: Date.parse(valueRangeDate[1]),
            page, size
        }
        filterReportByTime(payload, (data) => {
            resultTotalReport(data.total)
            setOnTypeFilerReport(valueRangeDate, 2)
        })
    }

    const reset = () => {
        getReport({page: 0, size}, (data) => {
            resultTotalReport(data.total)
            setOnTypeFilerReport("", 0)
        })
    }

    return (
        <RootStyle>
            <SearchStyle
                value={search}
                onChange={(e) => {
                    onChangeSearch(e)
                }}
                placeholder="Search feedback..."
                startAdornment={
                    <InputAdornment position="start">
                        <Box component={Icon} icon={searchFill} sx={{color: 'text.disabled'}}/>
                    </InputAdornment>
                }
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div style={{display: "flex"}}>
                    <DateRangePicker
                        calendars={1}
                        value={valueRangeDate}
                        onChange={(newValue) => {
                            setValueRangeDate(newValue);
                            if (newValue[0] !== null && newValue[1] !== null) {
                                console.log(Date.parse(newValue[0]))
                                console.log(newValue[0])
                                console.log(Date.parse(newValue[1]))
                                console.log(newValue[1])
                                setValueRangeDate(newValue);
                            }
                        }}
                        renderInput={(startProps, endProps) => (
                            <>
                                <TextField {...startProps} />
                                <Box sx={{mx: 2}}> to </Box>
                                <TextField {...endProps} />
                            </>
                        )}
                    />
                    <Button variant="contained" style={{marginLeft: "10px"}} onClick={() => {
                        onFilterByTime()
                    }}>
                        Search
                    </Button>
                    <Button variant="contained" style={{marginLeft: "10px", width: "20px"}} onClick={() => {
                        reset()
                    }}>
                        <Icon icon={closeOutline} fontSize="large"/>
                    </Button>
                </div>
            </LocalizationProvider>
        </RootStyle>
    );
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        getReport: (payload, callback) => {
            dispatch(reportActions.action.getReport(payload, callback))
        },
        searchReport: (payload, callback) => {
            dispatch(reportActions.action.searchReport(payload, callback))
        },
        filterReportByTime: (payload, callback) => {
            dispatch(reportActions.action.filterReportByTime(payload, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportListToolbar)

