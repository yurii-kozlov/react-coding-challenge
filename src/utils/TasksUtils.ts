import { Task } from 'types/Task';
import { TaskStatus } from 'types/enums/TaskStatus';
import { Progress } from 'types/enums/Progress';
import { Priority } from 'types/enums/Priority';

export default class TasksUtils {
  static generateNewTask = (title: string, priority: Priority): Task => {
    return ({
      id: Math.random(),
      title,
      priority,
      status: TaskStatus.ToDo,
      progress: Progress.Zero
    })
  };

  static handleTaskStatusToggling = (taskStatus: TaskStatus) => {
    switch(taskStatus) {
      case TaskStatus.ToDo:
        return { status: TaskStatus.InProgress, progress: Progress.Fifty }
      case TaskStatus.InProgress:
        return { status: TaskStatus.Done, progress: Progress.OneHundred }
      case TaskStatus.Done:
        return { status: TaskStatus.ToDo, progress: Progress.Zero }
      default:
        return { status: TaskStatus.InProgress, progress: Progress.Fifty }
    }
  };
};
