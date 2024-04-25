import { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VacationItem from './VacationItem';
import { Vacation } from '../models';
import moment from 'moment';

const VacationForm = ({ vacations, setVacations, workers, dispatch, editingId, setEditingId }) => {
  const saveVacationHandler = (id, startDate, endDate, workerId) => {
    console.log('save handler', vacations, workerId, startDate, endDate);
    let vacationToSave = vacations.find((x) => x.id === id);
    if (vacationToSave) {
      console.log('found existing vacation', vacationToSave, startDate, endDate);
      vacationToSave.workerId = workerId;
      vacationToSave.startDate = startDate;
      vacationToSave.endDate = endDate;
    } else {
      console.log('not found existing vacation');
      vacationToSave = new Vacation(id || moment().valueOf(), workerId, startDate, endDate);
      console.log(vacationToSave, 'saved this');
    }
    vacationToSave.startDate = moment(vacationToSave.startDate).startOf('day').toDate();
    vacationToSave.endDate = moment(moment(vacationToSave.endDate)).endOf('day').toDate();
    console.log('saved dates', vacationToSave.startDate, vacationToSave.endDate);
    setVacations([...vacations.filter((x) => x.id !== id), vacationToSave]);
    setEditingId(null);
    setStartDate(null);
    setEndDate(null);
    setWorkerId('');
  };

  const editVacationHandler = (id) => {
    const vacationToEdit = vacations.find((x) => x.id === id);
    setWorkerId(vacationToEdit.workerId);
    setEditingId(id);
    setStartDate(vacationToEdit.startDate);
    setEndDate(vacationToEdit.endDate);
  };

  const deleteVacationHandler = (id) => {
    setVacations([...vacations.filter((x) => x.id !== id)]);
  };

  const [workerId, setWorkerId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {`Vacations`}
      </Typography>
      <Box sx={{ height: '50%', display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {vacations
              .sort((a, b) => a.id - b.id)
              .map((vacation) => (
                <VacationItem
                  key={vacation.id}
                  disabled={vacation.id !== editingId}
                  editVacationHandler={editVacationHandler}
                  saveVacationHandler={saveVacationHandler}
                  deleteVacationHandler={deleteVacationHandler}
                  id={vacation.id}
                  workers={workers}
                  vacationWorkerId={vacation.workerId}
                  vacationStartDate={vacation.id !== editingId ? vacation.startDate : startDate}
                  vacationEndDate={vacation.id !== editingId ? vacation.endDate : endDate}
                  setVacationWorkerId={setWorkerId}
                  setVacationStartDate={setStartDate}
                  setVacationEndDate={setEndDate}
                />
              ))}
          </Grid>
          {editingId === null && (
            <Grid item xs={12}>
              <VacationItem
                key={`add-new`}
                disabled={editingId !== null}
                editVacationHandler={editVacationHandler}
                saveVacationHandler={saveVacationHandler}
                deleteVacationHandler={deleteVacationHandler}
                id={null}
                workers={workers}
                vacationWorkerId={workerId}
                vacationStartDate={startDate}
                vacationEndDate={endDate}
                setVacationWorkerId={setWorkerId}
                setVacationStartDate={setStartDate}
                setVacationEndDate={setEndDate}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

VacationForm.propTypes = {
  vacations: PropTypes.arrayOf(PropTypes.instanceOf(Vacation)),
  setVacations: PropTypes.func,
  workers: PropTypes.arrayOf(PropTypes.instanceOf(Worker)),
  dispatch: PropTypes.func,
  editingId: PropTypes.number,
  setEditingId: PropTypes.func
};

export default VacationForm;
