import React from 'react';
import Task from './Task.tsx'; // Assuming Task component is in a separate file

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: number) => void;
  onToggleDone: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggleDone }) => {

    // Sort tasks by isDone status (false first, true last)
  const sortedTasks = [...tasks].sort((a, b) => {
    // Tasks that are not done should come before tasks that are done
    if (a.isDone && !b.isDone) return 1; // b comes first (a is done, b is not done)
    if (!a.isDone && b.isDone) return -1; // a comes first (a is not done, b is done)
    return 0; // both are either done or not done, maintain order
  });

  return (
    <div className="container mt-4 mb-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map((task) => (
                  <tr key={task.id} className={task.isDone ? 'table-success' : ''}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                      <button className="btn btn-danger me-2" onClick={() => onDelete(task.id)}>
                        Delete
                      </button>
                      {!task.isDone ? (
                        <button className="btn btn-success" onClick={() => onToggleDone(task.id)}>
                          Done
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
