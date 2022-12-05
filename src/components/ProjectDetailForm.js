import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ProjectDetailForm = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
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
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="start date"
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              value={startDate}
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

export default ProjectDetailForm;
