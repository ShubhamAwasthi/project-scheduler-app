import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useContext, useState, createRef } from 'react';
import { DispatchContext } from '../store';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid';
import { getProject, setProject } from '../api';

const ProjectItems = () => {
  const dispatch = useContext(DispatchContext);
  // const state = useContext(ProjectContext);
  const projects = getProject() ? [getProject()] : [];
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
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project}>
                  <TableCell>{project}</TableCell>
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
              onClick={() => setAddingProject(true)}>
              Add
            </Button>
          )}
          {addingProject && (
            <Button
              size="small"
              variant="outlined"
              endIcon={<CheckIcon />}
              onClick={() => {
                setAddingProject(false);
                setProject({ name: inputRef.current.value, dispatch });
              }}>
              Save
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectItems;
