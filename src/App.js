import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Container from '@mui/material/Container';
import { useReducer } from 'react';
import { appReducer, DispatchContext, initialState, ProjectContext } from './store';

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <ProjectContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Container maxWidth="lg">
          <BrowserRouter>
            <Routes>
              <Route path="/project-scheduler-app/" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </DispatchContext.Provider>
    </ProjectContext.Provider>
  );
};

export default App;
