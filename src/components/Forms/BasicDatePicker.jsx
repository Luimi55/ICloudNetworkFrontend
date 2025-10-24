import React, {useState} from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import Helper from '../../hooks/Helper';

export default function BasicDatePicker({defaultValue, onChange, label, maxDate}) {
    const {getDateFormatted} = Helper()

    const [defaultDate, setDefaultDate] = useState(dayjs(getDateFormatted(defaultValue)));

    const [maxDateState, setMaxDateState] = useState(dayjs(getDateFormatted(maxDate)));



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label={label}
            defaultValue={defaultDate}
            maxDate={maxDate?maxDateState:null}
            onChange={onChange}
            slotProps={{
            textField: {
                variant: 'outlined',
                sx: { width: 225 },
              },
            }}
        />
    </LocalizationProvider>
  );
}