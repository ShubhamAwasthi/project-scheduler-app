import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Skill } from '../models';
import { SKILL_HIGH, SKILL_MEDIUM, SKILL_LOW } from '../constants';

const WorkerItem = ({
  disabled,
  editWorkerHandler,
  deleteWorkerHandler,
  saveWorkerHandler,
  id,
  workerName,
  workerSkills,
  setWorkerName,
  setWorkerSkills
}) => {
  console.log(workerName, workerSkills);
  const MARGIN_TOP_SKILLS = disabled ? 0 : -1;
  const updateSkillsHandler = (event) => {
    const skillLevel = event.target.defaultValue;
    workerSkills.forEach((item) => (item.count = 0));
    const skillToUpdate = workerSkills.find((x) => x.level === skillLevel);
    skillToUpdate.count = 1;
    setWorkerSkills(workerSkills.slice());
  };
  const updateNameHandler = (event) => {
    setWorkerName(event.target.value);
  };
  return (
    <Grid container sx={{ p: 0, mb: 2 }} spacing={2} alignItems="center">
      <Grid item xs={4}>
        <TextField
          disabled={disabled}
          label="member"
          id="task"
          required
          size="small"
          value={workerName}
          onChange={updateNameHandler}
        />
      </Grid>
      <Grid item xs={6} sx={{ mr: -4, mt: MARGIN_TOP_SKILLS }}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="skill-radio-buttons-group-label"
            defaultValue={SKILL_HIGH}
            name="radio-buttons-group"
            value={workerSkills.find((x) => x.count == 1)?.level || SKILL_LOW}
            onChange={updateSkillsHandler}>
            {disabled ? (
              <>
                <FormControlLabel disabled value={SKILL_HIGH} control={<Radio />} label="HIGH" />
                <FormControlLabel
                  disabled
                  value={SKILL_MEDIUM}
                  control={<Radio />}
                  label="MEDIUM"
                />
                <FormControlLabel disabled value={SKILL_LOW} control={<Radio />} label="LOW" />
              </>
            ) : (
              <>
                <FormControlLabel value={SKILL_HIGH} control={<Radio />} label="HIGH" />
                <FormControlLabel value={SKILL_MEDIUM} control={<Radio />} label="MEDIUM" />
                <FormControlLabel value={SKILL_LOW} control={<Radio />} label="LOW" />
              </>
            )}
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <ButtonGroup variant="outlined">
          {disabled ? (
            <IconButton onClick={() => editWorkerHandler(id)}>
              <Edit sx={{ color: 'green' }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => saveWorkerHandler(id, workerName, workerSkills)}>
              <Save sx={{ color: 'green' }} />
            </IconButton>
          )}
          <IconButton onClick={() => deleteWorkerHandler(id)}>
            <Delete sx={{ color: 'orange' }} />
          </IconButton>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

WorkerItem.propTypes = {
  id: PropTypes.number,
  disabled: PropTypes.bool.isRequired,
  saveWorkerHandler: PropTypes.func.isRequired,
  editWorkerHandler: PropTypes.func.isRequired,
  deleteWorkerHandler: PropTypes.func.isRequired,
  workerName: PropTypes.string,
  workerSkills: PropTypes.arrayOf(PropTypes.instanceOf(Skill)),
  setWorkerName: PropTypes.func,
  setWorkerSkills: PropTypes.func
};

export default WorkerItem;
