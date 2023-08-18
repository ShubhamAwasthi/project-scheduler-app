import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DatePicker } from '@mui/x-date-pickers';

const HolidayItem = ({
  disabled,
  editHolidayHandler,
  deleteHolidayHandler,
  saveHolidayHandler,
  id,
  holidayName,
  holidayStartDate,
  holidayEndDate,
  setHolidayName,
  setHolidayStartDate,
  setHolidayEndDate
}) => {
  const updateNameHandler = (event) => {
    setHolidayName(event.target.value);
  };
  return (
    <Grid container sx={{ p: 0, mb: 2 }} spacing={2} alignItems="center">
      <Grid item xs={2}>
        <TextField
          disabled={disabled}
          label="holiday name"
          id="task"
          required
          size="small"
          value={holidayName}
          onChange={updateNameHandler}
        />
      </Grid>
      <Grid item xs={3}>
        <DatePicker
          label="start date"
          disabled={disabled}
          onChange={(newValue) => {
            console.log('newValue', newValue);
            setHolidayStartDate(newValue);
          }}
          value={holidayStartDate}
          renderInput={(params) => <TextField size="small" {...params} />}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <DatePicker
          disabled={disabled}
          label="end date"
          onChange={(newValue) => {
            console.log('newValue', newValue);
            setHolidayEndDate(newValue);
          }}
          value={holidayEndDate}
          renderInput={(params) => <TextField size="small" {...params} />}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <ButtonGroup variant="outlined">
          {disabled ? (
            <IconButton onClick={() => editHolidayHandler(id)}>
              <Edit sx={{ color: 'green' }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => saveHolidayHandler(id, holidayStartDate, holidayEndDate, holidayName)}>
              <Save sx={{ color: 'green' }} />
            </IconButton>
          )}
          <IconButton onClick={() => deleteHolidayHandler(id)}>
            <Delete sx={{ color: 'orange' }} />
          </IconButton>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

HolidayItem.propTypes = {
  id: PropTypes.number,
  disabled: PropTypes.bool.isRequired,
  saveHolidayHandler: PropTypes.func.isRequired,
  editHolidayHandler: PropTypes.func.isRequired,
  deleteHolidayHandler: PropTypes.func.isRequired,
  holidayName: PropTypes.string,
  setHolidayName: PropTypes.func,
  holidayStartDate: PropTypes.object,
  setHolidayStartDate: PropTypes.func,
  holidayEndDate: PropTypes.object,
  setHolidayEndDate: PropTypes.func
};

export default HolidayItem;
