import React from 'react'
import BasicDatePicker from '../components/BasicDatePicker';
import {
     Button,
     Stack
    } from '@mui/material';

const RangeDatePicker = ({
    onChangeStartDate,
    onChangeEndDate,
    defaultValueStartDate,
    defaultValueEndDate,
    onClickButton
}) => {
  return (
    <Stack
        direction="row"
        alignItems='center'
        justifyContent='space-between'
        marginBottom={10}
    >
        <BasicDatePicker defaultValue={defaultValueStartDate} label="Start Date" onChange={onChangeStartDate}/>
        <BasicDatePicker defaultValue={defaultValueEndDate} label="End Date" onChange={onChangeEndDate}/>
        <Button
            variant="contained"
            color="confirm"
            style={{
                color:'white',
            }}
            onClick={onClickButton}
        >
            Apply
        </Button>
    </Stack>
  )
}

export default RangeDatePicker