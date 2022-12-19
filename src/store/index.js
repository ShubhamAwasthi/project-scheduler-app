/* eslint-disable no-case-declarations */
import { createContext } from 'react';
import { getProjects } from '../api';
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
  switch (action.type) {
    case PROJECT_ADD:
      return [...state, action.project];
    case PROJECT_REMOVE:
      return state.filter((project) => project.name !== action.name);
    case PROJECT_UPDATE:
      return [...state.filter((project) => project.name !== action.name), action.project];
    case TASK_ADD:
      state.filter((project) => project.name == action.name)[0].tasks.push(action.task);
      return [...state];
    case TASK_UPDATE:
      const projectWithTaskToUpdate = state.filter((project) => project.name == action.name)[0];
      projectWithTaskToUpdate.tasks = [
        ...projectWithTaskToUpdate.tasks.filter((task) => task.name !== action.task.name),
        action.task
      ];
      return [...state];
    case TASK_REMOVE:
      const projectWithTaskToRemove = state.filter((project) => project.name == action.name)[0];
      projectWithTaskToRemove.tasks = [
        ...projectWithTaskToRemove.tasks.filter((task) => task.name !== action.task.name)
      ];
      return [...state];
    default:
      throw new Error('unknown action');
  }
};

export const initialState = getProjects();
