import { createContext } from 'react';
import { getProjects } from '../api';
import { PROJECT_ADD, PROJECT_REMOVE, PROJECT_UPDATE } from '../constants';

export const ProjectContext = createContext(null);
export const DispatchContext = createContext(null);

export const appReducer = (state, action) => {
  switch (action.type) {
    case PROJECT_ADD:
      return [...state, action.project];
    case PROJECT_REMOVE:
      return state.filter((project) => project.name !== action.name);
    case PROJECT_UPDATE:
      return [...state.filter((project) => project.name !== action.name), action.project];
    default:
      throw new Error('unknown action');
  }
};

export const initialState = getProjects();
