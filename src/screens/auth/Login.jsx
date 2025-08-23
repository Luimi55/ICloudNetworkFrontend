import React, { use, useState } from 'react'
import GeneralStyles from '../../styles/General.module.css'
import LoginStyles from '../../styles/Login.module.css'
import { useFormik } from 'formik' 
import * as Yup from 'yup';
import UserService from '../../services/UserService';
import { setUser } from '../../redux/reducers/UserSlice';
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/auth/useAuth';
import Loading from '../../components/loading';
import Swal from 'sweetalert2';
import errorAlert from '../../components/Alerts/ErrorAlert';
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
    const [showLoading, setShowLoading] = useState(false);
    const userInfoLocalStorage = import.meta.env.VITE_USER_INFO

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
            try{

                setShowLoading(true)
                const res = await userService.LogIn(values)
                setShowLoading(false)
                const token = res.data;
                saveCookie({
                    token: token,
                    expires: 1,
                })

                const userInfoRes = await userService.UserInfo()
                const userInfoData = JSON.stringify(userInfoRes.data)
                localStorage.setItem(userInfoLocalStorage, userInfoData)

                navigate("/")
            } catch(err){
                errorAlert(err)
                setShowLoading(false)
                console.log(err)
            }

            // })
            // .catch(err=>{
            //     errorAlert(err)
            //     setShowLoading(false)
            //     console.log(err)
            // })
          }
    })

    const passwordKeyDown = (e) => {
        if(e.keyCode == 13){
            formik.handleSubmit();
        }
    }

    const OnLoginSuccess = (res)=>{
        const token = res.data;
        saveCookie({
            token: token,
            expires: 1,
        })
        // userService.UserInfo()
        // .then(res=>{

        // })
        navigate("/")
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
            width='100%'
            padding={5}
            spacing={3}
            >
                <Grid item size={12}>
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
                <Grid item size={12} sx={{alignItems:'center',justifyContent:'center'}}>
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
                <Grid item size={12}>
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
        
        <Loading show={showLoading}/>
        
    </div>
  )
}

export default Login