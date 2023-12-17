import { action, makeObservable, observable } from 'mobx';
import TasksService from 'service/TasksService';
import { Task } from 'types/Task';
import { Priority } from 'types/enums/Priority';
import TasksUtils from 'utils/TasksUtils';

class TasksStore {
  tasks: Task[] = [];
  isLoading: boolean = false;
  error: string = '';

  taskToEdit: Task | null = null;
  isAddEditTaskPopupVisible: boolean = false;

  constructor() {
    makeObservable(this, {
      tasks: observable,
      isLoading: observable,
      error: observable,
      taskToEdit: observable,
      isAddEditTaskPopupVisible: observable,
      setTasks: action,
      setTaskToEdit: action,
      setIsEditTaskModalVisible: action,
      clearTaskToEdit: action,
      setError: action,
      setIsLoading:action,
      updateTask: action,
      addNewTask: action
    }, 
    { deep: true });
  }

  setIsLoading(value: boolean): void {
    this.isLoading = value;
  };

  setError(error: string): void {
    this.error = error;
  };

  setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  };

  setTaskToEdit(task: Task): void {
    this.taskToEdit = task;
  };

  setIsEditTaskModalVisible(value: boolean): void {
    this.isAddEditTaskPopupVisible = value;
  };

  clearTaskToEdit(): void {
    this.taskToEdit = null;
  };

  async fetchTasksList(): Promise<void> {
    this.setIsLoading(true);
    const { result, error } = await TasksService.fetchTasksList();

    if (result) {
      this.setTasks(result);
    }

    this.setError(error || '');
    this.setIsLoading(false);
  };

  updateTask(newTaskTitle: string, newTaskPriority: Priority): void {
    const updatedTasksList = this.tasks.map((task) => {
      return task.id === this.taskToEdit?.id ? { ...task, title: newTaskTitle, priority: newTaskPriority } : task
    })

    this.setTasks(updatedTasksList)
  };

  addNewTask(taskTitle: string, taskPriority: Priority): void {
    const newTask = TasksUtils.generateNewTask(taskTitle, taskPriority);

    this.setTasks([newTask, ...this.tasks]);
  };

  toggleTaskStatusWithProgress(currentTaskId: number): void {
    const updatedTasksList = this.tasks.map((task) => {
      if (task.id === currentTaskId) {
        const { status, progress } = TasksUtils.handleTaskStatusToggling(task.status);

        const updatedTask = { ...task, status, progress };
        return updatedTask;
      }

      return task;
    });

    this.setTasks(updatedTasksList);
  };
}

const tasksStore = new TasksStore();
export default tasksStore;
