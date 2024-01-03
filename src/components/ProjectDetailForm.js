import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import moment from 'moment';

const ProjectDetailForm = ({ projectDetails, setProjectDetails, dispatch }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {`Project Details`}
      </Typography>
      <Box sx={{ height: '50%', display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="name"
              name="name"
              label="name"
              value={projectDetails.name}
              required
              onChange={(event) =>
                setProjectDetails({ ...projectDetails, name: event.target.value })
              }
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="start date"
              onChange={(newValue) => {
                setProjectDetails({
                  ...projectDetails,
                  startDate: moment(newValue).startOf('day')
                });
              }}
              value={projectDetails.startDate}
              renderInput={(params) => <TextField size="small" {...params} />}
              required
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

ProjectDetailForm.propTypes = {
  projectDetails: PropTypes.object,
  setProjectDetails: PropTypes.func,
  dispatch: PropTypes.func
};

export default ProjectDetailForm;
