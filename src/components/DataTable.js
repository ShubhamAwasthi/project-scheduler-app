import PropTypes from 'prop-types';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 250 },
  { field: 'title', headerName: 'Title', width: 100 },
  { field: 'worker', headerName: 'Worker', width: 100 },
  { field: 'days', headerName: 'Working Days', width: 100 },
  { field: 'startDate', headerName: 'StartDate', width: 100 },
  { field: 'endDate', headerName: 'EndDate', width: 100 }
];

const DataTable = (props) => {
  const { tableData, projectName } = props;
  console.log(tableData);

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            csvOptions: { fileName: projectName },
            printOptions: { fileName: projectName }
          }
        }}
      />
    </div>
  );
};

DataTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  projectName: PropTypes.string
};

export default DataTable;
