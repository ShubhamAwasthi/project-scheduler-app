import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DatePicker } from '@mui/x-date-pickers';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Worker } from '../models';

const VacationItem = ({
  disabled,
  editVacationHandler,
  deleteVacationHandler,
  saveVacationHandler,
  id,
  workers,
  vacationWorkerId,
  vacationStartDate,
  vacationEndDate,
  setVacationWorkerId,
  setVacationStartDate,
  setVacationEndDate
}) => {
  const updateWorkerIdHandler = (event) => {
    setVacationWorkerId(event.target.value);
  };
  return (
    <Grid container sx={{ p: 0, mb: 2 }} spacing={2} alignItems="center">
      <Grid item xs={2}>
        <FormControl sx={{ m: 1, maxWidth: 120, minWidth: 120 }} size="small">
          <InputLabel id="select-label">Team Member</InputLabel>
          <Select
            disabled={disabled}
            labelId="select-label"
            id="select"
            value={vacationWorkerId}
            label="Team Member"
            onChange={updateWorkerIdHandler}>
            {workers.map((worker) => (
              <MenuItem key={worker.id} value={worker.id}>
                {worker.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <DatePicker
          label="start date"
          disabled={disabled}
          onChange={(newValue) => {
            console.log('newValue', newValue);
            setVacationStartDate(newValue);
          }}
          value={vacationStartDate}
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
            setVacationEndDate(newValue);
          }}
          value={vacationEndDate}
          renderInput={(params) => <TextField size="small" {...params} />}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <ButtonGroup variant="outlined">
          {disabled ? (
            <IconButton onClick={() => editVacationHandler(id)}>
              <Edit sx={{ color: 'green' }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() =>
                saveVacationHandler(id, vacationStartDate, vacationEndDate, vacationWorkerId)
              }>
              <Save sx={{ color: 'green' }} />
            </IconButton>
          )}
          <IconButton onClick={() => deleteVacationHandler(id)}>
            <Delete sx={{ color: 'orange' }} />
          </IconButton>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

VacationItem.propTypes = {
  id: PropTypes.number,
  disabled: PropTypes.bool.isRequired,
  saveVacationHandler: PropTypes.func.isRequired,
  editVacationHandler: PropTypes.func.isRequired,
  deleteVacationHandler: PropTypes.func.isRequired,
  workers: PropTypes.arrayOf(PropTypes.instanceOf(Worker)),
  vacationWorkerId: PropTypes.number,
  setVacationWorkerId: PropTypes.func,
  vacationStartDate: PropTypes.object,
  setVacationStartDate: PropTypes.func,
  vacationEndDate: PropTypes.object,
  setVacationEndDate: PropTypes.func
};

export default VacationItem;
