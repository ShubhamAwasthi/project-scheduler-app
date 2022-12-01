import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import ProjectItems from './ProjectItems';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Profile = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" square={false}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Projects
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <ProjectItems />
        </Paper>
      </Grid>
    </Box>
  );
};

export default Profile;
