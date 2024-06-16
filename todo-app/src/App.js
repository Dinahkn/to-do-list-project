import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiConstants } from './api/ApiConstants.ts';
import TaskList from './components/TaskList.tsx';
import AddTask from './components/AddTask.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000' + ApiConstants.TODO.FIND_ALL_TASKS(1)); // Assuming userId is 1
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await axios.post('http://localhost:3000' + ApiConstants.TODO.ADD(1), newTask); // Assuming userId is 1
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete('http://localhost:3000' + ApiConstants.TODO.DELETE(taskId));
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleDone = async (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, isDone: !task.isDone } : task
    );

    try {
      await axios.patch('http://localhost:3000' + ApiConstants.TODO.MARK_COMPLETE(taskId), { isDone: updatedTasks.find(task => task.id === taskId)?.isDone });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="App">
      <div className="container text-center">
        <h1 className="mt-4 mb-4">Task Manager</h1>
      </div>
      <AddTask onAddTask={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onToggleDone={toggleDone} />
    </div>
  );
};

export default App;
