import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { getProjects } from '../api';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { WEEKEND_DAYS } from '../constants';

const localizer = momentLocalizer(moment);

const getEvent = (id, title, start, end, backgroundColor, color, workerId) => {
  return {
    id: id,
    title: title,
    start: new Date(moment(start)),
    end: new Date(moment(end)),
    backgroundColor: backgroundColor,
    color: color,
    workerId: workerId
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
            worker.id
          )
        );
      }
    }
  } catch (error) {
    console.error(`Failed processing project events`, error);
  }
  console.log(`found events`, events);
  return transformEventsForWeekendBreaks(events, project.vacations || []);
};

const transformEventsForWeekendBreaks = (events, vacations) => {
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
            event.color
          )
        );
        count++;
        while (
          WEEKEND_DAYS.includes(date.day()) ||
          workerVacations.some((x) => {
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
              event.color
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
