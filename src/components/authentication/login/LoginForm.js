import * as Yup from 'yup';
import React, {useEffect, useState} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {connect} from "react-redux";
import loginActions from "../../../redux/actions/loginActions";

// ----------------------------------------------------------------------

function LoginForm(props) {
  const navigate = useNavigate();

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [checkSubmit, setCheckSubmit] = useState(false);





  useEffect(()=>{
    if(username.split(" ").join("") !== "" && password.split(" ").join("") !== ""){
      setCheckSubmit(true)
    }else {
      setCheckSubmit(false)
    }
  },[username,password])

  const onChangeUsername = (e) =>{
    setUsername(e.target.value)
  }

  const onChangePassword = (e) =>{
    setPassword(e.target.value)
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {

    }
  }
  );

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Username"
            {...getFieldProps('email')}
            value={username}
            onChange={(e)=>{onChangeUsername(e)}}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            value={password}
            onChange={(e)=>{onChangePassword(e)}}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        {
          checkSubmit ?
              <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  onClick={()=>{
                    console.log("XXXXXXXXx")
                    props.login(username,password,()=>{})
                  }}
              >
                Login
              </LoadingButton>
              :
              <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled
              >
                Login
              </LoadingButton>

        }
      </Form>
    </FormikProvider>
  );
}
function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    login:(username,password,callback) =>{
      dispatch(loginActions.action.login(username,password,callback))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)

