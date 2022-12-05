import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import ProjectDetailForm from './ProjectDetailForm';
import TasksForm from './TasksForm';

const steps = ['Project Details', 'Tasks', 'Team members', 'Holidays'];

const ProjectWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const navigate = useNavigate();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const isFinishStep = () => {
    return completedSteps() === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    navigate(-1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" square={false}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`New Project > ${steps[activeStep]}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Stepper nonLinear activeStep={activeStep} sx={{ p: 2, pt: 3, pb: 5 }}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
                  Save
                </Button>
                <Button variant="contained" color="inherit" onClick={handleReset} sx={{ mr: 1 }}>
                  Reset
                </Button>
              </Box>
            ) : (
              <>
                {activeStep === 0 && <ProjectDetailForm />}
                {activeStep === 1 && <TasksForm />}
                <Box sx={{ pb: 5 }} />
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    variant="contained"
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <>
                        <Button
                          variant="contained"
                          color="inherit"
                          onClick={handleReset}
                          sx={{ mr: 1 }}>
                          Reset
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="contained" onClick={handleComplete} sx={{ mr: 1 }}>
                          {isFinishStep() ? 'Finish' : 'Complete Step'}
                        </Button>
                        <Button
                          color="inherit"
                          variant="contained"
                          onClick={handleCancel}
                          sx={{ mr: 1 }}>
                          {'Cancel'}
                        </Button>
                      </>
                    ))}
                </Box>
              </>
            )}
          </div>
        </Paper>
      </Grid>
    </Box>
  );
};

export default ProjectWizard;
