import { useState } from 'react'
import Menu from '../src/components/Menu'
import CssBaseline from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from '@mui/material';
//import {Theme} from './assets/Theme';
import './App.css'
import { Store } from '../src/redux/Store';
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Theme from '../src/assets/Theme';
import EmployeeReport from './screens/OrderReport/OrderReport';
import EmployeeReportCreate from './screens/OrderReport/OrderReportCreate';
import EmployeeReportUpdate from './screens/OrderReport/OrderReportUpdate';
import EmployeeCostReport from './reports/EmployeeCostReport';
import Configuration from './screens/Configuration';
import TechnicianList from './screens/TechnicianReport/TechnicianList';
import RequireAuth from './hooks/auth/RequireAuth';
import Login from './screens/auth/Login'
import Signup from './screens/auth/Signup'
import ExpenseReport from './screens/ExpenseReport/ExpenseReport';

function App() {

  return (
    <>
      <Provider store={Store}>
        <ThemeProvider theme={Theme}>
            <BrowserRouter basename="/ICloudNetworkFrontend">
              <CssBaseline />
              <Menu/>  
              <Routes>
                <Route path='/login' Component={Login}/>
                <Route path='/Signup' Component={Signup}/>

                <Route element={<RequireAuth/>}>
                  <Route path='/' Component={Home}/>
                  <Route path='/expenseReport/:id' Component={ExpenseReport}/>
                  <Route path='/orderReport/:id' Component={EmployeeReport}/>
                  <Route path='/orderReport/create/:id' Component={EmployeeReportCreate}/>
                  <Route path='/orderReport/update/:id' Component={EmployeeReportUpdate}/>
                  <Route path='/orderReport/report' Component={EmployeeCostReport}/>
                  <Route path='/technicianReport' Component={TechnicianList}/>
                  <Route path='/configuration' Component={Configuration}/>
                </Route>
              </Routes>
            </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default App
