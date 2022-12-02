import * as Lockr from 'lockr';
import { PROJECTS_KEY } from '../constants';

export const setProjects = ({ projects, dispatch }) => {
  Lockr.set(PROJECTS_KEY, projects);
};

export const getProjects = () => {
  return Lockr.get(PROJECTS_KEY, []);
};
