/* eslint-disable no-case-declarations */
import { createContext } from 'react';
import { getProjects, setProjects } from '../api';
import { PROJECT_ADD, PROJECT_REMOVE, PROJECT_UPDATE } from '../constants';

export const ProjectContext = createContext(null);
export const DispatchContext = createContext(null);

export const appReducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case PROJECT_ADD:
      newState = [...state, action.project];
      break;
    case PROJECT_REMOVE:
      newState = state.filter((project) => project.id != action.id);
      break;
    case PROJECT_UPDATE:
      newState = [...state.filter((project) => project.id != action.id), action.project];
      break;
    default:
      throw new Error('unknown action');
  }
  console.log(newState);
  setProjects(newState);
  return newState;
};

export const initialState = getProjects() || [];
