import React, {useEffect, useState} from "react";

// material
import {
    Card,
    Table,
    Stack,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination, Box
} from '@mui/material';
// components
import {connect} from "react-redux";
import copyFill from '@iconify/icons-eva/copy-fill';
import {Icon} from "@iconify/react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import Page from "../Page";
import Scrollbar from '../Scrollbar';
import {UserListHead, UserListToolbar, UserMoreMenu} from '../_dashboard/user';
//
import {fDateTimeSuffix} from "../../utils/formatTime";
import {axiosJwt} from "../../axios/axiosConfig";
import reportActions from "../../redux/actions/reportActions";
import ModalUserAccountSetting from "../feedback/ModalUserAccountSetting";
import ReportListToolbar from "./ReportListToolbar";
import ModalDetailPost from "./ModalDetailPost";
import {BASE_URL} from "../../url";
import ReportMoreMenu from "./ReportMoreMenu";
import FeedbackMoreMenu from "../feedback/FeedbackMoreMenu";
// ----------------------------------------------------------------------

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const TABLE_HEAD = [
    {id: 'idUser', label: 'idUser', alignRight: false},
    {id: 'idPost', label: 'idPost', alignRight: false},
    {id: 'reportContent', label: 'reportContent', alignRight: false},
    {id: 'dateCreated', label: 'dateCreated', alignRight: false},
    {id: 'actions', label: 'actions', alignRight: false}
];

function ReportComponent(props) {
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [type, setType] = useState(0);
    const [search, setSearch] = useState("")
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [visible,setVisible] = useState(false)
    const [visibleModalDetailPost,setVisibleModalDetailPost] = useState(false)
    const [uIdClick,setUIdClick] = useState("")
    const [pIdClick,setPIdClick] = useState("")


    const [alert, setAlert] = React.useState(false);


    useEffect(() => {
        console.log(type)
        console.log(search)
        if (type === 1) {
            const payload = {
                search, page, size: rowsPerPage,
            }
            props.searchReport(payload, (data) => {
                setTotal(data.total)
            })
        } else {
            props.getReport({page, size: rowsPerPage}, (data) => {
                setTotal(data.total)
            })
        }
    }, [page, rowsPerPage])

    useEffect(() => {
        axiosJwt.get(`${BASE_URL}/api/v1/admin/manage-report`).then((res) => {
            props.getReport({page, size: rowsPerPage}, (data) => {
                setTotal(data.total)
            })
        }).catch((err) => {
            console.log('err', err)
        })
    }, [])

    const handleClick = () => {
        setAlert(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const resultTotalReport = (t) => {
        setTotal(t);
    };

    const setOnTypeFilerReport = (s, t) => {
        setSearch(s)
        setType(t)
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

    const showModalUserAccountSetting = () =>{
        if(uIdClick !== ""){
            return(
                <ModalUserAccountSetting uId={uIdClick} visible={visible} setVisible={()=>{setVisible(false)}} />
            )
        }
    }

    const showModalDetailPost = () =>{
        if(pIdClick !== ""){
            return(
                <ModalDetailPost pId={pIdClick} visible={visibleModalDetailPost} setVisible={()=>{setVisibleModalDetailPost(false)}} />
            )
        }
    }

    const onCopy = (s,e) =>{
        navigator.clipboard.writeText(s)
        handleClick()
        e.stopPropagation();
    }


    const reload = () =>{
        props.getReport({page, size: rowsPerPage}, (data) => {
            setTotal(data.total)
        })
    }

    return (
        <Page title="User | Minimal-UI">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Feedback
                    </Typography>
                </Stack>

                <Card>
                    <ReportListToolbar page={page} size={rowsPerPage} resultTotalReport={(t) => {
                        resultTotalReport(t)
                    }} setOnTypeFilerReport={(s, t) => {
                        setOnTypeFilerReport(s, t)
                    }}/>

                    <Scrollbar>
                        <TableContainer sx={{minWidth: 800}}>
                            <Table>
                                <UserListHead
                                    headLabel={TABLE_HEAD}
                                />
                                <TableBody>
                                    {props.listReport.map((row) => {
                                        const {id, idUser, idPost, reportContent, dateCreated} = row;
                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                            >
                                                <TableCell style={{cursor: "pointer"}} align="left" onClick={() => {
                                                    setUIdClick(idUser);
                                                    setVisible(true)
                                                }}>{idUser} <Box component={Icon} icon={copyFill}
                                                                 sx={{width: 20, height: 20, ml: 0.5}} onClick={(e) => {
                                                    onCopy(idUser,e)
                                                }}/></TableCell>
                                                <TableCell style={{cursor: "pointer"}} align="left" onClick={() => {
                                                    setPIdClick(idPost);
                                                    setVisibleModalDetailPost(true)
                                                }}>{idPost} <Box component={Icon} icon={copyFill}
                                                                 sx={{width: 20, height: 20, ml: 0.5}} onClick={(e) => {
                                                    onCopy(idPost,e)
                                                }}/></TableCell>
                                                <TableCell align="left">{reportContent}</TableCell>
                                                <TableCell align="left">{fDateTimeSuffix(dateCreated)}</TableCell>

                                                <TableCell align="right">
                                                    <ReportMoreMenu id={id} reload={()=>{reload()}} />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 53 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
            {
                showModalUserAccountSetting()
            }
            {
                showModalDetailPost()
            }
            <Snackbar open={alert} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Copied!
                </Alert>
            </Snackbar>
        </Page>
    );
}

function mapStateToProps(state) {
    return {
        listReport: state.report.listReport,
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportComponent)
