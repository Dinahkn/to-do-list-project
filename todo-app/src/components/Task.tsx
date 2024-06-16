import React from "react";

interface Task {
    id:number;
    title : string;
    description ?: string;
    isDone : boolean;
}

interface TaskProps {
    task: Task;
    onDelete: (taskId: number) => void;
    onToggleDone: (taskId: number) => void;
  }

const Task: React.FC<TaskProps> = ({task,onDelete,onToggleDone}) => {
    const handleDelete = () => {
        onDelete(task.id);
    };

    const handleDone = () => {
        onToggleDone(task.id);
    };

    return (
        <div className={`task ${task.isDone ? 'done' : ''}`}>
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <button className = "btn btn-danger" onClick={handleDelete}>Delete</button>
          {!task.isDone && (
            <button className="btn btn-success" onClick={handleDone}>
                Done
            </button>
        )}
        </div>
      );
};
    
export default Task;

