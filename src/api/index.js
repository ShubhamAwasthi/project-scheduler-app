/* eslint-disable guard-for-in */
import * as Lockr from 'lockr';
import { PROJECTS_KEY, WEEKEND_DAYS } from '../constants';
import * as moment from 'moment';
import { WorkItem } from '../models';

export const setProjects = (projects) => {
  console.log('before saving to browser', projects);
  Lockr.set(PROJECTS_KEY, projects);
  console.log('after saving  to browser', getProjects());
};

export const getProjects = () => {
  return Lockr.get(PROJECTS_KEY, []);
};

export const assignTasks = (project) => {
  console.log(`before assigning tasks`, project);
  /**
   * Algorithm
   * iterate tasks in the order of id
   * find out which worker can complete the task in minimum time
   *  - note that you must take into account the holidays and worker vacations
   *  - note that you must take into account the weekend are off days
   *  - note that the skill level of worker must match against the task
   *  - note that if multiple skills are needed for this task, then multiple workers may be assigned
   *  - note that you must utilize the lower skill workers for days which can be filled by workers with different skill levels
   *  - note that if you did not find free lower skill workers, then we can consider using higher skills workers
   *  - note that if we did not find the match for the skill, we need to leave that task unassigned and move to other tasks
   * create a workItem for this task with start and end date and update to worker(s)
   * add the worker detail to this task
   * once all tasks are assigned we can return the project
   */
  // Iterate the tasks and clear worker
  for (const task of project.tasks) {
    console.log(`before `, task);
    task.workers = [];
    console.log(`after `, task);
  }
  // Iterate the workers and remove workItems
  for (const worker of project.workers) {
    console.log(`before `, worker);
    worker.workItems = [];
    console.log(`after `, worker);
  }
  // Iterate tasks and assign workers
  const projectStartDateMoment = moment(project.startDate);
  for (const task of project.tasks) {
    const nextWorkingDay = getNextWorkingDay(
      projectStartDateMoment,
      WEEKEND_DAYS,
      project.holidays
    );
    console.log(nextWorkingDay, task);
    const skillWorkerMap = {};
    let isAssignmentPossible = true;
    let totalWorkers = 0;
    for (const skill of task.skills) {
      if (!skillWorkerMap[skill.level]) {
        skillWorkerMap[skill.level] = [];
      }
      for (const worker of project.workers) {
        if (worker.skills.some((x) => x.level == skill.level && x.count > 0)) {
          skillWorkerMap[skill.level].push(worker);
        }
      }
      if (skill.count > skillWorkerMap[skill.level].length) {
        isAssignmentPossible = false;
        break;
      }
      totalWorkers = totalWorkers + skill.count;
    }
    if (isAssignmentPossible) {
      // find the first free person who can finish off the task fastest for a particular skill
      for (const skill of task.skills) {
        if (skill.count == 0) {
          continue;
        }
        let count = skill.count;
        const workers = skillWorkerMap[skill.level];
        while (count > 0) {
          const workerAndDatesForTask = getWorkerForTask(
            task,
            workers,
            project.holidays,
            project.vacations,
            projectStartDateMoment,
            Math.ceil(task.days / totalWorkers)
          );
          count--;
          console.log(count);
          console.log(`assigning worker: `, workerAndDatesForTask);
          if (!task.workers) {
            task.workers = [];
          }
          const worker = workerAndDatesForTask.workerForTask;
          task.workers.push(worker);
          if (!worker.workItems) {
            worker.workItems = [];
          }
          worker.workItems.push(
            new WorkItem(
              moment().valueOf(),
              task.id,
              workerAndDatesForTask.startDate,
              workerAndDatesForTask.endDate
            )
          );
          console.log(`done assigning worker`, workerAndDatesForTask);
        }
      }
    }
    console.log(`skillMap: `, skillWorkerMap, task);
  }
  console.log(`after assigning tasks`, project);
  return project;
};

const getWorkerForTask = (task, workers, holidays, vacations, projectStartDateMoment, days) => {
  // find the first person that can close on work fastest and return them
  const workersEligibleForTask = workers.filter(
    (w) => !(task.workers || []).some((x) => x.id == w.id)
  );
  console.log(`workers Eligible`, workersEligibleForTask);
  let workerForTask = null;
  let endDate = null;
  let startDate = null;

  for (const worker of workersEligibleForTask) {
    let workerDays = days;
    const workerVacations = (vacations || []).filter((v) => v.workerId == worker.id);
    const workerWorkItems = worker.workItems || [];
    console.log('workerWorkItems', workerWorkItems);
    let nextWorkingDay = moment(projectStartDateMoment);
    while (workerDays > 0) {
      nextWorkingDay = getNextWorkingDay(nextWorkingDay, WEEKEND_DAYS, [
        ...holidays,
        ...workerVacations,
        ...workerWorkItems
      ]);
      console.log('before next day', nextWorkingDay.toDate());
      nextWorkingDay = nextWorkingDay.add(1, 'd');
      console.log('after next day', nextWorkingDay.toDate());
      workerDays--;
      console.log(workerDays, nextWorkingDay);
    }
    if (endDate == null || nextWorkingDay.isBefore(endDate)) {
      workerForTask = worker;
      console.log('worker name: ', worker.name);
      endDate = nextWorkingDay;
      startDate = getNextWorkingDay(moment(projectStartDateMoment), WEEKEND_DAYS, [
        ...holidays,
        ...workerVacations,
        ...workerWorkItems
      ]);
    }
  }
  return { workerForTask, startDate, endDate };
};

const getNextWorkingDay = (projectStartDateMoment, weekendDays, holidays) => {
  console.log(
    `Before calculating next working day`,
    projectStartDateMoment.toDate(),
    weekendDays,
    holidays
  );
  while (
    weekendDays.includes(projectStartDateMoment.day()) ||
    holidays.some((holiday) =>
      projectStartDateMoment.isBetween(holiday.startDate, holiday.endDate, 'days', '[]')
    )
  ) {
    projectStartDateMoment = projectStartDateMoment.add(1, 'd');
  }
  console.log(
    `After calculating next working day`,
    projectStartDateMoment.toDate(),
    weekendDays,
    holidays
  );
  return projectStartDateMoment;
};

// Refer below structure of project
// {
//     "id": 1702178465838,
//     "name": "CalculatorApp",
//     "startDate": "2023-11-16T05:25:00.000Z",
//     "tasks": [
//         {
//             "id": 1699421196376,
//             "name": "FrontEnd",
//             "skills": [
//                 {
//                     "level": "SKILL_HIGH",
//                     "count": 0
//                 },
//                 {
//                     "level": "SKILL_MEDIUM",
//                     "count": 1
//                 },
//                 {
//                     "level": "SKILL_LOW",
//                     "count": 0
//                 }
//             ],
//             "days": "5",
//             "workers": []
//         },
//         {
//             "id": 1699421225906,
//             "name": "DomainLogic",
//             "skills": [
//                 {
//                     "level": "SKILL_HIGH",
//                     "count": 1
//                 },
//                 {
//                     "level": "SKILL_MEDIUM",
//                     "count": 1
//                 },
//                 {
//                     "level": "SKILL_LOW",
//                     "count": 0
//                 }
//             ],
//             "days": "3",
//             "workers": []
//         },
//         {
//             "id": 1699421332290,
//             "name": "ThemeCreation",
//             "skills": [
//                 {
//                     "level": "SKILL_HIGH",
//                     "count": 0
//                 },
//                 {
//                     "level": "SKILL_MEDIUM",
//                     "count": 1
//                 },
//                 {
//                     "level": "SKILL_LOW",
//                     "count": 0
//                 }
//             ],
//             "days": "5",
//             "workers": []
//         }
//     ],
//     "workers": [
//         {
//             "id": 1699421368835,
//             "name": "Shubham",
//             "skills": [
//                 {
//                     "level": "SKILL_HIGH",
//                     "count": 1
//                 },
//                 {
//                     "level": "SKILL_MEDIUM",
//                     "count": 0
//                 },
//                 {
//                     "level": "SKILL_LOW",
//                     "count": 0
//                 }
//             ]
//         },
//         {
//             "id": 1699421382313,
//             "name": "Anita",
//             "skills": [
//                 {
//                     "level": "SKILL_HIGH",
//                     "count": 0
//                 },
//                 {
//                     "level": "SKILL_MEDIUM",
//                     "count": 1
//                 },
//                 {
//                     "level": "SKILL_LOW",
//                     "count": 0
//                 }
//             ]
//         },
//         {
//             "id": 1699421402787,
//             "name": "Satyam",
//             "skills": [
//                 {
//                     "level": "SKILL_HIGH",
//                     "count": 0
//                 },
//                 {
//                     "level": "SKILL_MEDIUM",
//                     "count": 0
//                 },
//                 {
//                     "level": "SKILL_LOW",
//                     "count": 0
//                 }
//             ]
//         }
//     ],
//     "holidays": [
//         {
//             "id": 1699421434748,
//             "startDate": "2023-11-10T08:00:00.000Z",
//             "endDate": "2023-11-10T08:00:00.000Z",
//             "name": "Dhanteras"
//         }
//     ],
//     "vacations": [
//         {
//             "id": 1699421474334,
//             "workerId": 1699421368835,
//             "startDate": "2023-11-15T08:00:00.000Z",
//             "endDate": "2023-11-15T08:00:00.000Z"
//         },
//         {
//             "id": 1699421502577,
//             "workerId": 1699421382313,
//             "startDate": "2023-11-17T08:00:00.000Z",
//             "endDate": "2023-11-20T08:00:00.000Z"
//         }
//     ]
// }
