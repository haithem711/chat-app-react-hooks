import React,{useState,useEffect} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage"
import IndexPage from "./pages/IndexPage"
import ChatroomPage from "./pages/ChatroomPage"
import io from "socket.io-client";
function App() {
  const[socket,setSocket]=useState(null)
  const setupsocket=()=>{
     const token=JSON.parse(localStorage.getItem("token"))
    if (token && !socket) {
      const newSocket = io("http://localhost:8000", {
        query: {
          token:JSON.parse(localStorage.getItem("token")) ,
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
       
      });

      newSocket.on("connect", () => {
      console.log("connecterrrrrrrrrrrrrrrrrr")
      });

      setSocket(newSocket);
    }
  };
  useEffect(() => {
   setupsocket()
  }, [])
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={IndexPage} exact />
        <Route path="/login" render={()=><LoginPage setupsocket={setupsocket}/>}  exact />
        <Route path="/register" component={RegisterPage} exact />
        <Route path="/dashboard"  render={()=><DashboardPage socket={socket}/>} exact />
        <Route path="/chatroom/:id" render={()=><ChatroomPage socket={socket}/>} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;