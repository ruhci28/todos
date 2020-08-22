import React, { useState } from "react";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

// ui for the form for creating new task
function CreateArea(props) {
  const [task, setTask] = useState({
    title: "",
    category:1
  });
  function handleChange(event) {
    const { name, value } = event.target;

    setTask(prevTodo => {
      return {
        ...prevTodo,
        [name]: value
      };
    });
  }
  function submitTask(event) {
    props.onAdd(task);
    console.log(task);
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
          style={{width:"90%"}}
            autoFocus
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
          <Fab onClick={submitTask}>
            <NoteAddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}
export default CreateArea;
