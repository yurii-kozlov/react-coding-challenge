import { FC } from "react"
import classNames from "classnames"
import { observer } from "mobx-react-lite"
import tasksStore from "stores/TasksStore"
import { Task } from "types/Task"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"

type TaskCardProps = {
  task: Task;
}

const TaskCard: FC<TaskCardProps> = observer(({ task }) => {
  const { id, title, priority, status, progress } = task;

  const handleEditTaskButtonClick = () => {
    tasksStore.setIsEditTaskModalVisible(true);
    tasksStore.setTaskToEdit(task);
  };

  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
      </div>
      <div className="task-status-wrapper">
        <button className="status" onClick={() => tasksStore.toggleTaskStatusWithProgress(id)}>
          {status}
        </button>
      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progress} />
      </div>
      <div className="actions">
        <EditIcon onClick={handleEditTaskButtonClick} className="mr-20 cp" />
        <DeleteIcon className="cp" />
      </div>
    </div>
  )
})

export default TaskCard
