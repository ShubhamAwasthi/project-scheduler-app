import { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WorkerItem from './WorkerItem';
import { Skill, Worker } from '../models';
import { SKILL_HIGH, SKILL_MEDIUM, SKILL_LOW } from '../constants';
import moment from 'moment';

const WorkerForm = ({ workers, setWorkers, dispatch, editingId, setEditingId }) => {
  const saveWorkerHandler = (id, name, days, skills) => {
    console.log('save handler', workers, name, skills, days, id);
    let workerToSave = workers.find((x) => x.id === id);
    if (workerToSave) {
      console.log('found existing worker');
      workerToSave.name = name;
      workerToSave.skills = skills;
      workerToSave.days = days;
    } else {
      console.log('not found existing task');
      workerToSave = new Worker(id || moment().valueOf(), name, skills, days, []);
      console.log(workerToSave, 'saved this');
    }
    setWorkers([...workers.filter((x) => x.id !== id), workerToSave]);
    setEditingId(null);
    setSkills(getDefaultSkills());
    setName('');
  };

  const editWorkerHandler = (id, name, skills, days) => {
    const workerToEdit = workers.find((x) => x.id === id);
    setSkills(workerToEdit.skills);
    setName(workerToEdit.names);
    setEditingId(id);
  };

  const deleteWorkerHandler = (id) => {
    setWorkers([...workers.filter((x) => x.id !== id)]);
  };

  const getDefaultSkills = () => {
    return [new Skill(SKILL_HIGH, 0), new Skill(SKILL_MEDIUM, 0), new Skill(SKILL_LOW, 0)];
  };
  const [skills, setSkills] = useState(getDefaultSkills());
  const [name, setName] = useState('');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {`Team members`}
      </Typography>
      <Box sx={{ height: '50%', display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {workers
              .sort((a, b) => a.id - b.id)
              .map((worker) => (
                <WorkerItem
                  key={worker.id}
                  disabled={worker.id !== editingId}
                  editWorkerHandler={editWorkerHandler}
                  saveWorkerHandler={saveWorkerHandler}
                  deleteWorkerHandler={deleteWorkerHandler}
                  id={worker.id}
                  workerName={worker.name}
                  workerSkills={worker.skills}
                  setWorkerName={setName}
                  setWorkerSkills={setSkills}
                />
              ))}
          </Grid>
          {editingId === null && (
            <Grid item xs={12}>
              <WorkerItem
                key={'add-new'}
                disabled={editingId !== null}
                editWorkerHandler={editWorkerHandler}
                saveWorkerHandler={saveWorkerHandler}
                deleteWorkerHandler={deleteWorkerHandler}
                id={null}
                workerName={name}
                workerSkills={skills}
                setWorkerName={setName}
                setWorkerSkills={setSkills}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

WorkerForm.propTypes = {
  workers: PropTypes.arrayOf(PropTypes.instanceOf(Worker)),
  setWorkers: PropTypes.func,
  dispatch: PropTypes.func,
  editingId: PropTypes.number,
  setEditingId: PropTypes.func
};

export default WorkerForm;
