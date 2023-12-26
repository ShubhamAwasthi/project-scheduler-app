import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { getProjects } from '../api';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const getEvent = (id, title, start, end, backgroundColor, color) => {
  return {
    id: id,
    title: title,
    start: new Date(moment(start)),
    end: new Date(moment(end)),
    backgroundColor: backgroundColor,
    color: color
  };
};

const getEventsForProject = (project) => {
  const events = [];
  try {
    let count = 0;
    // add all holidays
    for (const holiday of project.holidays || []) {
      count++;
      events.push(
        getEvent(count, holiday.name, holiday.startDate, holiday.endDate, 'magenta', 'white')
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
          'darkred',
          'white'
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
            'teal',
            'white'
          )
        );
      }
    }
  } catch (error) {
    console.error(`Failed processing project events`, error);
  }
  console.log(`found events`, events);
  return events;
};

const Schedule = (props) => {
  const { id } = useParams();
  const project = getProjects().find((p) => p.id == id);
  console.log(`Project found: `, project);
  console.log(moment(project.startDate).toDate(), new Date(moment(project.startDate)));
  return (
    <Fragment>
      <Calendar
        localizer={localizer}
        events={getEventsForProject(project)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        popup
        showMultiDayTimes
        defaultDate={new Date(moment(project.startDate))}
        eventPropGetter={(event) => {
          const backgroundColor = event?.backgroundColor || 'lightgrey';
          const color = event?.color || 'black';
          return { style: { backgroundColor, color } };
        }}
      />
    </Fragment>
  );
};

Schedule.propTypes = {};

export default Schedule;
