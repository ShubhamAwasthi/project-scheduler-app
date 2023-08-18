import { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HolidayItem from './HolidayItem';
import { Holiday } from '../models';
import moment from 'moment';

const HolidayForm = ({ holidays, setHolidays, dispatch, editingId, setEditingId }) => {
  const saveHolidayHandler = (id, startDate, endDate, name) => {
    console.log('save handler', holidays, startDate, endDate, name);
    let holidayToSave = holidays.find((x) => x.id === id);
    if (holidayToSave) {
      console.log('found existing holiday', holidayToSave, startDate, endDate);
      holidayToSave.name = name;
      holidayToSave.startDate = startDate;
      holidayToSave.endDate = endDate;
    } else {
      console.log('not found existing holiday');
      holidayToSave = new Holiday(id || moment().valueOf(), startDate, endDate, name);
      console.log(holidayToSave, 'saved this');
    }
    setHolidays([...holidays.filter((x) => x.id !== id), holidayToSave]);
    setEditingId(null);
    setStartDate(null);
    setEndDate(null);
    setName('');
  };

  const editHolidayHandler = (id) => {
    const holidayToEdit = holidays.find((x) => x.id === id);
    setName(holidayToEdit.name);
    setEditingId(id);
    setStartDate(holidayToEdit.startDate);
    setEndDate(holidayToEdit.endDate);
  };

  const deleteHolidayHandler = (id) => {
    setHolidays([...holidays.filter((x) => x.id !== id)]);
  };

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {`Holidays`}
      </Typography>
      <Box sx={{ height: '50%', display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {holidays
              .sort((a, b) => a.id - b.id)
              .map((holiday) => (
                <HolidayItem
                  key={holiday.id}
                  disabled={holiday.id !== editingId}
                  editHolidayHandler={editHolidayHandler}
                  saveHolidayHandler={saveHolidayHandler}
                  deleteHolidayHandler={deleteHolidayHandler}
                  id={holiday.id}
                  holidayName={holiday.id !== editingId ? holiday.name : name}
                  holidayStartDate={holiday.id !== editingId ? holiday.startDate : startDate}
                  holidayEndDate={holiday.id !== editingId ? holiday.endDate : endDate}
                  setHolidayName={setName}
                  setHolidayStartDate={setStartDate}
                  setHolidayEndDate={setEndDate}
                />
              ))}
          </Grid>
          {editingId === null && (
            <Grid item xs={12}>
              <HolidayItem
                key={`add-new`}
                disabled={editingId !== null}
                editHolidayHandler={editHolidayHandler}
                saveHolidayHandler={saveHolidayHandler}
                deleteHolidayHandler={deleteHolidayHandler}
                id={null}
                holidayName={name}
                holidayStartDate={startDate}
                holidayEndDate={endDate}
                setHolidayName={setName}
                setHolidayStartDate={setStartDate}
                setHolidayEndDate={setEndDate}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

HolidayForm.propTypes = {
  holidays: PropTypes.arrayOf(PropTypes.instanceOf(Holiday)),
  setHolidays: PropTypes.func,
  dispatch: PropTypes.func,
  editingId: PropTypes.number,
  setEditingId: PropTypes.func
};

export default HolidayForm;
