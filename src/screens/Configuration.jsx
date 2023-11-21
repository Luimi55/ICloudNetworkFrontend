import React, {useState} from 'react'
import Header from '../components/Header'
import {
    Grid,
    TextField,
    Button,
    Backdrop,
    CircularProgress
  } from '@mui/material';
import Styles from '../styles/EmployeeReport.module.css'
import { useSelector, useDispatch } from 'react-redux';
import {addCompanyDiscount} from '../redux/reducers/CompanyDiscountSlice'
import { useFormik } from 'formik' 
import * as Yup from 'yup';

const Configuration = () => {

    const dispatch = useDispatch();
    const [showLoading, setShowLoading] = useState(false);
    const loadingOpen = () => {
        setShowLoading(true);
    };
    const loadingClose = () => {
        setShowLoading(false);
    };

    const formik = useFormik({
        initialValues: {
            companyDiscount: useSelector(state=>state.CompanyDiscount.companyDiscount),

          },
          validationSchema:Yup.object({
            companyDiscount: Yup.number()
            .typeError("Please enter numeric characters")
            .required("This field is required"),
          }),
          onSubmit: values => {
            dispatch(addCompanyDiscount(values))
            loadingOpen();
            setTimeout(() => {  loadingClose() }, 1000);
            
            // navigate("/employeeReport")
          }
    })

  return (
    <div 
    className={Styles.screenBody}
    >
        <Header name={"Configuration"}/>

        <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{
                textAlign: 'center'
            }}
        >
            <Grid item xs={12}>
                <TextField
                error={formik.errors.companyDiscount?true:false}
                label="Company Discount" 
                variant="outlined"
                value={formik.values.companyDiscount} 
                onChange={formik.handleChange('companyDiscount')}
                helperText={formik.errors.companyDiscount}
                />      
            </Grid>
            <Grid item xs={12}>
                <Button 
                    variant="contained" 
                    color="success"
                    onClick={formik.handleSubmit}
                    >
                        Save
                </Button>
            </Grid>

        </Grid>

        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoading}
        onClick={loadingClose}
        >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Configuration