import React ,{useState,useEffect}from 'react'
import {Link,useHistory}from 'react-router-dom'
import axios from "axios";


const RegisterPage = () => {
  const history=useHistory()
  const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')

  const registerUser = () => {
   

    axios.post('/signup',
    { name,
      email,
      password
     }
        
     )
 .then(data =>
    {console.log(data)
  history.push('/login')}
  )
  };

  return (
    <div className="card">
      <div className="cardHeader">Registration</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            
           
            placeholder="John Doe"
            value={name}
            onChange={(e)=>setName(e.target.value)} 
            
          />
        </div>
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
          
          
          placeholder="Your Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)} 
            
        />
      </div>
      <button onClick={()=>registerUser()}>Register</button>
    </div>
  );
};

export default RegisterPage;