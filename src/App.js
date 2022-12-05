import { HashRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import ProjectWizard from './components/ProjectWizard';
import Container from '@mui/material/Container';
import { useReducer } from 'react';
import { appReducer, DispatchContext, initialState, ProjectContext } from './store';
import { PATH_PROFILE, PATH_PROJECT_WIZARD } from './constants';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ProjectContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <Container maxWidth="lg">
              <HashRouter>
                <Routes>
                  <Route path={PATH_PROFILE} element={<Profile />} />
                  <Route path={PATH_PROJECT_WIZARD} element={<ProjectWizard />} />
                </Routes>
              </HashRouter>
            </Container>
          </DispatchContext.Provider>
        </ProjectContext.Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
