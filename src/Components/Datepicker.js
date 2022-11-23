import React, {useState} from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function BasicDateTimePicker() {
  const [startValue, setStartValue] = useState(dayjs(Date()));
  const [endValue, setEndValue] = useState(dayjs('2022-05-07'));


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField style={{marginTop: '20px' }} {...props} />}
        label="StartDateTimePicker"
        value={startValue}
        onChange={(startDate) => {
          setStartValue(startDate);
          localStorage.setItem('Start', startDate.toISOString());
        }}
      />

      <DateTimePicker
        renderInput={(props) => <TextField style={{marginTop: '20px' }} {...props} />}
        label="StopDateTimePicker"
        value={endValue}
        onChange={(endDate) => {
          setEndValue(endDate);
          localStorage.setItem('End', endDate.toISOString());
        }}
      />

    </LocalizationProvider>
  );
}
