import React from "react";
import {NavLink} from "react-router-dom";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import OfflinePinIcon from '@material-ui/icons/OfflinePin';
import ListIcon from '@material-ui/icons/List';
import {logout} from '../actions';

function Header() {
  const dispatch = useDispatch();
  const islogged = useSelector(state=>state.islogged.islogged);
  const history = useHistory();
  function logouts(event){
  axios.get("http://localhost:9000/logout")
       .then((res)=>{
         if(res.data){
           history.push('/');
          dispatch(logout());
         }
       })
       .catch((err)=>{
         console.log(err);
       });
  }
  return (
    <header>
      <h1>
        <span>
        <OfflinePinIcon style={{ fontSize:50 ,paddingTop:20 }}  />
        </span>
        To-Dooo

      </h1>
      <span className="headerLink" style={{margin:10}}><NavLink  exact activeClassName="underline" to={"/"}><HomeIcon fontSize='large'/></NavLink></span>

      {islogged ?  <span>
                <span className="headerLink" style={{margin:10}}><NavLink  exact activeClassName="underline" to="/todo" ><ListIcon fontSize='large'/></NavLink></span>
                <span className="headerLink" style={{margin:10}}><ExitToAppIcon fontSize='large' onClick={event=>logouts(event)} /></span>
                </span>:''}

    </header>
  );
}

export default Header;
