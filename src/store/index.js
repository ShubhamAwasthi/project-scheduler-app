import { createContext } from 'react';
import { PROJECT_ADD } from '../constants';

export const ProjectContext = createContext(null);
export const DispatchContext = createContext(null);

export const appReducer = (state, action) => {
  switch (action.type) {
    case PROJECT_ADD:
      return { ...state, name: action.name };
    default:
      throw new Error('unknown action');
  }
};

export const initialState = null;
