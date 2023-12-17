import axios from 'axios';

export const tasksApiInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_TASKS_URL
});
