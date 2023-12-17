import { ChangeEvent, useState } from "react"
import { observer } from "mobx-react-lite"
import tasksStore from "stores/TasksStore"
import classNames from "classnames"
import { Priority } from "types/enums/Priority"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"

const AddEditTaskForm = observer(() => {
  const { taskToEdit } = tasksStore;
  const { title, priority } = taskToEdit || {};

  const [newTaskTitle, setNewTaskTitle] = useState<string>(title || '');
  const [isInputError, setIsInputErorr] = useState<boolean>(false);
  const [selectedPriority, setSelectedPriority] = useState<Priority>(priority || Priority.Low);

  const handleAddTaskInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setIsInputErorr(false);
    setNewTaskTitle(inputValue);

    if (inputValue.trim() === '') {
      setIsInputErorr(true);
    }
  }

  const handleAddEditTaskButtonClick = () => {
    if (taskToEdit) {
      tasksStore.updateTask(newTaskTitle, selectedPriority);
    } else {
      tasksStore.addNewTask(newTaskTitle, selectedPriority);
    }

    tasksStore.setIsEditTaskModalVisible(false);
  };

  return (
    <Modal>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">{taskToEdit ? 'Edit' : 'Add'} Task </span>
            <Close className="cp" onClick={() => tasksStore.setIsEditTaskModalVisible(false)} />
          </div>
          <Input 
            label="Task" 
            placeholder="Type your task here..." 
            onChange={handleAddTaskInputChange} 
            name="title" 
            value={newTaskTitle}
          />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {Object.values(Priority).map((priority) => (
                <li 
                  key={priority} 
                  className={classNames(priority, { [`${priority}-selected`]: priority === selectedPriority})}
                  onClick={() => setSelectedPriority(priority)}
                >
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button 
              title="Add" 
              onClick={handleAddEditTaskButtonClick} 
              disabled={isInputError || newTaskTitle.length === 0}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
})

export default AddEditTaskForm
