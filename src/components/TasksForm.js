import { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TaskItem from './TaskItem';
import { Skill, Task } from '../models';
import { SKILL_HIGH, SKILL_MEDIUM, SKILL_LOW } from '../constants';
import moment from 'moment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TasksForm = ({ tasks, setTasks, dispatch, editingId, setEditingId }) => {
  const saveTaskHandler = (id, name, days, skills) => {
    console.log('save handler', tasks, name, skills, days, id);
    let taskToSave = tasks.find((x) => x.id === id);
    if (taskToSave) {
      console.log('found existing task');
      taskToSave.name = name;
      taskToSave.skills = skills;
      taskToSave.days = days;
    } else {
      console.log('not found existing task');
      taskToSave = new Task(id || moment().valueOf(), name, skills, days, []);
      console.log(taskToSave, 'saved this');
    }
    setTasks([...tasks.filter((x) => x.id !== id), taskToSave]);
    setEditingId(null);
    setSkills(getDefaultSkills());
    setName('');
    setDays(0);
  };

  const editTaskHandler = (id, name, skills, days) => {
    const taskToEdit = tasks.find((x) => x.id === id);
    setSkills(taskToEdit.skills);
    setName(taskToEdit.name);
    setDays(taskToEdit.days);
    setEditingId(id);
  };

  const deleteTaskHandler = (id) => {
    setTasks([...tasks.filter((x) => x.id !== id)]);
  };

  const getDefaultSkills = () => {
    return [new Skill(SKILL_HIGH, 0), new Skill(SKILL_MEDIUM, 0), new Skill(SKILL_LOW, 0)];
  };
  const [skills, setSkills] = useState(getDefaultSkills());
  const [name, setName] = useState('');
  const [days, setDays] = useState(0);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    // Create a copy of the sorted tasks array
    const sortedTasks = [...tasks].sort((a, b) => a.id - b.id);

    // Remove the task from its original position
    const [movedTask] = sortedTasks.splice(sourceIndex, 1);

    // Insert it at the new position
    sortedTasks.splice(destinationIndex, 0, movedTask);

    // Reassign IDs to preserve the new order
    // We'll assign sequential IDs to maintain the order
    const base = 1000000; // Large enough to avoid conflicts
    const updatedTasks = sortedTasks.map((task, index) => {
      // Create a new task object with an updated ID
      return {
        ...task,
        id: base + index
      };
    });

    setTasks(updatedTasks);
  };

  // Add a style for the dragging item
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: isDragging ? 4 : 0,
    margin: `0 0 ${isDragging ? 0 : 8}px 0`,

    // change background colour if dragging
    background: isDragging ? 'rgba(63, 81, 181, 0.1)' : 'transparent',
    borderRadius: 4,
    boxShadow: isDragging ? '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)' : 'none',

    // styles we need to apply on draggables
    ...draggableStyle
  });

  // Add a style for the droppable container
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'rgba(63, 81, 181, 0.05)' : 'transparent',
    padding: isDraggingOver ? 8 : 0,
    borderRadius: 4,
    transition: 'background-color 0.2s ease, padding 0.2s ease'
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {`Tasks`}
      </Typography>
      <Box sx={{ height: '50%', display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="tasks">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}>
                    {tasks
                      .sort((a, b) => a.id - b.id)
                      .map((task, index) => (
                        <Draggable
                          key={task.id.toString()}
                          draggableId={task.id.toString()}
                          index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}>
                              <TaskItem
                                key={task.id}
                                disabled={task.id !== editingId}
                                editTaskHandler={editTaskHandler}
                                saveTaskHandler={saveTaskHandler}
                                deleteTaskHandler={deleteTaskHandler}
                                id={task.id}
                                taskName={task.id !== editingId ? task.name : name}
                                taskDays={task.id !== editingId ? task.days : days}
                                taskSkills={task.id !== editingId ? task.skills : skills}
                                setTaskName={setName}
                                setTaskDays={setDays}
                                setTaskSkills={setSkills}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Grid>
          {editingId === null && (
            <Grid item xs={12}>
              <TaskItem
                key={'add-new'}
                disabled={editingId !== null}
                editTaskHandler={editTaskHandler}
                saveTaskHandler={saveTaskHandler}
                deleteTaskHandler={deleteTaskHandler}
                id={null}
                taskName={name}
                taskDays={days}
                taskSkills={skills}
                setTaskName={setName}
                setTaskDays={setDays}
                setTaskSkills={setSkills}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

TasksForm.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.instanceOf(Task)),
  setTasks: PropTypes.func,
  dispatch: PropTypes.func,
  editingId: PropTypes.number,
  setEditingId: PropTypes.func
};

export default TasksForm;
