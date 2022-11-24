import Button from '@mui/material/Button';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => (
  <div>
    <Calendar
      localizer={localizer}
      events={[
        {
          start: moment().toDate(),
          end: moment().add(1, 'days').toDate(),
          title: 'Some title'
        }
      ]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
);
const App = () => {
  return (
    <div>
      <Button variant="contained">Contained</Button>
      <MyCalendar />
    </div>
  );
};

export default App;
