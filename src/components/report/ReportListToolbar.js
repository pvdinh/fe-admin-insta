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
    InputAdornment
} from '@mui/material';
import {connect} from "react-redux";
import {useState} from "react";
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

function ReportListToolbar({getReport,searchReport, resultTotalReport, setOnTypeFilerReport, page, size}) {

    const [search, setSearch] = useState("")

    const onChangeSearch = (e) => {
        console.log("e.target.value",e.target.value)
        setSearch(e.target.value)
        if(e.target.value.split(" ").join("") !== ""){
            const payload = {
                search: e.target.value, page, size,
            }
            searchReport(payload, (data) => {
                resultTotalReport(data.total)
                setOnTypeFilerReport(e.target.value, 1)
            })
        }else {
            getReport({page:0, size}, (data) => {
                resultTotalReport(data.total)
                setOnTypeFilerReport("",0)
            })
        }
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
            <Tooltip title="Filter list">
                <IconButton>
                    <Icon icon={roundFilterList}/>
                </IconButton>
            </Tooltip>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportListToolbar)

