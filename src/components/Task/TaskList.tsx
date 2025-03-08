
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import TaskItem from './TaskItem';
import { setTasks } from '../../store/slices/taskSlice';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import { Task } from '../../store/slices/taskSlice';

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = loadFromLocalStorage<Task[]>('tasks', []);
    dispatch(setTasks(savedTasks));
  }, [dispatch]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    saveToLocalStorage('tasks', tasks);
  }, [tasks]);

  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks yet. Add one above!</p>;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
