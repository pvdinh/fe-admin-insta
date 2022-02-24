import PropTypes from 'prop-types';
import {Icon} from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
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
    InputAdornment, Button
} from '@mui/material';
import {connect} from "react-redux";
import React, {useState} from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateRangePicker from "@mui/lab/DateRangePicker";
import TextField from "@mui/material/TextField";
import closeOutline from "@iconify/icons-eva/close-outline";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import reportActions from "../../../redux/actions/reportActions";
import userAccountActions from "../../../redux/actions/userAccountActions";

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

function UserListToolbar(props) {

    const [valueRangeDate, setValueRangeDate] = React.useState([null, null]);
    const [search, setSearch] = useState("")

    const onSearch = (e) => {
        setSearch(e.target.value)
        if (e.target.value.split(" ").join("") !== "") {
            const payload = {
                search: e.target.value, page: props.page, size: props.size,
            }
            props.searchUser(payload, (data) => {
                props.resultTotalSearch(data.total)
                props.setOnTypeFilerReport(e.target.value, 1)
            })
        } else {
            reset()
        }
    }

    const onFilterByTime = () => {
        const payload = {
            start: Date.parse(valueRangeDate[0]),
            end: Date.parse(valueRangeDate[1]),
            page: props.page, size: props.size,
        }
        props.filterUserByTime(payload, (data) => {
            props.resultTotalSearch(data.total)
            props.setOnTypeFilerReport(valueRangeDate, 2)
        })
    }

    const reset = () => {
        props.getAllUser({page: 0, size: props.size}, (data) => {
            props.resultTotalSearch(data.total)
            props.setOnTypeFilerReport("", 0)
        })
    }

    return (
        <RootStyle>
            <SearchStyle
                value={search}
                onChange={(e) => {
                    onSearch(e)
                }}
                placeholder="Search user by username or id..."
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
                                setValueRangeDate(newValue)
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
                        setValueRangeDate([null, null])
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
        getAllUser: (payload, callback) => {
            dispatch(userAccountActions.action.getAllUser(payload, callback))
        },
        searchUser: (payload, callback) => {
            dispatch(userAccountActions.action.searchUser(payload, callback))
        },
        filterUserByTime: (payload, callback) => {
            dispatch(userAccountActions.action.filterUserByTime(payload, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListToolbar)
