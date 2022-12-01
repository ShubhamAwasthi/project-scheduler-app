import * as Lockr from 'lockr';
import { PROJECT_ADD, PROJECT_KEY } from '../constants';

export const setProject = ({ name, dispatch }) => {
  Lockr.set(PROJECT_KEY, name);
  dispatch({
    type: PROJECT_ADD,
    name
  });
};

export const getProject = () => {
  return Lockr.get(PROJECT_KEY);
};
