import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux';
import Header from "./Header";
import Footer from "./Footer";
import axios from 'axios';
import {Link} from "react-router-dom";
import {login} from '../actions';

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  function handleChange(event) {
    const {name,value} = event.target;

    setUser(prevValue => {
      if (name === "username") {
        return {
          username: value,
          password: prevValue.password
        };
      } else if (name === "password") {
        return {
          username: prevValue.username,
          password: value
        };
      }
    });
  }

  function submitUser(event) {
    event.preventDefault();
    if(user.username !== '' && user.password !== ''){
      axios.post("/SignUp", user)
        .then(function(response) {
            if(response.status === 200){
              if(response.data !== "OOPS Registration Failed . Try Again Later !!!"){
                history.push("/user/"+response.data);
                dispatch(login());
              }
            }
        })
        .catch(function(err) {
          console.log(err);
        });
    }else {
      console.log('please fill the requied details');
    }

  }
  return ( < div >
    <Header / >
    <div className = "container" style={{paddingTop:'5%'}}>
    <h1 style={{marginBottom:'1%'}}> Sign me up!!  </h1>
    <form >
    <input onChange = {handleChange} value = {user.username} name = "username" placeholder = "Username" />
    < input type='password' onChange = {handleChange} value = {user.password} name = "password" placeholder = "Password" />
    <div className = "submit-button container" >
    <button onClick = {submitUser} > SignUp < /button>
    <p style={{marginTop:'1%'}}>Already have an accout <Link to="/signin" >Signin</Link></p>
     </div>
     </form>
     </div>
     <Footer / >
    </div>
  );
}

export default Home;
