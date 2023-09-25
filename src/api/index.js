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
