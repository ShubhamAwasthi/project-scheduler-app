/* eslint-disable no-case-declarations */
import { createContext } from 'react';
import { getProjects, setProjects } from '../api';
import {
  PROJECT_ADD,
  PROJECT_REMOVE,
  PROJECT_UPDATE,
  TASK_ADD,
  TASK_UPDATE,
  TASK_REMOVE
} from '../constants';

export const ProjectContext = createContext(null);
export const DispatchContext = createContext(null);

export const appReducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case PROJECT_ADD:
      newState = [...state, action.project];
      break;
    case PROJECT_REMOVE:
      newState = state.filter((project) => project.name !== action.name);
      break;
    case PROJECT_UPDATE:
      newState = [...state.filter((project) => project.name !== action.name), action.project];
      break;
    case TASK_ADD:
      state.filter((project) => project.name == action.name)[0].tasks.push(action.task);
      newState = [...state];
      break;
    case TASK_UPDATE:
      const projectWithTaskToUpdate = state.filter((project) => project.name == action.name)[0];
      projectWithTaskToUpdate.tasks = [
        ...projectWithTaskToUpdate.tasks.filter((task) => task.name !== action.task.name),
        action.task
      ];
      newState = [...state];
      break;
    case TASK_REMOVE:
      const projectWithTaskToRemove = state.filter((project) => project.name == action.name)[0];
      projectWithTaskToRemove.tasks = [
        ...projectWithTaskToRemove.tasks.filter((task) => task.name !== action.task.name)
      ];
      newState = [...state];
      break;
    default:
      throw new Error('unknown action');
  }
  console.log(newState);
  setProjects(newState);
  return newState;
};

export const initialState = getProjects() || [];
