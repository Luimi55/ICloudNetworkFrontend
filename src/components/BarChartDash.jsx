import * as React from 'react';
import { Chart } from "react-google-charts";

import {
  Card,
  CardContent,
  CardHeader
} from '@mui/material';

const data= [
  ["Month", "Expenses"],
  ["Jan", 1000],
  ["Feb", 1170],
  ["Mar", 660],
  ["Apr", 1130],
  ["May", 900],
  ["Jun", 800],
  ["Jul", 1200],
  ["Aug", 999],
  ["Sep", 2000],
  ["Oct", 3000],
  ["Nov", 1030],
  ["Dec", 1030],
];


const BarChartDash = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title="Expenses"
      />
      <CardContent>
      <Chart
        chartType="Bar"
        data={data}
        width="100%"
        height="400px"
        legendToggle
      />
       </CardContent>

     </Card>
  )
}

export default BarChartDash