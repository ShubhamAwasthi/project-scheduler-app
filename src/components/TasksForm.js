import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TaskItem from './TaskItem';
import { Task } from '../models';

const TasksForm = ({ tasks, setTasks, dispatch }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {`Tasks`}
      </Typography>
      <Box sx={{ height: '50%', display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TaskItem
              disabled={true}
              editTaskHandler={console.log}
              saveTaskHandler={console.log}
              deleteTaskHandler={console.log}
            />
            <TaskItem
              disabled={true}
              editTaskHandler={console.log}
              saveTaskHandler={console.log}
              deleteTaskHandler={console.log}
            />
            <TaskItem
              disabled={true}
              editTaskHandler={console.log}
              saveTaskHandler={console.log}
              deleteTaskHandler={console.log}
            />
            <TaskItem
              disabled={true}
              editTaskHandler={console.log}
              saveTaskHandler={console.log}
              deleteTaskHandler={console.log}
            />
          </Grid>
          <Grid item xs={12}>
            <TaskItem
              disabled={false}
              editTaskHandler={console.log}
              saveTaskHandler={console.log}
              deleteTaskHandler={console.log}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

TasksForm.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.instanceOf(Task)),
  setTasks: PropTypes.func,
  dispatch: PropTypes.func
};

export default TasksForm;
