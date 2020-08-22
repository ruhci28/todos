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
    const path = "http://localhost:9000"+location.pathname;
    axios.get(path)
    .then(response => {
    const iddata = response.data;
    const len = iddata.length;
    for(let i =0 ; i < len ; i++){
      const id = iddata[i];
      const path1 = path+"/"+id;
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
  function addTask(newTask) {
    // console.log(newTask);
     axios.post("http://localhost:9000/tasks",newTask)
          .then(function (response) {
             newTask.Id = response.data;
             console.log(response.data);
             const path = "http://localhost:9000"+location.pathname;
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
  function deleteTask(id,deleteIds) {
  const path = "http://localhost:9000"+location.pathname+"/"+deleteIds;
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
  function updateTask(updateIds,updatedtask) {
    const path = "http://localhost:9000/tasks/"+updateIds;
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
