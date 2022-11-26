import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';

const ProjectItems = ({ projects }) => {
  return projects.length > 0 ? (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.name}>
              <TableCell>{project.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  ) : (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      No current Projects !!
    </Typography>
  );
};

ProjectItems.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object)
};

export default ProjectItems;
