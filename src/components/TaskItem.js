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
  id,
  taskName,
  taskDays,
  taskSkills,
  setTaskName,
  setTaskDays,
  setTaskSkills,
  taskWorkers
}) => {
  console.log(taskName, taskDays, taskSkills);
  const MARGIN_TOP_SKILLS = disabled ? 0 : -1;
  const ADD = 'ADD';
  const REMOVE = 'REMOVE';
  const updateSkillsHandler = (skillLevel, skillAction) => {
    const skillToUpdate = taskSkills.find((x) => x.level === skillLevel);
    if (skillAction === ADD) {
      skillToUpdate.count = 1 + skillToUpdate.count;
    } else if (skillAction === REMOVE) {
      skillToUpdate.count = Math.max(0, skillToUpdate.count - 1);
    }
    setTaskSkills(taskSkills.slice());
  };
  const updateNameHandler = (event) => {
    setTaskName(event.target.value);
  };
  const updateDaysHandler = (event) => {
    setTaskDays(event.target.value);
  };
  return (
    <Grid container sx={{ p: 0, mb: 2 }} spacing={2} alignItems="center">
      <Grid item xs={2}>
        <TextField
          disabled={disabled}
          label="task"
          id="task"
          required
          size="small"
          value={taskName}
          onChange={updateNameHandler}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          disabled={disabled}
          label="days"
          id="days"
          required
          size="small"
          value={taskDays}
          onChange={updateDaysHandler}
        />
      </Grid>
      <Grid item xs={2} sx={{ mr: -4, mt: MARGIN_TOP_SKILLS }}>
        <Button
          disabled={disabled}
          variant="contained"
          sx={{ backgroundColor: 'red' }}
          size="small">
          High -{taskSkills?.find((x) => x.level === SKILL_HIGH)?.count || 0}
        </Button>
        {!disabled && (
          <ButtonGroup variant="outlined">
            <IconButton size="small" onClick={() => updateSkillsHandler(SKILL_HIGH, ADD)}>
              <AddCircle sx={{ color: 'green', pt: 1 }} />
            </IconButton>
            <IconButton size="small" onClick={() => updateSkillsHandler(SKILL_HIGH, REMOVE)}>
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
          Medium -{taskSkills?.find((x) => x.level === SKILL_MEDIUM)?.count || 0}
        </Button>
        {!disabled && (
          <ButtonGroup variant="outlined">
            <IconButton size="small" onClick={() => updateSkillsHandler(SKILL_MEDIUM, ADD)}>
              <AddCircle sx={{ color: 'green', pt: 1 }} />
            </IconButton>
            <IconButton size="small" onClick={() => updateSkillsHandler(SKILL_MEDIUM, REMOVE)}>
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
          Low -{taskSkills?.find((x) => x.level === SKILL_LOW)?.count || 0}
        </Button>
        {!disabled && (
          <ButtonGroup variant="outlined">
            <IconButton size="small" onClick={() => updateSkillsHandler(SKILL_LOW, ADD)}>
              <AddCircle sx={{ color: 'green', pt: 1 }} />
            </IconButton>
            <IconButton size="small" onClick={() => updateSkillsHandler(SKILL_LOW, REMOVE)}>
              <RemoveCircle sx={{ color: 'orange', pt: 1 }} />
            </IconButton>
          </ButtonGroup>
        )}
      </Grid>
      <Grid item xs={2}>
        <ButtonGroup variant="outlined">
          {disabled ? (
            <IconButton onClick={() => editTaskHandler(id)}>
              <Edit sx={{ color: 'green' }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => saveTaskHandler(id, taskName, taskDays, taskSkills)}>
              <Save sx={{ color: 'green' }} />
            </IconButton>
          )}
          <IconButton onClick={() => deleteTaskHandler(id)}>
            <Delete sx={{ color: 'orange' }} />
          </IconButton>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

TaskItem.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  saveTaskHandler: PropTypes.func.isRequired,
  editTaskHandler: PropTypes.func.isRequired,
  deleteTaskHandler: PropTypes.func.isRequired,
  taskName: PropTypes.string,
  taskSkills: PropTypes.arrayOf(PropTypes.instanceOf(Skill)),
  taskDays: PropTypes.number,
  setTaskName: PropTypes.func,
  setTaskDays: PropTypes.func,
  setTaskSkills: PropTypes.func,
  taskWorkers: PropTypes.arrayOf(PropTypes.instanceOf(Worker))
};

export default TaskItem;
