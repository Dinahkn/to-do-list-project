import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiConstants } from '../api/ApiConstants.ts';
import TaskList from './TaskList.tsx'
import AddTask from './AddTask.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar.tsx';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem('userId');



  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      try {
        const response = await axios.get('http://localhost:3000' + ApiConstants.TODO.FIND_ALL_TASKS(userId)); // Assuming userId is 1
        if (response.data && response.data.length > 0) {
          setTasks(response.data);
        } else {
          console.log('No tasks found.');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
  
      
    };
    fetchTasks();
  }, [userId, tasks]);



  const addTask = async (newTask) => {
    try {
      const response = await axios.post('http://localhost:3000' + ApiConstants.TODO.ADD(userId), newTask); // Assuming userId is 1
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
    <div>
      <Navbar/>

      <div className="App">
        <div className="container text-center">
          <h1 className="mt-4 mb-4">Task Manager</h1>
        </div>
        <AddTask onAddTask={addTask} />
        <TaskList tasks={tasks} onDelete={deleteTask} onToggleDone={toggleDone} />
      </div>
    </div>

  );
};

  export default Home;