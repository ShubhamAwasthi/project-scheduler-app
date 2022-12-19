import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TaskItem from './TaskItem';

const TasksForm = () => {
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

export default TasksForm;
