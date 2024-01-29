import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { io } from "socket.io-client";
import Home from "./pages/home";
import Login from "./pages/login";
import { logout } from "./feature/userSlice";
import Register from "./pages/register";

import { useSelector } from "react-redux";
import SocketContext from "./context/SocketContext";


  

function App() {
  const socket = io(process.env.REACT_APP_API_ENDPOINT.split("/api/v1")[0]);
  const  {user}= useSelector((state)=>state.user);
   const {token } = user;
 
 //socket io 
 

   return (
 
    <div className="dark">
   <SocketContext.Provider value={socket}>
    <Router>
   <Routes>
  <Route exact path="/" element={<Home/>}></Route>
  {/* <Route exact path="/" element={token ? <Home/> : <Navigate to="/login" />} ></Route> */}
  <Route exact path="/login" element={!token ? <Login/> : <Navigate to="/" />} ></Route>
  <Route exact path="/register"element={!token ? <Register/> : <Navigate to="/login" />}
  />
    </Routes>
    </Router>
    </SocketContext.Provider>
    </div>
  );
}

export default App;
