import React from 'react'
import Header from '../components/Header'
import {
  Grid,
  TextField,
  Button,
  Toolbar,
  Container
} from '@mui/material';
import DashboardCard from '../components/DashBoardCard'
import Styles from '../styles/General.module.css'
import HomeIcon from '@mui/icons-material/Home';
import HailIcon from '@mui/icons-material/Hail';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartDash from '../components/BarChartDash';
import PieCharDash from '../components/PieCharDash';

const Home = () => {
  return (
    <div
      className={Styles.screenBody}
    >
        <Header name="Home"/>
        <Container
           maxWidth="xl"
           sx={{
            marginTop:12,
            marginBottom: 4
           }}>

          <Grid
            container
            spacing={3}
          >
          <Grid
          item
              xs={12}
              sm={6}
              lg={3}

            >
              <DashboardCard
                    title="Total Employees"
                    color="#2ec4b6"
                    value="12"
                    icon={<HailIcon/>}
                    sx={{ height: '100%'}}
              />
            </Grid>
            <Grid
            item
              xs={12}
              sm={6}
              lg={3}
            >
              <DashboardCard
                    title="Budget"
                    color="#e71d36"
                    value="$12k"
                    icon={<AttachMoneyIcon/>}
                    sx={{ height: '100%'}}
              />
            </Grid>
            <Grid
            item
              xs={12}
              sm={6}
              lg={3}
            >
              <DashboardCard
                    title="Budget"
                    color="#3772ff"
                    value="$12k"
                    icon={<AttachMoneyIcon/>}
                    sx={{ height: '100%'}}
              />
            </Grid>
            <Grid
            item
              xs={12}
              sm={6}
              lg={3}
            >
              <DashboardCard
                    title="Budget"
                    color="#ff9f1c"
                    value="$12k"
                    icon={<AttachMoneyIcon/>}
                    sx={{ height: '100%'}}
              />
            </Grid>
            <Grid
            item
            xs={12}
            lg={8}
            >
              <BarChartDash/>
            </Grid>
            <Grid
            item
            xs={12}
            lg={4}
            >
              <PieCharDash/>
            </Grid>
          </Grid>
        </Container>
    </div>
  )
}

export default Home