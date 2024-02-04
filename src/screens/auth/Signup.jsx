import React, {useState, useEffect} from 'react'
import GeneralStyles from '../../styles/General.module.css'
import SignupStyles from '../../styles/Signup.module.css'
import { useFormik } from 'formik' 
import * as Yup from 'yup';
import UserService from '../../services/UserService';
import RoleService from '../../services/RoleService'
import { useNavigate } from "react-router-dom";
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

const Signup = () => {

  const navigate = useNavigate();

  const userService = UserService();
  const roleService=  RoleService();

  //const [roles,setRoles] = useState([]) Backend

  //Local
  const [roles,setRoles] = useState([
    {
      id: 1,
      name: 'Technician',
    },
    {
      id: 2,
      name: 'Supervisor'
    }
  ])


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
        role: '',
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
        role: Yup.string()
        .max(30, "Enter less than 30 characters")
        .required("This field is required"),
      }),
      onSubmit: values => {
        //userService.SignUp(values) BACKEND
        localStorage.setItem('users', JSON.stringify(values))//Local
        navigate("/")
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
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={3}
            sx={{
                //textAlign: 'center'
            }}
            >
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
                <span className={SignupStyles.loginLine}>Already have an account? <Link  href="/">Log in</Link></span>
              </Grid>
              <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    sx={{
                        paddingRight: '42%',
                        paddingLeft: '42%',
                        paddingTop: '2%',
                        paddingBottom: '2%'
                    }}
                      onClick={formik.handleSubmit}
                    >
                        Signup
                </Button>
              </Grid>
            
          </Grid>
      </div>
    </div>
  )
}

export default Signup