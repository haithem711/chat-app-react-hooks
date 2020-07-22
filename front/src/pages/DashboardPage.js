import React,{useState,useEffect} from "react";
import axios from 'axios'
import { Link ,withRouter} from "react-router-dom";
const DashboardPage = () => {
  const [chatrooms,setChatrooms]=useState([])
  useEffect(()=>{
    axios.get('/getall',{
        headers:{
            "Authorization":JSON.parse(localStorage.getItem("token"))}
    })
    .then(result=>{console.log(result)
      setChatrooms(result.data)
    

    })
 },[])
  return (
    <div className="card">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="text"
            name="chatroomName"
           
            placeholder="ChatterBox Nepal"
          />
        </div>
      </div>
      <button>Create Chatroom</button>
      <div className="chatrooms">
        {chatrooms.map(chatroom=>(
           <div key={chatroom._id} className="chatroom">
           <div>{chatroom.name}</div>
           <Link to ={"/chatroom/"+chatroom._id}>
           <div className="join">Join</div>
           </Link>
         </div>

        ))}
       
       
      </div>
    </div>
  );
};

export default withRouter(DashboardPage) ;