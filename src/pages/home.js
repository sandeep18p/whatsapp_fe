import React, { useEffect, useRef, useState } from 'react'
import { Sidebar } from '../components/sidebar'
import Peer from "simple-peer"
import { useDispatch, useSelector } from 'react-redux';
import { getConversations, updateMessagesAndConversations } from '../feature/chatSlice';
import  { ChatContainer, WhatsappHome } from '../components/Chat';
import SocketContext from '../context/SocketContext';
import Call from '../components/Chat/call/Call';
import { getConversationId, getConversationName, getConversationPicture } from '../utils/chat';

const callData = {
  socketId: "",
  receiveingCall: false,
  // receiveingCall: false,
  callEnded: false,
  name:"",
  picture:"",
}

 function Home({socket}){
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [show, setShow] = useState(false);
  // console.log(socket);
  const dispatch = useDispatch();
  const [call,setCall]=useState(callData);
  const [stream, setStream] = useState();
  const {receiveingCall, callEnded, socketId}=call;
  const [callAccepted, setCallAccepted]=useState(false); 
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  //typing
  // console.log("finally ",activeConversation.users);
  const [typing,setTyping]=useState(false);
  // console.log(" yolo active conversation ",activeConversation)

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
  }, [user]);

  
  //call
  useEffect(()=>{
    setupMedia();
  //v 91 setting up socket ID 
  socket.on('setup socket',(id)=>{
    setCall({...call,socketId: id});
  });
  socket.on('call user',(data)=>{
    setCall({...call, socketId:data.from,name:data.name, picture:data.picture, signal:data.signal, receiveingCall:true,})
  })
  },[]);

  //*** 
  //-- call user function
  const callUser=()=>{
    enableMedia();
    //v 92 5:15
    setCall({
      ...call,
      name:getConversationName(user,activeConversation.users),
      picture: getConversationPicture(user,activeConversation.users),
    });
    const peer = new Peer({
      initiator: true, //ititiater is the one who start the call
      trickle:false,
      stream: stream, //sending stream to antother side 
    });
    peer.on("signal",(data)=>{
      console.log(" user $ ",user);
      console.log(" activeConversation.users $ ",activeConversation.users);
    
      socket.emit("call user",{
        userToCall: getConversationId(user, activeConversation.users),
        //Id we are calling to
        signal: data,
        from: socketId,
        name: user.name,
        picture: user.picture,
      })

    })
//..
peer.on("stream",(stream)=>{
  userVideo.current.srcObject = stream;
})
socket.on("answer call",(signal)=>{
  setCallAccepted(true);
  peer.signal(signal);
})
connectionRef.current=peer

  }

  // answer call user function
  const answerCall=()=>{
    enableMedia();
    setCallAccepted(true);
    //peer
    const peer = new Peer({
      initiator: false, //ititiater is the one who start the call
      trickle:false,
      stream: stream, //sending stream to antother side 
    });
    peer.on("signal",(data)=>{
      socket.emit("answer call",{signal:data, to:call.socketId})
    });
    peer.on("stream",(stream)=>{
      userVideo.current.srcObject=stream;
    })
    peer.signal(call.signal);
    connectionRef.current = peer;
  }

    //--end call  funcion
    const endCall = () => {
      setShow(false);
      setCall({ ...call, callEnded: true, receiveingCall: false });
      myVideo.current.srcObject = null;
      socket.emit("end call", call.socketId);
      connectionRef?.current?.destroy();
    };


  console.log("socket id ------->",socketId);
  const setupMedia=()=>{
    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream)=>{
      setStream(stream);
      // userVideo.current.srcObject=stream;
    })
  }
const enableMedia=()=>{
  myVideo.current.srcObject=stream;
  setShow(true);
}


  
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
           <ChatContainer onlineUsers = {onlineUsers} callUser={callUser} typing={typing} />
          ) : (
            <WhatsappHome />
          )}
    </div>
  
    </div>
    <Call call={call} setCall={setCall} callAccepted={callAccepted} myVideo={myVideo} userVideo={userVideo} stream={stream} answerCall={answerCall} show={show}/>
   </>
  )}
//Attaching socket to this
const HomeWithSocket = (props) =>(
  <SocketContext.Consumer>
    {(socket)=><Home {...props} socket={socket}/>}
  </SocketContext.Consumer>
)

export default HomeWithSocket;