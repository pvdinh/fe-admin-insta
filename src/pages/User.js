import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import React, {useEffect, useState} from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import {connect} from "react-redux";
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';
import {axiosJwt} from "../axios/axiosConfig";
import {BASE_URL} from "../url";
import reportActions from "../redux/actions/reportActions";
import userAccountActions from "../redux/actions/userAccountActions";
import ModalUserAccountSetting from "../components/feedback/ModalUserAccountSetting";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'displayName', label: 'DisplayName', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'auth', label: 'Auth', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------


function User(props) {
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState(0);
  const [search, setSearch] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [visibleModalUser,setVisibleModalUser] = useState(false)
  const [uIdClick,setUIdClick] = useState("")

  useEffect(()=>{
    if(type === 1){
      const payload = {
        search, page, size: rowsPerPage,
      }
      props.searchUser(payload, (data) => {
        setTotal(data.total)
      })
    }else {
      props.getAllUser({page, size: rowsPerPage}, (data) => {
        setTotal(data.total)
      })
    }
  },[rowsPerPage,page])

  useEffect(() => {
    axiosJwt.get(`${BASE_URL}/api/v1/admin/manage-user`).then((res) => {
      props.getAllUser({page, size: rowsPerPage}, (data) => {
        setTotal(data.total)
      })
    }).catch((err) => {
      console.log('err', err)
    })
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const setOnTypeFilerReport = (s, t) => {
    setSearch(s)
    setType(t)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const showModalUserAccountSetting = () =>{
    if(uIdClick !== ""){
      return(
          <ModalUserAccountSetting uId={uIdClick} visible={visibleModalUser} setVisible={()=>{setVisibleModalUser(false)}} />
      )
    }
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar page={page} size={rowsPerPage} resultTotalSearch={(t) => {
            setTotal(t)
          }} setOnTypeFilerReport={(s, t) => {
            setOnTypeFilerReport(s, t)
          }}/>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                  rowCount={total}
                />
                <TableBody>
                  {props.listUser.map((row) => {
                      const { id, username, displayName, email, phoneNumber, authProvider } = row.userAccount;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                        >
                          <TableCell align="left" onClick={()=>{setVisibleModalUser(true);setUIdClick(id)}}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={username} src={row.userAccountSetting.profilePhoto} />
                              <Typography variant="subtitle2" noWrap>
                                {username}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left" onClick={()=>{setVisibleModalUser(true);setUIdClick(id)}}>{displayName}</TableCell>
                          <TableCell align="left" onClick={()=>{setVisibleModalUser(true);setUIdClick(id)}}>{email}</TableCell>
                          <TableCell align="left" onClick={()=>{setVisibleModalUser(true);setUIdClick(id)}}>{phoneNumber}</TableCell>
                          <TableCell align="left" onClick={()=>{setVisibleModalUser(true); setUIdClick(id)}}>
                              <Label
                                variant="ghost"
                                color='success'
                              >
                                {authProvider}
                              </Label>
                          </TableCell>
                          {/* <TableCell align="left"> */}
                          {/*  <Label */}
                          {/*    variant="ghost" */}
                          {/*    color='success' */}
                          {/*  > */}
                          {/*    {sentenceCase("active")} */}
                          {/*  </Label> */}
                          {/* </TableCell> */}

                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
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
    </Page>
  );
}
function mapStateToProps(state) {
  return {
    listUser:state.userAccount.listUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllUser:(payload,callback)=>{
      dispatch(userAccountActions.action.getAllUser(payload,callback))
    },
    searchUser:(payload,callback)=>{
      dispatch(userAccountActions.action.searchUser(payload,callback))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
