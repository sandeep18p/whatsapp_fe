import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import SocketContext from "./context/SocketContext";
import { useSelector } from "react-redux";

function App() {
  const  {user}= useSelector((state)=>({state.user}));
  const { token } = user;
  return (
 
    <div className="dark">
  <SocketContext.Provider value={socket}>
    <Router>
   <Routes>
  <Route exact path="/" element={ token ? <Home socket = {socket}/> : <Navigate to="/login" /> }></Route>
  <Route exact path="/login" element={!token ? <Login/> : <Navigate to="/" />}></Route>
  <Route exact path="/register" element={!token ? <Register/> : <Navigate to="/" />}></Route>
    </Routes>
    </Router>
    </SocketContext.Provider>
    </div>
  );
}

export default App;
