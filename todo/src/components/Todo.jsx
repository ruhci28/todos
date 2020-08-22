import React,{ useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import UpdateIcon from '@material-ui/icons/Update';
import {useDispatch} from 'react-redux';
import {todotoupdate,turnoneditmode} from '../actions';

function Todo(props) {
  const dispatch = useDispatch();
  const [checked , setChecked]=useState(false);
  const category = props.category;
  function handleClick() {
    props.onDelete(props.id,props.deleteIds);
  }
  function handleUpdateClick() {
    dispatch(turnoneditmode(true));
    dispatch(todotoupdate({title:props.title,date:'',id:props.updateIds}));
  }
function checkboxClick(){
  setChecked(true);
}
  return (
    <div className="todo">
    <span>
    {checked ? < CheckCircleRoundedIcon onClick={checkboxClick} style={{color:'black'}}/> :   <RadioButtonUncheckedRoundedIcon onClick={checkboxClick} style={{color:'black'}} />}
    </span>

      <h1 style={checked ? { textDecorationLine: 'line-through' }:{}}> {props.title}</h1>
      <p style={{color:'#000'}}>{(category === '1')? '(Urgent and important)':(category === '2')? '(Time sensitive but less important)':(category==='3')?'(Important but not time sensitive)':'(Not important and not urgent)'}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button onClick={handleUpdateClick}>
        <UpdateIcon />
      </button>

    </div>
  );
}

export default Todo;
