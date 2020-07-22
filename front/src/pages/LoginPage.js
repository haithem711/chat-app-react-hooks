import React ,{useState,useEffect}from 'react'
import {Link,useHistory,withRouter}from 'react-router-dom'

import axios from "axios";

const LoginPage = (props) => {
  const history=useHistory()
  const [email,setEmail]=useState('')
  const[password,setPassword]=useState('')

  const loginUser = () => {
   

    axios.post("/signin", {
        email,
        password,
      })
      .then((response) => {
      console.log(response)
        localStorage.setItem('user',JSON.stringify( response.data.user))
        localStorage.setItem('token',JSON.stringify( response.data.token))
        history.push("/dashboard");
        props.setupsocket()
      })
      
  };

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            
           
            placeholder="abc@example.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)} 
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
           
            value={password}
          onChange={(e)=>setPassword(e.target.value)} 
            placeholder="Your Password"
            
          />
        </div>
        <button onClick={()=>loginUser()}>Login</button>
      </div>
    </div>
  );
};

export default withRouter(LoginPage) ;