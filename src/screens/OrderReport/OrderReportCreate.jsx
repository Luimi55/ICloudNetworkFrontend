import React, {useState} from 'react'
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
import {addEmployeeReport} from '../../redux/reducers/OrderReportSlice'
import LinkApp from '../../components/LinkApp';
import { useNavigate } from "react-router-dom";
import OrderReportService from '../../services/OrderReportService';
import Swal from 'sweetalert2';
import BasicDatePicker from '../../components/BasicDatePicker';
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import SucessfulAlert from '../../components/Alerts/SucessfulAlert'
import Loading from '../../components/loading';
import { useParams } from 'react-router-dom';

const OrderReportCreate = () => {

    const {id} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderReportService = OrderReportService();
    const [showLoading, setShowLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            userId:'',
            orderId: '',
            hours: 0,
            orderDate: new Date()
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

            values.userId = id

            setShowLoading(true)
            await orderReportService.AddOrderReport(values) 
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
            // navigate("/orderReport")
            // Swal.fire({
            //     title: "Report added successfully!",
            //     icon: "success"
            //   });

          }
    })

    const setOrderDateValue = (value) => {
        formik.setFieldValue('orderDate',value.$d)
    }

  return (
    <div
        className={Styles.screenBody}
    >
        <Header name={"Add Report"} hideMenuIcon={true}/>
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
                 defaultValue={new Date()}
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
                        Add
                    </Button>
                {/* </LinkApp> */}
            </Grid>
            <Grid size={{xs:12, md:1}}>
            <Link to={"/orderReport"}  style={{ textDecoration: 'none', color:'white' }}>
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

export default OrderReportCreate