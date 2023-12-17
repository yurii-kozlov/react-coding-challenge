import { AxiosError, AxiosResponse } from 'axios';
import { tasksApiInstance } from 'api/api';
import { TasksApiResponse } from 'types/ApiResponses';
import { Task } from 'types/Task';
import { errorTexts } from 'constants/errorTexts';

const { defaultTasksApiError } = errorTexts;

export default class TasksService {
  static async fetchTasksList(): Promise<TasksApiResponse> {
    try {
      const response: AxiosResponse<Task[]> = await tasksApiInstance.get('/taskList');

      return { result: response.data, error: null };
    } catch (error) {
      return { result: null, error: this.handleApiError(error) };
    }
  };

  static handleApiError(error: unknown): string {
    return (error instanceof AxiosError || error instanceof Error) 
      ? error.message || defaultTasksApiError 
      : defaultTasksApiError;
    }
}