import React, { useState } from "react";
import UpdateIcon from '@material-ui/icons/Update';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
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
      category:'1'
    });
    event.preventDefault();

  }
  return (
    <div>
      <form className="create-todo">
          <TextField
           autoFocus
           style={{width:"90%"}}
            name="title"
            onChange={handleChange}
            value={task.title}
            placeholder="Add new Task"
          />
          <Select
          label="Category"
          name='category'
          style={{width:"90%"}}
            value={task.category}
            onChange={handleChange}
          >
            <MenuItem value='1' >Urgent and important</MenuItem>
            <MenuItem value='2'>Time sensitive but less important</MenuItem>
            <MenuItem value='3'>Important but not time sensitive</MenuItem>
            <MenuItem value='4'>Not important and not urgent</MenuItem>
          </Select>
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
