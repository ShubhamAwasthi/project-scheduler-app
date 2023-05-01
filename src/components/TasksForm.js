import { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TaskItem from './TaskItem';
import { Skill, Task } from '../models';
import { SKILL_HIGH, SKILL_MEDIUM, SKILL_LOW } from '../constants';
import moment from 'moment';

const TasksForm = ({ tasks, setTasks, dispatch, editingId, setEditingId }) => {
  const saveTaskHandler = (id, name, days, skills) => {
    console.log('save handler', tasks, name, skills, days, id);
    let taskToSave = tasks.find((x) => x.id === id);
    if (taskToSave) {
      console.log('found existing task');
      taskToSave.name = name;
      taskToSave.skills = skills;
      taskToSave.days = days;
    } else {
      console.log('not found existing task');
      taskToSave = new Task(id || moment().valueOf(), name, skills, days, []);
      console.log(taskToSave, 'saved this');
    }
    setTasks([...tasks.filter((x) => x.id !== id), taskToSave]);
    setEditingId(null);
    setSkills(getDefaultSkills());
    setName('');
    setDays(0);
  };

  const editTaskHandler = (id, name, skills, days) => {
    const taskToEdit = tasks.find((x) => x.id === id);
    setSkills(taskToEdit.skills);
    setName(taskToEdit.names);
    setDays(taskToEdit.days);
    setEditingId(id);
  };

  const deleteTaskHandler = (id) => {
    setTasks([...tasks.filter((x) => x.id !== id)]);
  };

  const getDefaultSkills = () => {
    return [new Skill(SKILL_HIGH, 0), new Skill(SKILL_MEDIUM, 0), new Skill(SKILL_LOW, 0)];
  };
  const [skills, setSkills] = useState(getDefaultSkills());
  const [name, setName] = useState('');
  const [days, setDays] = useState(0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {`Tasks`}
      </Typography>
      <Box sx={{ height: '50%', display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {tasks
              .sort((a, b) => a.id - b.id)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  disabled={task.id !== editingId}
                  editTaskHandler={editTaskHandler}
                  saveTaskHandler={saveTaskHandler}
                  deleteTaskHandler={deleteTaskHandler}
                  id={task.id}
                  taskName={task.name}
                  taskDays={task.days}
                  taskSkills={task.skills}
                  setTaskName={setName}
                  setTaskDays={setDays}
                  setTaskSkills={setSkills}
                />
              ))}
          </Grid>
          {editingId === null && (
            <Grid item xs={12}>
              <TaskItem
                key={'add-new'}
                disabled={editingId !== null}
                editTaskHandler={editTaskHandler}
                saveTaskHandler={saveTaskHandler}
                deleteTaskHandler={deleteTaskHandler}
                id={null}
                taskName={name}
                taskDays={days}
                taskSkills={skills}
                setTaskName={setName}
                setTaskDays={setDays}
                setTaskSkills={setSkills}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

TasksForm.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.instanceOf(Task)),
  setTasks: PropTypes.func,
  dispatch: PropTypes.func,
  editingId: PropTypes.number,
  setEditingId: PropTypes.func
};

export default TasksForm;
