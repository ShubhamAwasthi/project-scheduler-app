import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import ProjectWizard from './components/ProjectWizard';
import Container from '@mui/material/Container';
import { useReducer } from 'react';
import { appReducer, DispatchContext, initialState, ProjectContext } from './store';
import { PATH_PROFILE, PATH_PROJECT_WIZARD } from './constants';
const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <ProjectContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Container maxWidth="lg">
          <BrowserRouter>
            <Routes>
              <Route path={PATH_PROFILE} element={<Profile />} />
              <Route path={PATH_PROJECT_WIZARD} element={<ProjectWizard />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </DispatchContext.Provider>
    </ProjectContext.Provider>
  );
};

export default App;
