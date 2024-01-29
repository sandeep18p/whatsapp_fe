import React, { useRef, useState } from 'react'

import { ClipLoader } from "react-spinners";
// import Attachments from './attachments/Attachments';
import Input from './Input';
import { SendIcon } from '../../../svg';
import { sendMessage } from '../../../feature/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPickerApp from './EmojiPicker';
import { Attachments } from './attachments';
import SocketContext from "../../../context/SocketContext";

 function ChatActions({ socket }) {
  
  const dispatch = useDispatch();
  const [showPicker, setShowPicker]=useState(false);
  const [showAttachments,setShowAttachments]=useState(false);
  const { activeConversation, status } = useSelector((state) => state.chat);
  const {user}=useSelector((state)=>state.user);
  const [loading, setLoading] = useState(false);
  const {token}=user;
  const [message, setMessage] = useState("");
  const textRef = useRef();
  const values = {
    message,
    convo_id: activeConversation._id,
    files: [],
    token,
  };
  const sendMessageHandler = async(e) =>{
    e.preventDefault();
    setLoading(true);
    let newMsg = await dispatch(sendMessage(values));
    socket.emit("send message", newMsg.payload);
    setMessage("");
    setLoading(false);
  }

  return (
    <form
      onSubmit={(e) => sendMessageHandler(e)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
     {/*Container*/}
     <div className="w-full flex items-center gap-x-2">
        {/*Emojis and attachpments*/}
        <ul className="flex gap-x-2">
        <EmojiPickerApp textRef={textRef} message={message} setMessage={setMessage} showPicker={showPicker} setShowPicker={setShowPicker}
        setShowAttachments={setShowAttachments} />
          <Attachments showAttachments={showAttachments} setShowAttachments={setShowAttachments}
            setShowPicker={setShowPicker}
          />
        </ul>
        {/* Input */}
        <Input message={message} setMessage={setMessage}
          textRef={textRef}
        />
        {/* Send Button */}
        <button type="submit" className="btn">
        {status === "loading" && loading ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        {/* <SendIcon className="dark:fill-dark_svg_1" /> */}
        </button>
      </div>

    </form>
  )
}
const ChatActionsWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatActions {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default ChatActionsWithSocket;