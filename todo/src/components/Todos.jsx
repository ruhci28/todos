import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Todo from "./Todo";
import CreateArea from "./CreateArea";
import EditArea from './editarea';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import {turnoffeditmode} from '../actions';

function Todos() {
  const dispatch = useDispatch()
  let location = useLocation();
  const editmode = useSelector(state => state.editmode.mode);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const path = location.pathname;
    console.log(path);
    // fetch the users task list
    axios.get(path)
    .then(response => {
    const iddata = response.data;
    const len = iddata.length;
    for(let i =0 ; i < len ; i++){
      const id = iddata[i];
      const path1 = path+"/"+id;
        console.log(path1);
        // fetch the actual todo item with the help of the user task list
      axios.get(path1)
           .then(res => {
             const data = res.data;
             data.forEach(function(task) {
               const title = {
                 Id : task._id,
                 title: task.title
               };
               setTasks(prevTasks => {
                 return [...prevTasks, title];
               });
           });
    }).catch(err=>{console.log(err)});
  }
  })
  .catch(err=>{console.log(err)});
  // eslint-disable-next-line
},[]);
// function to add task to frontend and the database.
  function addTask(newTask) {
    // console.log(newTask);
     axios.post("/tasks",newTask)
          .then(function (response) {
             newTask.Id = response.data;
             console.log(response.data);
             const path = location.pathname;
             axios.post(path,{task:newTask.Id})
                  .then((res) => {
                  });
             setTasks(prevTasks => {
             return [...prevTasks, newTask];
           });
         })
         .catch(function (error){
             console.log(error)
         });
  }
  // function delete the task from the screen from the todo collections in database and from the users task list.
  function deleteTask(id,deleteIds) {
  const path = location.pathname+"/"+deleteIds;
      axios.delete(path)
     .then(res => {
       setTasks(prevNotes => {
         return prevNotes.filter((noteItem, index) => {
           return index !== id;
         });
       });
     })
     .catch(err => {
       console.log(err);
     });
  }
  // function updates the task in database and frontend also .
  function updateTask(updateIds,updatedtask) {
    const path = "/tasks/"+updateIds;
    axios.patch(path,updatedtask)
    .then(res => {
      console.log(res.data);
      dispatch(turnoffeditmode(false));
      const value = tasks;
      const updatedarray = value.map(task => {
        if (task.Id === updateIds){
          return updatedtask;
        }
        else return task;
      });
      setTasks(updatedarray);
    })
    .catch(err => {
      console.log(err);
    })
  }
  return (
    <div >
    <Header / >
    {
      // show edit area or create area according to edit mode state. If mode is on EditArea will be shown and if editemode is Off
      // create Area will be shown
     }
    {editmode ? <EditArea onUpdate={updateTask}/>:<CreateArea onAdd = {addTask}/>}
    {
      tasks.map((noteItem, index) => {
        return (
           <Todo key={index} id={index} deleteIds={noteItem.Id} updateIds={noteItem.Id} title={noteItem.title} onAdd={addTask} onDelete={deleteTask} onUpdate={updateTask} category={noteItem.category}/>
        );
      })
    }
    <Footer / >
    </div>
  );
}
export default Todos;
