import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import Helper from '../hooks/Helper';

export default function BasicDatePicker({defaultValue, onChange, label}) {
    const {getDateFormatted} = Helper()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
            label={label}
            defaultValue={dayjs(getDateFormatted(defaultValue))}
            // value={new Date()} 
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