/* eslint-disable guard-for-in */
import * as Lockr from 'lockr';
import { PROJECTS_KEY } from '../constants';
import * as moment from 'moment';

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
  // Iterate the tasks
  const projectStartDateMoment = moment(project.startDate);
  const weekendDays = [0, 7];
  for (const task of project.tasks) {
    const nextWorkingDay = getNextWorkingDay(projectStartDateMoment, weekendDays, project.holidays);
    console.log(nextWorkingDay, task);
    const skillWorkerMap = {};
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
        continue;
      }
    }
    console.log(`skillMap: `, skillWorkerMap, task);
  }
  console.log(`after assigning tasks`, project);
  return project;
};

const getNextWorkingDay = (projectStartDateMoment, weekendDays, holidays) => {
  console.log(`Before calculating next working day`, projectStartDateMoment, weekendDays, holidays);
  while (
    weekendDays.includes(projectStartDateMoment.day()) ||
    holidays.some((holiday) =>
      projectStartDateMoment.isBetween(holiday.startDate, holiday.endDate, 'days', '[]')
    )
  ) {
    projectStartDateMoment = projectStartDateMoment.add(1, 'd');
  }
  console.log(`After calculating next working day`, projectStartDateMoment, weekendDays, holidays);
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
