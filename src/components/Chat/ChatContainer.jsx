import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { useEffect } from "react";
import { getConversationMessages } from "../../feature/chatSlice";
import ChatActions from "./actions/ChatActions";
import { checkOnlineStatus, getConversationId } from "../../utils/chat";
import FilePreview from "./preview/files/FilesPreview.jsx";




export default function ChatContainer({onlineUsers,callUser, typing}) {
    const dispatch = useDispatch();
  const { activeConversation, messages,files } = useSelector((state) => state.chat);

  const { user } = useSelector((state) => state.user);
  const { token } = user;
    const values = {
        token,
        convo_id: activeConversation?._id,
      };
    useEffect(() => {
        if (activeConversation?._id) {
          dispatch(getConversationMessages(values));
        }
      }, [activeConversation]);
      console.log("messages", messages)
  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
     {/*Container*/}
     <div>
        {/*Chat header*/}
        {/* <ChatHeader online = {onlineUsers.find((u)=>u.userId === getConversationId(user, activeConversation.users) ? true : false )}/> */}
        
        <ChatHeader online = {checkOnlineStatus(onlineUsers,user,activeConversation.users)} callUser={callUser} />
        {/* Chat messages */}
        {files.length>0 ? (
           <FilePreview/>
        ):(<>
        <ChatMessages typing={typing} />
        {/* Chat Actions */}
        <ChatActions/>
        </>)}
        
    </div>
    </div>
  )
}
