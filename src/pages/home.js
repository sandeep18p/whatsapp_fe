import React, { useEffect, useState } from 'react'
import { Sidebar } from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { getConversations, updateMessagesAndConversations } from '../feature/chatSlice';
import  { ChatContainer, WhatsappHome } from '../components/Chat';
import SocketContext from '../context/SocketContext';
import Call from '../components/Chat/call/Call';

const callData = {
  receiveingCall: true,
  // receiveingCall: false,
  callEnded: false,
}

 function Home({socket}){
  const [onlineUsers, setOnlineUsers] = useState([]);
  // console.log(socket);
  const dispatch = useDispatch();
  const [call,setCall]=useState(callData);
  const {receiveingCall, callEnded}=call;
  const [callAccepted, setCallAccepted]=useState(false); 

  const { user } = useSelector((state) => state.user);
  const {activeConversation} = useSelector((state)=>state.chat);
  //typing
  const [typing,setTyping]=useState(false);
  console.log(" active conversation ",activeConversation)

  // //join user into the socket io
  // useEffect(()=>{
  //   socket.emit("join", user._id);
  //   //get online users
  //   socket.on("get-online-users",(users)=>{
  //     console.log("online users", users);
  //     setOnlineUsers(users);
  //     console.log("online users 2", onlineUsers);
  //   });
  // },[user]);
  // join user into the socket io
  useEffect(() => {
    socket.emit("join", user._id);
    //get online users
    socket.on("get-online-users", (users) => {
      console.log("online users", users);
      setOnlineUsers(users);
    });
  }, [user, socket]);
  
  //get Conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  //listening to received messages
  useEffect(()=>{
    //listening to receiving messages
    socket.on("receive message",(message)=>{
      
        dispatch(updateMessagesAndConversations(message))    
      // console.log("message ---->", message);
    });
      //listening when user is typing
      // socket.on("typing",()=>setTyping(true));
      socket.on("typing",(conversation)=>setTyping(conversation));
      socket.on("stop typing", ()=>setTyping(false));
  },[])
  return ( <>
    <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center  oveerflow-hidden'>
    <div className="container h-screen flex py-[19px]">
     {/* <Sidebar/> */}
    <Sidebar onlineUsers = {onlineUsers} typing={typing}/>
      {activeConversation._id ? (
           <ChatContainer onlineUsers = {onlineUsers} typing={typing}/>
          ) : (
            <WhatsappHome />
          )}
    </div>
  
    </div>
    <Call call={call} setCall={setCall} callAccepted={callAccepted}/>
   </>
  )}
//Attaching socket to this
const HomeWithSocket = (props) =>(
  <SocketContext.Consumer>
    {(socket)=><Home {...props} socket={socket}/>}
  </SocketContext.Consumer>
)

export default HomeWithSocket;