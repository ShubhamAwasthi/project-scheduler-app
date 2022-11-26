import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Container from '@mui/material/Container';

const App = () => {
  return (
    <Container maxWidth="lg">
      <BrowserRouter>
        <Routes>
          <Route path="/project-scheduler-app/" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
