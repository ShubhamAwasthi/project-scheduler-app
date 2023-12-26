import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useState, createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';
import {
  PATH_PROJECT_EDIT_WIZARD,
  PATH_PROJECT_WIZARD,
  PROJECT_REMOVE,
  PATH_PROJECT_VIEW
} from '../constants';
import { Project } from '../models';
import moment from 'moment';

const ProjectItems = ({ projects, dispatch }) => {
  const [addingProject, setAddingProject] = useState(false);
  const navigate = useNavigate();
  const inputRef = createRef();

  const editProjectHandler = (id) => {
    navigate(`${PATH_PROJECT_EDIT_WIZARD.replace(':id', id)}`);
  };
  const deleteProjectHandler = (id) => {
    dispatch({ type: PROJECT_REMOVE, id: id });
  };
  const viewProjectHandler = (id) => {
    navigate(`${PATH_PROJECT_VIEW.replace(':id', id)}`);
  };
  return (
    <>
      {projects.length > 0 ? (
        <>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.name}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>
                    {project.startDate ? moment(project.startDate).format('DD-MM-YYYY') : '-'}
                  </TableCell>
                  <TableCell>
                    <ButtonGroup variant="outlined">
                      <IconButton onClick={() => viewProjectHandler(project.id)}>
                        <VisibilityIcon sx={{ color: 'purple' }} />
                      </IconButton>
                      <IconButton onClick={() => editProjectHandler(project.id)}>
                        <Edit sx={{ color: 'green' }} />
                      </IconButton>
                      <IconButton onClick={() => deleteProjectHandler(project.id)}>
                        <Delete sx={{ color: 'orange' }} />
                      </IconButton>
                    </ButtonGroup>
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
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)),
  dispatch: PropTypes.func
};

export default ProjectItems;
