import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TaskItem from './TaskItem';
import AddTaskItem from './AddTaskItem';

const TasksForm = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {`Tasks`}
      </Typography>
      <Box sx={{ height: '50%', display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </Grid>
          <Grid item xs={12}>
            <AddTaskItem />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TasksForm;
