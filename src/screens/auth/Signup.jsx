import React, {useState, useEffect} from 'react'
import GeneralStyles from '../../styles/General.module.css'
import SignupStyles from '../../styles/Signup.module.css'
import { useFormik } from 'formik' 
import * as Yup from 'yup';
import UserService from '../../services/UserService';
import RoleService from '../../services/RoleService'
import { useNavigate } from "react-router-dom";
import Loading from '../../components/loading';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel ,
  Button,
  Link
} from '@mui/material';
import SucessfulAlert from '../../components/Alerts/SucessfulAlert';
import ErrorAlert from '../../components/Alerts/ErrorAlert';

const Signup = () => {

  const navigate = useNavigate();

  const userService = UserService();
  const roleService=  RoleService();
  const [showLoading, setShowLoading] = useState(false);

  //const [roles,setRoles] = useState([]) Backend

  useEffect(()=>{

    //Backend
    // roleService.GetRoles()
    // .then(res=>{
    //   setRoles(res.data)
    // })
    
  },[])



  const formik = useFormik({
    initialValues: {
        firstName:'',
        lastName: '',
        email: '',
        password: '',
        // role: '',
      },
      validationSchema:Yup.object({
        firstName: Yup.string()
        .max(50, "Enter less than 50 characters")
        .required("This field is required"),
        lastName: Yup.string()
        .max(50, "Enter less than 50 characters")
        .required("This field is required"),
        email: Yup.string()
        .max(256, "Enter less than 256 characters")
        .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',"Enter a valid email")
        .required("This field is required"),
        password: Yup.string()
        .max(256, "Enter less than 256 characters")
        .required("This field is required"),
        // role: Yup.string()
        // .max(30, "Enter less than 30 characters")
        // .required("This field is required"),
      }),
      onSubmit: values => {
        setShowLoading(true)
        userService.SignUp(values)
        .then(res=>{
          setShowLoading(false)
          SucessfulAlert()
        })
        .catch(err=>{
          ErrorAlert(err)
          setShowLoading(false)
          console.log(err)
        })

        // navigate("/login")
      }
})
  return (
    <div 
      className={GeneralStyles.screenBody}
    >
      <div
        className={SignupStyles.signupContainer}
      >
        <p className={SignupStyles.title}>Sign up</p>
        <Grid 
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={3}

            >
              <Grid item size={12}>
                <TextField
                label="First Name" 
                error={formik.errors.firstName?true:false}
                value={formik.values.firstName} 
                onChange={formik.handleChange('firstName')}
                helperText={formik.errors.firstName}
                sx={{
                    width:'100%'
                }}
                />
              </Grid>
              <Grid item size={12}>
                <TextField
                label="Last Name"
                error={formik.errors.lastName?true:false}
                value={formik.values.lastName} 
                onChange={formik.handleChange('lastName')}
                helperText={formik.errors.lastName}
                sx={{
                    width:'100%'
                }}
                />
              </Grid>
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
              <Grid item size={12}>
                <TextField
                label="Password" 
                type='password'
                error={formik.errors.password?true:false}
                value={formik.values.password} 
                onChange={formik.handleChange('password')}
                helperText={formik.errors.password}
                sx={{
                    width:'100%'
                }}
                />
                <span className={SignupStyles.loginLine}>Already have an account? <Link  href="/">Log in</Link></span>
              </Grid>
              {/* <Grid item size={12}>
                <FormControl fullWidth>
                  <InputLabel
                  error={formik.errors.role?true:false}
                  >Role</InputLabel>
                  <Select
                    error={formik.errors.role?true:false}
                    value={formik.values.role} 
                    onChange={formik.handleChange('role')}
                    label="Role" 
                    sx={{
                        width:'100%'
                    }}
                    >
                      {
                        roles.map((role)=>(
                          <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                        ))
                      }
                    </Select>
                </FormControl>
              </Grid> */}
              <Grid item>
                  <Button 
                      variant="contained" 
                      color="primary"
                      onClick={formik.handleSubmit}
                    >
                        Signup
                </Button>
              </Grid>
            
          </Grid>
      </div>
      <Loading show={showLoading}/>
    </div>
  )
}

export default Signup