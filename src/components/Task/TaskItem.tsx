
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, toggleTaskCompletion, updateTaskPriority, Task, TaskPriority } from '../../store/slices/taskSlice';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Trash } from 'lucide-react';

interface TaskItemProps {
  task: Task;
}

const PriorityBadge = ({ priority }: { priority: TaskPriority }) => {
  const colors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTaskCompletion(task.id));
  };

  const handleDelete = () => {
    dispatch(removeTask(task.id));
  };

  const handlePriorityChange = (value: string) => {
    dispatch(updateTaskPriority({ id: task.id, priority: value as TaskPriority }));
  };

  return (
    <Card className="mb-2">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox checked={task.completed} onCheckedChange={handleToggle} />
          <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <PriorityBadge priority={task.priority} />
          <Select value={task.priority} onValueChange={handlePriorityChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
