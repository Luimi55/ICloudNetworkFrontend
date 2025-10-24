import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import {
    Grid,
    TextField,
    Button,
    Toolbar,
  } from '@mui/material';
import Styles from '../../styles/General.module.css'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik' 
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux'
import LinkApp from '../../components/LinkApp';
import { useNavigate } from "react-router-dom";
import EmployeeReportService from '../../services/OrderReportService';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loading from '../../components/loading';
import BasicDatePicker from '../../components/Forms/BasicDatePicker';
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import SucessfulAlert from '../../components/Alerts/SucessfulAlert'

const OrderReportUpdate = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const orderReportService = EmployeeReportService();
    const [employeeReport, setEmployeeReport] = useState({});
    const [showLoading, setShowLoading] = useState(false);
    const orderReportCache = useSelector(state=>state.OrderReport.orderReportCache)

    const setOrderDateValue = (value) => {
        formik.setFieldValue('orderDate',value.$d)
    }

    const formik = useFormik({
        initialValues: {
            userId:orderReportCache.userId,
            orderId: orderReportCache.orderId,
            hours: orderReportCache.hours,
            orderDate: orderReportCache.orderDate
          },
          validationSchema:Yup.object({
            orderId: Yup.string()
            .max(30, "Enter less than 30 characters")
            .required("This field is required"),
            hours: Yup.number()
            .typeError("Please enter numeric characters")
            .required("This field is required"),
          }),
          onSubmit:async values => {
            
            setShowLoading(true)
            await orderReportService.UpdateOrderReport(values) 
            .then(res=>{
                setShowLoading(false)
                SucessfulAlert()
                navigate(`/orderReport/${id}`)
            })
            .catch(err=>{
                ErrorAlert(err)
                setShowLoading(false)
                console.log(err)
            })
          }
    })

  return (
    <div
        className={Styles.screenBody}
    >
        <Header name={"Update Report"} hideMenuIcon={true}/>
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
            <Grid item size={{xs:6, md:4}}>
                <TextField
                 error={formik.errors.orderId?true:false}
                 label="Order Id" 
                 variant="outlined" 
                 value={formik.values.orderId} 
                onChange={formik.handleChange('orderId')}
                helperText={formik.errors.orderId}
                />
            </Grid>
            <Grid item size={{xs:6, md:4}}>
                <TextField
                error={formik.errors.hours?true:false}
                 label="Hours" 
                 variant="outlined" 
                 value={formik.values.hours} 
                 onChange={formik.handleChange('hours')}
                 helperText={formik.errors.hours}
                />
            </Grid>
            <Grid item size={{xs:6, md:4}}>
                <BasicDatePicker
                 label="Order Date"
                 defaultValue={orderReportCache.orderDate}
                //  value={formik.values.orderDate}
                 onChange={setOrderDateValue}
                //  onChange={formik.values.orderDate}
                 />
            </Grid>
            <Grid item size={{xs:0, md:8}}>
            </Grid>
            <Grid item size={{xs:12, md:1}}>
                {/* <LinkApp to={"/home"} color="white"> */}
                    <Button 
                    variant="contained" 
                    color="success"
                    onClick={formik.handleSubmit}
                    >
                        Update
                    </Button>
                {/* </LinkApp> */}
            </Grid>
            <Grid size={{xs:12, md:2}}>
            <Link to={`/orderReport/${id}`}  style={{ textDecoration: 'none', color:'white' }}>
                <Button 
                variant="contained" 
                color="error"
                >
                    Cancel
                </Button>
                </Link>
            </Grid>
        </Grid>
    <Loading show={showLoading}/>
    </div>
  )
}

export default OrderReportUpdate 