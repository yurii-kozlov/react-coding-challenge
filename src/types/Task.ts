import { TaskStatus } from "types/enums/TaskStatus";
import { Progress } from "types/enums/Progress";
import { Priority } from "types/enums/Priority";

export type Task = {
  id: number
  title: string
  priority: Priority
  status: TaskStatus
  progress: Progress
};
