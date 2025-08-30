import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import Helper from '../hooks/Helper';

export default function BasicDatePicker({value, onChange}) {

    const {getDateFormatted} = Helper()


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
            label="Order Date"
            defaultValue={dayjs(getDateFormatted(new Date()))}
            // value={value} 
            onChange={onChange}
            // slotProps={{
            //     textField: {
            //         value: value,
            //         onChange: onChange
            //     }
            // }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}