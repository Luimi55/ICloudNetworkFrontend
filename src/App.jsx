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
import EmployeeReport from './screens/EmployeeReport/EmployeeReport';
import EmployeeReportCreate from './screens/EmployeeReport/EmployeeReportCreate';
import EmployeeCostReport from './reports/EmployeeCostReport';
import Configuration from './screens/Configuration';
import RequireAuth from './hooks/auth/RequireAuth';
import Login from './screens/auth/Login'
import Signup from './screens/auth/Signup'

function App() {

  return (
    <>
      <Provider store={Store}>
        <ThemeProvider theme={Theme}>
            <BrowserRouter>
              <CssBaseline />
              <Menu/>  
              <Routes>
                <Route path='/login' Component={Login}/>
                <Route path='/Signup' Component={Signup}/>

                <Route element={<RequireAuth/>}>
                  <Route path='/' Component={Home}/>
                  <Route path='/employeeReport' Component={EmployeeReport}/>
                  <Route path='/employeeReport/create' Component={EmployeeReportCreate}/>
                  <Route path='/employeeReport/report' Component={EmployeeCostReport}/>
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
