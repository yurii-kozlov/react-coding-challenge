import { Task } from 'types/Task';

export interface ApiResponse<T> {
  result: T | null;
  error: string | null;
}

export type TasksApiResponse = ApiResponse<Task[]>;
