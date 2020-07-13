import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

const RenderTimePicker = (custom) => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          {...custom}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
export default RenderTimePicker;