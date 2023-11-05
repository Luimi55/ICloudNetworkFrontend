import React from 'react'
import Header from '../../components/Header'
import {
    Grid,
    TextField,
    Button,
  } from '@mui/material';
  import Styles from '../../styles/EmployeeReport.module.css'
  import { Link } from 'react-router-dom';

const EmployeeReportCreate = () => {
  return (
    <div
    className={Styles.screenBody}
    >
        <Header name={"Add Report"} hideMenuIcon={true}/>
        <Grid 
            container
            spacing={4}
        >
            <Grid item xs={4}>
                <TextField
                 id="outlined-basic" 
                 label="Order Id" 
                 variant="outlined" 
                //  value={orderId} 
                // onChange={(event) => {
                //     setOrderId(event.target.value);
                // }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                 id="outlined-basic" 
                 label="Cost" 
                 variant="outlined" 
                //  value={cost}
                // onChange={(event) => {
                //     setCost(event.target.value);
                // }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                 id="outlined-basic" 
                 label="Hours" 
                 variant="outlined" 
                //  value={hours}
                // onChange={(event) => {
                //     setHours(event.target.value);
                // }}
                />
            </Grid>
            <Grid item xs={4}> 
            <TextField
                 id="outlined-basic" 
                 label="Material" 
                 variant="outlined" 
                //  value={hours}
                // onChange={(event) => {
                //     setHours(event.target.value);
                // }}
                />
            </Grid>
            <Grid item xs={4}>
            <TextField
                 id="outlined-basic" 
                 label="Parking" 
                 variant="outlined" 
                //  value={hours}
                // onChange={(event) => {
                //     setHours(event.target.value);
                // }}
                />
            </Grid>
            <Grid item xs={4}>
            <TextField
                 id="outlined-basic" 
                 label="TOLL" 
                 variant="outlined" 
                //  value={hours}
                // onChange={(event) => {
                //     setHours(event.target.value);
                // }}
                />
            </Grid>
            <Grid item xs={12}>
            <TextField
                 id="outlined-basic" 
                 label="Others" 
                 variant="outlined" 
                //  value={hours}
                // onChange={(event) => {
                //     setHours(event.target.value);
                // }}
                />
            </Grid>
            <Grid item xs={8}>
            </Grid>
            <Grid item xs={1}>
                <Button 
                variant="contained" 
                color="success"
                // onClick={()=>addReport()}
                >
                    Add
                </Button>
            </Grid>
            <Grid item xs={1}>
            <Link to={"/employeeReport"}  style={{ textDecoration: 'none', color:'white' }}>
                <Button 
                variant="contained" 
                color="error"
                // onClick={()=>addReport()}
                >
                    Cancel
                </Button>
                </Link>
            </Grid>
        </Grid>
            
    </div>
  )
}

export default EmployeeReportCreate