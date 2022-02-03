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
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import copyFill from "@iconify/icons-eva/copy-fill";
import {Icon} from "@iconify/react";
import Page from "../Page";
import Scrollbar from '../Scrollbar';
import {UserListHead, UserListToolbar, UserMoreMenu} from '../_dashboard/user';
//
import feedbackActions from "../../redux/actions/feedbackActions";
import {fDateTimeSuffix} from "../../utils/formatTime";
import {axiosJwt} from "../../axios/axiosConfig";
import FeedbackListToolbar from "./FeedbackListToolbar";
import ModalUserAccountSetting from "./ModalUserAccountSetting";
import {BASE_URL} from "../../url";


const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'idUser', label: 'idUser', alignRight: false},
    {id: 'subject', label: 'subject', alignRight: false},
    {id: 'content', label: 'content', alignRight: false},
    {id: 'dateCreated', label: 'dateCreated', alignRight: false},
    {id: 'actions', label: 'actions', alignRight: false}
];

function FeedbackComponent(props) {
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [type, setType] = useState(0);
    const [search, setSearch] = useState("")
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [visible,setVisible] = useState(false)
    const [uIdClick,setUIdClick] = useState("")

    const [alert, setAlert] = React.useState(false);

    useEffect(() => {
        if (type === 1) {
            const payload = {
                search, page, size: rowsPerPage,
            }
            props.searchFeedback(payload, (data) => {
                setTotal(data.total)
            })
        } else {
            props.getFeedback({page, size: rowsPerPage}, (data) => {
                setTotal(data.total)
            })
        }
    }, [page, rowsPerPage])

    useEffect(() => {
        axiosJwt.get(`${BASE_URL}/api/v1/admin/manage-feedback`).then((res) => {
            props.getFeedback({page, size: rowsPerPage}, (data) => {
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

    const resultTotalFeedback = (t) => {
        setTotal(t);
    };

    const setOnTypeFilerFeedback = (s, t) => {
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

    const onCopy = (s,e) =>{
        navigator.clipboard.writeText(s)
        handleClick()
        e.stopPropagation();
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
                    <FeedbackListToolbar page={page} size={rowsPerPage} resultTotalFeedback={(t) => {
                        resultTotalFeedback(t)
                    }} setOnTypeFilerFeedback={(s, t) => {
                        setOnTypeFilerFeedback(s, t)
                    }}/>

                    <Scrollbar>
                        <TableContainer sx={{minWidth: 800}}>
                            <Table>
                                <UserListHead
                                    headLabel={TABLE_HEAD}
                                />
                                <TableBody>
                                    {props.listFeedback.map((row) => {
                                        const {id, idUser, subject, content, dateCreated} = row;
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
                                                    onCopy(idUser, e)}} /> </TableCell>
                                                    <TableCell align="left">{subject}</TableCell>
                                                    <TableCell align="left">{content}</TableCell>
                                                    <TableCell align="left">{fDateTimeSuffix(dateCreated)}</TableCell>

                                                    <TableCell align="right">
                                                        <UserMoreMenu/>
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
        listFeedback: state.feedback.listFeedback,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getFeedback: (payload, callback) => {
            dispatch(feedbackActions.action.getFeedback(payload, callback))
        },
        searchFeedback: (payload, callback) => {
            dispatch(feedbackActions.action.searchFeedback(payload, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackComponent)
