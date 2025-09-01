import React, {useState} from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import Helper from '../hooks/Helper';

export default function BasicDatePicker({defaultValue, onChange, label, maxDate}) {
    const {getDateFormatted} = Helper()

    const [defaultDate, setDefaultDate] = useState(dayjs(getDateFormatted(defaultValue)));

    const [maxDateState, setMaxDateState] = useState(dayjs(getDateFormatted(maxDate)));



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
            label={label}
            defaultValue={defaultDate}
            maxDate={maxDate?maxDateState:null}
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