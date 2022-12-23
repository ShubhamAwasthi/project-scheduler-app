import * as Lockr from 'lockr';
import { PROJECTS_KEY } from '../constants';

export const setProjects = (projects) => {
  console.log('before saving', projects);
  Lockr.set(PROJECTS_KEY, projects);
  console.log('after saving', getProjects());
};

export const getProjects = () => {
  return Lockr.get(PROJECTS_KEY, []);
};
