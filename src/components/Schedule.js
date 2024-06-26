import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams } from 'react-router-dom';
import { getProjects } from '../api';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import DataTable from './DataTable';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { WEEKEND_DAYS } from '../constants';

const localizer = momentLocalizer(moment);

const getEvent = (id, title, start, end, backgroundColor, color, workerId, taskId) => {
  return {
    id: id,
    title: title,
    start: new Date(moment(start)),
    end: new Date(moment(end)),
    backgroundColor: backgroundColor,
    color: color,
    workerId: workerId,
    taskId: taskId
  };
};

const WORK_BACKGROUND_COLOR = 'teal';
const VACATION_BACKGROUND_COLOR = 'darkred';
const HOLIDAY_BACKGROUND_COLOR = 'magenta';
const HOLIDAY_TEXT_COLOR = 'white';
const VACATION_TEXT_COLOR = 'white';
const WORK_TEXT_COLOR = 'white';

const getEventsForProject = (project) => {
  const events = [];
  try {
    let count = 0;
    // add all holidays
    for (const holiday of project.holidays || []) {
      count++;
      events.push(
        getEvent(
          count,
          holiday.name,
          holiday.startDate,
          holiday.endDate,
          HOLIDAY_BACKGROUND_COLOR,
          HOLIDAY_TEXT_COLOR
        )
      );
    }
    // add all worker vacations
    for (const vacation of project.vacations || []) {
      count++;
      const worker = project.workers.find((x) => x.id == vacation.workerId);
      events.push(
        getEvent(
          count,
          `OOO: ${worker.name}`,
          vacation.startDate,
          vacation.endDate,
          VACATION_BACKGROUND_COLOR,
          VACATION_TEXT_COLOR,
          worker.id
        )
      );
    }
    // add all tasks
    for (const task of project.tasks || []) {
      count++;
      for (const worker of task.workers || []) {
        const workItem = worker.workItems.find((x) => x.taskId == task.id);
        events.push(
          getEvent(
            count,
            `${task.name}: ${worker.name}`,
            workItem.startDate,
            workItem.endDate,
            WORK_BACKGROUND_COLOR,
            WORK_TEXT_COLOR,
            worker.id,
            task.id
          )
        );
      }
    }
  } catch (error) {
    console.error(`Failed processing project events`, error);
  }
  console.log(`found events`, events);
  return transformEventsForWeekendBreaks(events, project.vacations || [], project.holidays || []);
};

const transformEventsForWeekendBreaks = (events, vacations, holidays) => {
  const transformedEvents = [];
  for (const event of events) {
    let count = 1;
    if (event.backgroundColor !== WORK_BACKGROUND_COLOR) {
      transformedEvents.push(event);
    } else {
      const workerVacations = vacations.filter((x) => x.workerId === event.workerId);
      console.log('vacations found', workerVacations);
      let date = moment(event.start);
      while (
        WEEKEND_DAYS.includes(date.day()) ||
        workerVacations.some((x) => {
          console.log('date between  1 ', date.toDate(), x.startDate, x.endDate);
          return date.isBetween(moment(x.startDate), moment(x.endDate), undefined, '[]');
        }) ||
        holidays.some((x) => {
          console.log('date between  1 ', date.toDate(), x.startDate, x.endDate);
          return date.isBetween(moment(x.startDate), moment(x.endDate), undefined, '[]');
        })
      ) {
        date = moment(date.add(1, 'd').toDate());
      }
      let startDate = new Date(date);
      while (date.isBefore(moment(event.end))) {
        while (
          !WEEKEND_DAYS.includes(date.day()) &&
          !workerVacations.some((x) => {
            console.log('date between 2 ', date.toDate(), x.startDate, x.endDate);
            return date.isBetween(moment(x.startDate), moment(x.endDate), undefined, '[]');
          }) &&
          !holidays.some((x) => {
            console.log('date between 2 ', date.toDate(), x.startDate, x.endDate);
            return date.isBetween(moment(x.startDate), moment(x.endDate), undefined, '[]');
          }) &&
          date.isBefore(moment(event.end))
        ) {
          date = moment(date.add(1, 'd').toDate());
        }
        console.log('end date in transformed event', date.toDate());
        const endDate = new Date(date);
        transformedEvents.push(
          getEvent(
            `${event.id}_${count}`,
            event.title,
            startDate,
            endDate,
            event.backgroundColor,
            event.color,
            event.workerId,
            event.taskId
          )
        );
        count++;
        while (
          WEEKEND_DAYS.includes(date.day()) ||
          workerVacations.some((x) => {
            console.log('date between 3 ', date.toDate(), x.startDate, x.endDate);
            return date.isBetween(moment(x.startDate), moment(x.endDate), undefined, '[]');
          }) ||
          holidays.some((x) => {
            console.log('date between 3 ', date.toDate(), x.startDate, x.endDate);
            return date.isBetween(moment(x.startDate), moment(x.endDate), undefined, '[]');
          })
        ) {
          date = moment(date.add(1, 'd').toDate());
        }
        startDate = new Date(date);
        if (date == moment(event.end)) {
          transformedEvents.push(
            getEvent(
              `${event.id}_${count}`,
              event.title,
              startDate,
              startDate,
              event.backgroundColor,
              event.color,
              event.workerId
            )
          );
        }
      }
    }
  }
  console.log('transformed events', transformedEvents);
  return transformedEvents;
};

const Schedule = (props) => {
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { id } = useParams();
  const project = getProjects().find((p) => p.id == id);
  console.log(`Project found: `, project);
  console.log(moment(project.startDate).toDate(), new Date(moment(project.startDate)));
  const holidayAdjustedEvents = getEventsForProject(project);
  const tableData = project.tasks
    .map((task) => {
      const data = [];
      for (const worker of task.workers || []) {
        const workItem = worker.workItems.find((x) => x.taskId == task.id);
        data.push({
          id: `${task.id}_${worker.id}`,
          title: task.name,
          worker: worker.name,
          days: holidayAdjustedEvents
            .filter((evt) => evt.workerId === worker.id && evt.taskId === task.id)
            .flatMap((evt) => moment(evt.end).diff(evt.start, 'days'))
            .reduce((a, b) => a + b, 0),
          startDate: moment(workItem.startDate).format('YYYY-MM-DD'),
          endDate: moment(workItem.endDate).add(-1, 'days').format('YYYY-MM-DD')
        });
      }
      return data;
    })
    .flatMap((x) => x);

  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" square={false}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link underline="hover" color="inherit" href="#">
                {`Projects`}
              </Link>
              {` > ${project.name}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
              <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                <Tab value="one" label="Calendar View" />
                <Tab value="two" label="Table View" />
              </Tabs>
            </Box>
            {value == 'one' && (
              <Calendar
                localizer={localizer}
                events={holidayAdjustedEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                views={{
                  month: true,
                  agenda: true
                }}
                popup
                showMultiDayTimes
                defaultDate={new Date(moment(project.startDate))}
                eventPropGetter={(event) => {
                  const backgroundColor = event?.backgroundColor || 'lightgrey';
                  const color = event?.color || 'black';
                  return { style: { backgroundColor, color } };
                }}
              />
            )}
            {value == 'two' && <DataTable tableData={tableData} projectName={project.name} />}
          </Paper>
        </Grid>
      </Box>
    </Fragment>
  );
};

Schedule.propTypes = {};

export default Schedule;
