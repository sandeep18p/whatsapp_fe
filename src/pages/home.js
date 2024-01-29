import React, { useEffect } from 'react'
import { Sidebar } from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { getConversations, updateMessages, updateMessagesAndConversations } from '../feature/chatSlice';
import  { ChatContainer, WhatsappHome } from '../components/Chat';
import SocketContext from '../context/SocketContext';

 function Home({socket}){
  console.log(socket);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const {activeConversation} = useSelector((state)=>state.chat);
  console.log(" active conversation ",activeConversation)

  //join user into the socket io
  useEffect(()=>{
    socket.emit("join", user._id);
  },[user]);
  
  //get Conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  //listening to received messages
  useEffect(()=>{
    socket.on("receive message",(message)=>{
      
        dispatch(updateMessagesAndConversations(message))
      
    
      // console.log("message ---->", message);
    });
  },[])
  return (
    <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center  oveerflow-hidden'>
    <div className="container h-screen flex py-[19px]">
     {/* <Sidebar/> */}
    <Sidebar/>
      {activeConversation._id ? (
           <ChatContainer/>
          ) : (
            <WhatsappHome />
          )}
    </div>
  
    
    </div>
  )
}

//Attaching socket to this

const HomeWithSocket = (props) =>(
  <SocketContext.Consumer>
    {(socket)=><Home {...props} socket={socket}/>}
  </SocketContext.Consumer>
)

export default HomeWithSocket;