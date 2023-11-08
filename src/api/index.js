import * as Lockr from 'lockr';
import { PROJECTS_KEY } from '../constants';

export const setProjects = (projects) => {
  console.log('before saving to browser', projects);
  Lockr.set(PROJECTS_KEY, projects);
  console.log('after saving  to browser', getProjects());
};

export const getProjects = () => {
  return Lockr.get(PROJECTS_KEY, []);
};

export const assignTasks = (project) => {
  console.log(`before assigning tasks ${project}`);
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
  console.log(`after assigning tasks ${project}`);
  return project;
};
