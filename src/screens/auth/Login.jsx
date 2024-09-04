import React from 'react'
import GeneralStyles from '../../styles/General.module.css'
import LoginStyles from '../../styles/Login.module.css'
import { useFormik } from 'formik' 
import * as Yup from 'yup';
import UserService from '../../services/UserService';
import { setUser } from '../../redux/reducers/UserSlice';
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/auth/useAuth';
// import {useSignIn} from 'react-auth-kit'
import {
    Grid,
    TextField,
    Button,
    Toolbar,
    Link,
    Box
  } from '@mui/material';

const Login = () => {

    //const {generate} = useGuid();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {saveCookie} = useAuth();


    const userService = UserService();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
          },
          validationSchema:Yup.object({
            email: Yup.string()
            .max(256, "Enter less than 256 characters")
            .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',"Enter a valid email")
            .required("This field is required"),
            password: Yup.string()
            .max(256, "Enter less than 256 characters")
            .required("This field is required")
          }),
          onSubmit: async values => {
            //local
            const users = JSON.parse(localStorage.getItem('users'));
            if (users) {
                const foundUser = users.filter(user=>user.email == values.email &&user.password==values.password)
                if(foundUser.length > 0){
                    //const token = generate();
                    saveCookie({
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NTEwMTZhYy1lMmZhLTRhNjAtMWFmZi0wOGRjMDI3ODdhMWIiLCJnaXZlbl9uYW1lIjoiVGVzdCIsImZhbWlseV9uYW1lIjoiVGVzdCIsInVuaXF1ZV9uYW1lIjoiNSIsImdlbmRlciI6IlRydWUiLCJpc3MiOiJJQ2xvdWROZXR3b3JraW5nIiwiYXVkIjoiRW1wbG95ZWVycyJ9.vjqbaVMdD4sra1_0tu8Te3oTWgqzrpMROoaQR0-IGXo",
                        expires: 1,
                    })
                    navigate("/")
                }
            }

            //backend
            //await userService.LogIn(values)
            // .then(res=>{
            //     const token = res.data;
            //     saveCookie({
            //         token: token,
            //         expires: 1,
            //     })
            //     navigate("/")
            // })
            // .catch(err=>{
            //     console.log(err)
            // })
          }
    })

    const passwordKeyDown = (e) => {
        if(e.keyCode == 13){
            formik.handleSubmit();
        }
    }
  return (
    <div
        className={LoginStyles.backgroundImage}
    >
        <div
            className={LoginStyles.loginSection+" "+LoginStyles.loginWith}
        >
            <p className={LoginStyles.logo}>ICloudNetworking</p>
            <Grid 
            container
            direction="row"
            width='100%'
            spacing={3}
            >
                <Grid item xs={12}>
                        <TextField
                        label="Email" 
                        error={formik.errors.email?true:false}
                        value={formik.values.email} 
                        onChange={formik.handleChange('email')}
                        helperText={formik.errors.email}
                        sx={{
                            width:'100%'
                        }}
                        />
                </Grid>
                <Grid item xs={12} sx={{alignItems:'center',justifyContent:'center'}}>
                        <TextField
                        label="Password" 
                        type='password'
                        error={formik.errors.password?true:false}
                        value={formik.values.password} 
                        onChange={formik.handleChange('password')}
                        onKeyDown={passwordKeyDown}
                        helperText={formik.errors.password}
                        sx={{
                            width:'100%'
                        }}
                        />
                        
                        
                        <span className={LoginStyles.signupLine}>Do not have an account? <Link  href="signup">Sign Up</Link></span>
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        sx={{
                            width: "100%",
                            paddingTop: '2%',
                            paddingBottom: '2%'
                        }}
                        onClick={formik.handleSubmit}
                        >
                            LogIn
                    </Button>
                </Grid>

            </Grid>
        </div>
        
    </div>
  )
}

export default Login