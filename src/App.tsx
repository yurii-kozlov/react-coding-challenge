import { useState } from "react";
import tasksStore from "stores/TasksStore";
import { observer } from "mobx-react-lite";
import AddEditTaskForm from "./components/AddEditTaskForm";
import Button from "./components/Button";
import DeleteModal from "./components/DeleteModal";
import { TaskCardsList } from "components/TaskCardsList";
import "./App.scss";
import { ReactComponent as Add } from "./assets/icons/add.svg";

const App = observer(() => {
  const [isDeleteTaskPopupVisible ] = useState<boolean>(false);
  const { isAddEditTaskPopupVisible } = tasksStore;

  const handleAddTaskButtonClick = () => {
    tasksStore.setIsEditTaskModalVisible(true);
    tasksStore.clearTaskToEdit();
  };

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button title="Add Task" icon={<Add />} onClick={handleAddTaskButtonClick} />
        </div>
        <div className="task-container">
          <TaskCardsList />
        </div>
      </div>
      {isAddEditTaskPopupVisible && <AddEditTaskForm />}
      {isDeleteTaskPopupVisible && <DeleteModal />}
    </div>
  );
});

export default App;
