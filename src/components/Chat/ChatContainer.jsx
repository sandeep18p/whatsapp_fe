import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { useEffect } from "react";
import { getConversationMessages } from "../../feature/chatSlice";
import ChatActions from "./actions/ChatActions";


export default function ChatContainer() {
    const dispatch = useDispatch();
  const { activeConversation, messages } = useSelector((state) => state.chat);
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
        <ChatHeader/>
        {/* Chat messages */}
        <ChatMessages/>
        {/* Chat Actions */}
        <ChatActions/>
    </div>
    </div>
  )
}
