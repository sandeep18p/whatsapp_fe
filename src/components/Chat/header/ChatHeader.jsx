import { useSelector } from "react-redux";
import { DotsIcon, SearchLargeIcon } from "../../../svg";
import { capitalize } from "../../../utils/string";


export default function ChatHeader( {online}) {
    const { activeConversation } = useSelector((state) => state.chat);
    const {name, picture} = activeConversation;
    const { user } = useSelector((state) => state.user);
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
    {/*Container*/}
    <div className="w-full flex items-center justify-between">
      {/*left*/}
      <div className="flex items-center gap-x-4">
      <button className="btn">
            <img
              src={
                // activeConversation.isGroup
                //   ? activeConversation.picture
                //   : getConversationPicture(user, activeConversation.users)
                picture
              }
              alt={`${name} picture`}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
           {/*Conversation name and online status*/}
           <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {/* {activeConversation.isGroup
                ? activeConversation.name
                : capitalize(
                    getConversationName(user, activeConversation.users).split(
                      " "
                    )[0]
                  )} */}
                  {capitalize(name.split(" ")[0])}
            </h1>
            <span className="text-xs dark:text-dark_svg_2">
              {online ? "online" : ""} 
            </span>
          </div>
      </div>
      
      {/* Right */}
      <ul className="flex items-center gap-x-2.5">
      <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
      </ul>
      </div></div>
  )
}
