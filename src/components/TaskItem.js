import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import { Skill } from '../models';
import { SKILL_HIGH, SKILL_MEDIUM, SKILL_LOW } from '../constants';

const TaskItem = ({
  disabled,
  editTaskHandler,
  deleteTaskHandler,
  saveTaskHandler,
  name,
  skills,
  days,
  workers
}) => {
  const MARGIN_TOP_SKILLS = disabled ? 0 : -1;
  return (
    <Grid container sx={{ p: 0, mb: 2 }} spacing={2} alignItems="center">
      <Grid item xs={2}>
        <TextField disabled={disabled} label="task" id="task" required size="small" value={name} />
      </Grid>
      <Grid item xs={2}>
        <TextField disabled={disabled} label="days" id="days" required size="small" value={days} />
      </Grid>
      <Grid item xs={2} sx={{ mr: -4, mt: MARGIN_TOP_SKILLS }}>
        <Button
          disabled={disabled}
          variant="contained"
          sx={{ backgroundColor: 'red' }}
          size="small">
          High -
          {skills?.filter((x) => x.level === SKILL_HIGH)?.count
            ? skills?.filter((x) => x.level === SKILL_HIGH)?.count
            : 0}
        </Button>
        {!disabled && (
          <ButtonGroup variant="outlined">
            <IconButton size="small">
              <AddCircle sx={{ color: 'green', pt: 1 }} />
            </IconButton>
            <IconButton size="small">
              <RemoveCircle sx={{ color: 'orange', pt: 1 }} />
            </IconButton>
          </ButtonGroup>
        )}
      </Grid>
      <Grid item xs={2} sx={{ mr: 0, mt: MARGIN_TOP_SKILLS }}>
        <Button
          disabled={disabled}
          variant="contained"
          sx={{ backgroundColor: 'purple' }}
          size="small">
          Medium -
          {skills?.filter((x) => x.level === SKILL_MEDIUM)?.count
            ? skills?.filter((x) => x.level === SKILL_MEDIUM)?.count
            : 0}
        </Button>
        {!disabled && (
          <ButtonGroup variant="outlined">
            <IconButton size="small">
              <AddCircle sx={{ color: 'green', pt: 1 }} />
            </IconButton>
            <IconButton size="small">
              <RemoveCircle sx={{ color: 'orange', pt: 1 }} />
            </IconButton>
          </ButtonGroup>
        )}
      </Grid>
      <Grid item xs={2} sx={{ mr: 3, mt: MARGIN_TOP_SKILLS }}>
        <Button
          disabled={disabled}
          variant="contained"
          sx={{ backgroundColor: 'darkgray' }}
          size="small">
          Low -
          {skills?.filter((x) => x.level === SKILL_LOW)?.count
            ? skills?.filter((x) => x.level === SKILL_LOW)?.count
            : 0}
        </Button>
        {!disabled && (
          <ButtonGroup variant="outlined">
            <IconButton size="small">
              <AddCircle sx={{ color: 'green', pt: 1 }} />
            </IconButton>
            <IconButton size="small">
              <RemoveCircle sx={{ color: 'orange', pt: 1 }} />
            </IconButton>
          </ButtonGroup>
        )}
      </Grid>
      <Grid item xs={2}>
        <ButtonGroup variant="outlined">
          {disabled ? (
            <IconButton onClick={editTaskHandler}>
              <Edit sx={{ color: 'green' }} />
            </IconButton>
          ) : (
            <IconButton onClick={saveTaskHandler}>
              <Save sx={{ color: 'green' }} />
            </IconButton>
          )}
          <IconButton onClick={deleteTaskHandler}>
            <Delete sx={{ color: 'orange' }} />
          </IconButton>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

TaskItem.propTypes = {
  disabled: PropTypes.bool.isRequired,
  saveTaskHandler: PropTypes.func.isRequired,
  editTaskHandler: PropTypes.func.isRequired,
  deleteTaskHandler: PropTypes.func.isRequired,
  name: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.instanceOf(Skill)),
  days: PropTypes.number,
  workers: PropTypes.arrayOf(PropTypes.instanceOf(Worker))
};

export default TaskItem;
