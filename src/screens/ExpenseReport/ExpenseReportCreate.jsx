import React, {useState} from 'react'
import Header from '../../components/Header'
import {
    Grid,
    TextField,
    Button,
  } from '@mui/material';
import Styles from '../../styles/General.module.css'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik' 
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import ExpenseReportService from '../../services/ExpenseReportService';
import BasicDatePicker from '../../components/Forms/BasicDatePicker';
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import SucessfulAlert from '../../components/Alerts/SucessfulAlert'
import Loading from '../../components/loading';
import { useParams } from 'react-router-dom';
import FileDragDrop from '../../components/Forms/FileDragDrop';

const ExpenseReportCreate = () => {

const {id} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const expenseReportService = ExpenseReportService();
    const [showLoading, setShowLoading] = useState(false);
    const [formFiles, setFormFiles] = useState();

    const formik = useFormik({
        initialValues: {
            userId:'',
            expenseDate: new Date(),
            fuelOrTransport: 0,
            materials: 0,
            milla: 0,
            others: 0,
            parking: 0,
            toll: 0,
            overnightFood: 0,
          },
          validationSchema:Yup.object({
            fuelOrTransport: Yup.number()
            .typeError("Please enter numeric characters"),
            materials: Yup.number()
            .typeError("Please enter numeric characters"),
            milla: Yup.number()
            .typeError("Please enter numeric characters"),
            others: Yup.number()
            .typeError("Please enter numeric characters"),
            parking: Yup.number()
            .typeError("Please enter numeric characters"),
            toll: Yup.number()
            .typeError("Please enter numeric characters"),
            overnightFood: Yup.number()
            .typeError("Please enter numeric characters"),
          }),
          onSubmit:async values => {

            values.userId = id

            setShowLoading(true)
            // await expenseReportService.AddOrderReport(values) 
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

    const setOrderDateValue = (value) => {
        formik.setFieldValue('expenseDate',value.$d)
    }

    const setFormFilesValue = (value)=>{
        setFormFiles(value)
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
                <BasicDatePicker
                 label="Expense date"
                 defaultValue={new Date()}
                 maxDate={new Date()}
                 onChange={setOrderDateValue}
                 />
            </Grid>
            <Grid item size={{xs:6, md:4}}>
                <TextField
                 error={formik.errors.fuelOrTransport?true:false}
                 label="Fuel or transport" 
                 variant="outlined" 
                 value={formik.values.fuelOrTransport} 
                onChange={formik.handleChange('fuelOrTransport')}
                helperText={formik.errors.fuelOrTransport}
                />
            </Grid>
            <Grid item size={{xs:6, md:4}}>
                <TextField
                error={formik.errors.milla?true:false}
                 label="Milla" 
                 variant="outlined" 
                 value={formik.values.milla} 
                 onChange={formik.handleChange('milla')}
                 helperText={formik.errors.milla}
                />
            </Grid>
            <Grid item size={{xs:6, md:4}}>
                <TextField
                error={formik.errors.overnightFood?true:false}
                 label="Overnight food" 
                 variant="outlined" 
                 value={formik.values.overnightFood} 
                 onChange={formik.handleChange('overnightFood')}
                 helperText={formik.errors.overnightFood}
                />
            </Grid>
            <Grid item size={{xs:6, md:4}}>
                <TextField
                error={formik.errors.parking?true:false}
                 label="Parking" 
                 variant="outlined" 
                 value={formik.values.parking} 
                 onChange={formik.handleChange('parking')}
                 helperText={formik.errors.parking}
                />
            </Grid>
            <Grid item size={{xs:6, md:4}}>
                <TextField
                error={formik.errors.toll?true:false}
                 label="Toll" 
                 variant="outlined" 
                 value={formik.values.toll} 
                 onChange={formik.handleChange('toll')}
                 helperText={formik.errors.toll}
                />
            </Grid>
            <Grid item size={{xs:6, md:4}}>
                <TextField
                error={formik.errors.others?true:false}
                 label="Others" 
                 variant="outlined" 
                 value={formik.values.others} 
                 onChange={formik.handleChange('others')}
                 helperText={formik.errors.others}
                />
            </Grid>

            <Grid item size={{xs:0, md:8}}>
            </Grid>
            <Grid item size={{xs:12, md:12}}>
                <FileDragDrop
                    filesCallback = {setFormFilesValue}
                    multiple={true}
                    text="Attachments"
                />
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
            <Link to={`/expenseReport/${id}`}  style={{ textDecoration: 'none', color:'white' }}>
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

export default ExpenseReportCreate