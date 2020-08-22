import React, { useState } from "react";
import UpdateIcon from '@material-ui/icons/Update';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import {useSelector} from 'react-redux';

function EditArea(props) {
  const updatingtodo = useSelector(state => state.updatingtodo);
  const [task, setTask] = useState(updatingtodo);

  function handleChange(event) {
    const { name, value } = event.target;

    setTask(prevTodo => {
      return {
        ...prevTodo,
        [name]: value
      };
    });
  }
  function updateTask(event) {
    props.onUpdate(task.id,task);
    setTask({
      title: "",
    });
    event.preventDefault();

  }
  return (
    <div>
      <form className="create-todo">
          <input
            name="title"
            onChange={handleChange}
            value={task.title}
            placeholder="Add new Task"
          />
        <Zoom in={true}>
          <Fab onClick={updateTask}>
            <UpdateIcon  />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}
export default EditArea;
