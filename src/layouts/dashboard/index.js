import {useEffect, useState} from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import {connect} from "react-redux";
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import homeActions from "../../redux/actions/homeActions";
import {axiosJwt} from "../../axios/axiosConfig";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

function DashboardLayout(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axiosJwt.get(`http://localhost:8080/api/v1/user-account-setting/get`).then((res) => {
      props.getUserAccountProfile(() => {
      })
    }).catch((err) => {
      console.log('err', err)
    })
  }, [])

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
function mapStateToProps(state) {
  return {
    userAccountProfile:state.home.userAccountProfile,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUserAccountProfile:(callback) =>{
      dispatch(homeActions.action.getUserAccountProfile(callback))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(DashboardLayout)

