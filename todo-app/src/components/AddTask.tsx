import React, { useState } from 'react';

interface AddTaskInterface {
    title : string;
    description ?: string;
}

interface AddTaskProps {
  onAddTask: (newTask: AddTaskInterface) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() !== '') {
      const newTask: AddTaskInterface = {
        title,
        description,
      };
      onAddTask(newTask);
      setTitle('');
      setDescription('');
    }
  };

  return (
<div className="container mt-4 border border-secondary rounded p-4">
      <h2 className="mb-4">Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;