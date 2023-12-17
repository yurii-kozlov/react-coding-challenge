import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import tasksStore from "stores/TasksStore";
import TaskCard from "components/TaskCard";
import styles from 'components/TaskCardsList/TasksCardsList.module.scss';

export const TaskCardsList = observer(() => {
  const { isLoading, error, tasks } = tasksStore;

  useEffect(() => {
    tasksStore.fetchTasksList();
  }, []);

  return (
    <div>
      {error && <p className={styles.errorText}>{error}</p>}
      {isLoading && <p className={styles.loader}>Loading...</p>}
      {tasks.map((task) => (
        <TaskCard
          task={task}
          key={task.id}
        />
      ))}
    </div>
  );
});
