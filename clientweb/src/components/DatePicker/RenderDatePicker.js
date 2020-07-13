import 'date-fns';
import React from 'react';
import { Grid } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const RenderDatePicker = (custom) => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            KeyboardButtonProps={{
              'aria-label': 'change date',             
            }}
            {...custom}
          />
        </Grid>
      </MuiPickersUtilsProvider>
  )
}
export default RenderDatePicker;