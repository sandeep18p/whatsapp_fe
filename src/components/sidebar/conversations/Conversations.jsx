import { useSelector } from "react-redux"
import Conversation from "./Conversation"
import { setActiveConversation } from "../../../feature/chatSlice";


export default function Conversations() {
    const {conversations, activeConversation} = useSelector((state)=>state.chat);
  return (
    <div className="convos scrollbar">
    <ul>{
    
    conversations && conversations.filter((c)=>c.latestMessage || c._id ===activeConversation._id).map((convo)=>(
     <Conversation convo={convo} key={convo._id}/>
 ))
 }</ul>
    </div>
  )
}
