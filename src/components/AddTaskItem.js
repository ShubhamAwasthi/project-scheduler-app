import TextField from '@mui/material/TextField';
import Save from '@mui/icons-material/Save';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';

const AddTaskItem = () => {
  return (
    <Grid container sx={{ p: 0 }} spacing={3}>
      <Grid item xs={2}>
        <TextField label="task" id="task" required size="small" />
      </Grid>
      <Grid item xs={2}>
        <TextField label="days" id="days" required size="small" />
      </Grid>
      <Grid item xs={2} sx={{ mr: -4, mt: -1 }}>
        <Button variant="contained" sx={{ backgroundColor: 'red' }}>
          High
        </Button>
        <ButtonGroup variant="outlined">
          <IconButton size="small">
            <AddCircle sx={{ color: 'green', pt: 1 }} />
          </IconButton>
          <IconButton size="small">
            <RemoveCircle sx={{ color: 'orange', pt: 1 }} />
          </IconButton>
        </ButtonGroup>
      </Grid>
      <Grid item xs={2} sx={{ mr: -1, mt: -1 }}>
        <Button variant="contained" sx={{ backgroundColor: 'purple' }}>
          Medium
        </Button>
        <ButtonGroup variant="outlined">
          <IconButton size="small">
            <AddCircle sx={{ color: 'green', pt: 1 }} />
          </IconButton>
          <IconButton size="small">
            <RemoveCircle sx={{ color: 'orange', pt: 1 }} />
          </IconButton>
        </ButtonGroup>
      </Grid>
      <Grid item xs={2} sx={{ mr: 3, mt: -1 }}>
        <Button variant="contained" sx={{ backgroundColor: 'darkgray' }}>
          Low
        </Button>
        <ButtonGroup variant="outlined">
          <IconButton size="small">
            <AddCircle sx={{ color: 'green', pt: 1 }} />
          </IconButton>
          <IconButton size="small">
            <RemoveCircle sx={{ color: 'orange', pt: 1 }} />
          </IconButton>
        </ButtonGroup>
      </Grid>
      <Grid item xs={2}>
        <ButtonGroup variant="outlined">
          <IconButton>
            <Save sx={{ color: 'green' }} />
          </IconButton>
          <IconButton>
            <Delete sx={{ color: 'orange' }} />
          </IconButton>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default AddTaskItem;
