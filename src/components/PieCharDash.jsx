import React from 'react'
import { Chart } from "react-google-charts";
import {
    Card,
    CardContent,
    CardHeader
  } from '@mui/material';

const data = [
    ["Active Users", "Number"],
    ["Inactive", 8],
    ["Active", 2],
  ];

const PieCharDash = () => {
  return (
    <Card sx={{ height: '100%' }}>
    <CardHeader
      title="Active Users"
    />
    <CardContent>
    <Chart
      chartType="PieChart"
      data={data}
      width="100%"
      height="400px"
    />
     </CardContent>

   </Card>
  )
}

export default PieCharDash