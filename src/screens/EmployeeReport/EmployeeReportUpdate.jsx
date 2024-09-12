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
import {addEmployeeReport} from '../../redux/reducers/EmployeeReportSlice'
import LinkApp from '../../components/LinkApp';
import { useNavigate } from "react-router-dom";
import EmployeeReportService from '../../services/EmployeeReportService';
import { useParams } from 'react-router-dom';

const EmployeeReportUpdate = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const employeeReportService = EmployeeReportService();
    const [employeeReport, setEmployeeReport] = useState({});

    useEffect(()=>{
        //local
        let localStorageEmployeeReports = localStorage.getItem('employeeReports');
        const employeeReports = JSON.parse(localStorageEmployeeReports);
        let tempEmployeeReport = employeeReports.find(empRep=>empRep.orderId == id)
        formik.setFieldValue("cost", tempEmployeeReport.cost)
        formik.setFieldValue("hours", tempEmployeeReport.hours)
        formik.setFieldValue("materials", tempEmployeeReport.materials)
        formik.setFieldValue("parking", tempEmployeeReport.parking)
        formik.setFieldValue("toll", tempEmployeeReport.toll)
        formik.setFieldValue("milla", tempEmployeeReport.milla)
        formik.setFieldValue("others", tempEmployeeReport.others)
        formik.setFieldValue("orderId", tempEmployeeReport.orderId)
    },[])

    const formik = useFormik({
        initialValues: {
            id:'',
            orderId: '',
            cost: 0,
            hours: 0,
            materials: 0,
            parking: 0,
            toll: 0,
            milla: 0,
            others:0,

          },
          validationSchema:Yup.object({
            orderId: Yup.string()
            .max(30, "Enter less than 30 characters")
            .required("This field is required"),
            cost: Yup.number()
            .typeError("Please enter numeric characters")
            .required("This field is required"),
            hours: Yup.number()
            .typeError("Please enter numeric characters")
            .required("This field is required"),
            materials: Yup.number()
            .typeError("Please enter numeric characters"),
            parking: Yup.number()
            .typeError("Please enter numeric characters"),
            toll: Yup.number()
            .typeError("Please enter numeric characters"),
            milla: Yup.number()
            .typeError("Please enter numeric characters"),
            others: Yup.number()
            .typeError("Please enter numeric characters")
          }),
          onSubmit:async values => {
            // //local
            var employeeReports = JSON.parse(localStorage.getItem('employeeReports'));
            const newEmployeeReport = employeeReports.map(empRep=>{
                if(empRep.orderId == values.orderId){
                    return {
                        ...values,
                         reportDate: empRep.reportDate,
                         userEmail: empRep.userEmail
                        }
                } else {
                    return empRep
                }

            })
            localStorage.setItem('employeeReports', JSON.stringify(newEmployeeReport))

            // // await employeeReportService.AddEmployeeReport(values) //Backend
            // // .then(res=>{
            // //     console.log(res)
            // // })
            // // .catch(err=>{
            // //     console.log(err)
            // // })

            navigate("/employeeReport")
          }
    })

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
            <Grid item xs={4}>
                <TextField
                 error={formik.errors.orderId?true:false}
                 label="Order Id" 
                 variant="outlined" 
                 value={formik.values.orderId} 
                onChange={formik.handleChange('orderId')}
                helperText={formik.errors.orderId}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                error={formik.errors.cost?true:false}
                 label="Cost" 
                 variant="outlined" 
                 value={formik.values.cost} 
                 onChange={formik.handleChange('cost')}
                 helperText={formik.errors.cost}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                error={formik.errors.hours?true:false}
                 label="Hours" 
                 variant="outlined" 
                 value={formik.values.hours} 
                 onChange={formik.handleChange('hours')}
                 helperText={formik.errors.hours}
                />
            </Grid>
            <Grid item xs={4}> 
            <TextField
                error={formik.errors.materials?true:false}
                 label="Materials" 
                 variant="outlined" 
                 value={formik.values.materials} 
                 onChange={formik.handleChange('materials')}
                 helperText={formik.errors.materials}
                />
            </Grid>
            <Grid item xs={4}>
            <TextField
                error={formik.errors.parking?true:false}
                 label="Parking" 
                 variant="outlined" 
                 value={formik.values.parking} 
                 onChange={formik.handleChange('parking')}
                 helperText={formik.errors.parking}
                />
            </Grid>
            <Grid item xs={4}>
            <TextField
                error={formik.errors.toll?true:false}
                 label="TOLL" 
                 variant="outlined" 
                 value={formik.values.toll} 
                 onChange={formik.handleChange('toll')}
                 helperText={formik.errors.toll}
                />
            </Grid>
            <Grid item xs={6}>
            <TextField
                 error={formik.errors.milla?true:false}
                 label="Milla" 
                 variant="outlined" 
                 value={formik.values.milla} 
                 onChange={formik.handleChange('milla')}
                 helperText={formik.errors.milla}
                />
            </Grid>
            <Grid item xs={6}>
            <TextField
                 error={formik.errors.others?true:false}
                 label="Others" 
                 variant="outlined" 
                 value={formik.values.others} 
                 onChange={formik.handleChange('others')}
                 helperText={formik.errors.others}
                />
            </Grid>
            <Grid item xs={8}>
            </Grid>
            <Grid item xs={1}>
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
            <Grid item xs={1}>
            <Link to={"/employeeReport"}  style={{ textDecoration: 'none', color:'white' }}>
                <Button 
                variant="contained" 
                color="error"
                
                >
                    Cancel
                </Button>
                </Link>
            </Grid>
        </Grid>
            
    </div>
  )
}

export default EmployeeReportUpdate 