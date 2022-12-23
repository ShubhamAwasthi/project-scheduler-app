import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useState, createRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { PATH_PROJECT_WIZARD } from '../constants';
import { Project } from '../models';
import moment from 'moment';

const ProjectItems = ({ projects }) => {
  const [addingProject, setAddingProject] = useState(false);
  const inputRef = createRef();
  return (
    <>
      {projects.length > 0 ? (
        <>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Start Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.name}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>
                    {project.startDate ? moment(project.startDate).format('DD-MM-YYYY') : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            No current Projects !!
          </Typography>
        </>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {addingProject && (
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              inputRef={inputRef}
            />
          )}
        </Grid>
        <Grid item xs={2}>
          {!addingProject && (
            <Button
              size="small"
              variant="outlined"
              endIcon={<AddIcon />}
              onClick={() => setAddingProject(true)}
              component={Link}
              to={PATH_PROJECT_WIZARD}>
              Add
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

ProjectItems.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project))
};

export default ProjectItems;
