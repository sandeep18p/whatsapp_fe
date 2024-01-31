import { useSelector } from "react-redux"
import Conversation from "./Conversation"
import { setActiveConversation } from "../../../feature/chatSlice";
import { checkOnlineStatus, getConversationId } from "../../../utils/chat";


export default function Conversations({onlineUsers, typing}) {
  const {user}=useSelector((state)=>state.user);
    const {conversations, activeConversation} = useSelector((state)=>state.chat);
  return (
    <div className="convos scrollbar">
    <ul>{
    
    conversations && conversations.filter((c)=>c.latestMessage || c._id ===activeConversation._id).map((convo)=>{
      let check = checkOnlineStatus(onlineUsers,user,convo.users);
     console.log("----check--",check);
      return     <Conversation convo={convo} key={convo._id} online={check ? true: false}
        typing={typing}
      />
 
    })}</ul>
    </div>
  )
}
