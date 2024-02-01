import { useEffect, useState } from "react";
import { CloseIcon} from "../../../svg";
import ValidIcon from "../../../svg/Valid"
export default function Ringing({call, setCall}) {
    const { receiveingCall, callEnded} = call;
    const [timer, setTimer] = useState(0);
    let interval;
    const handleTimer = () => {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    };
    console.log(timer);
    useEffect(() => {
      if (timer <= 10) {
        handleTimer();
      } else {
        setCall({ ...call, receiveingCall: false });
        // 18:00 video 86 /this means set all the values of call and overide the receivingCall in call
      }
      return () => clearInterval(interval);
    }, [timer]);
  return (
    <div className="dark:bg-dark_bg_1 rounded-lg fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30">
      {/*Container*/}
      <div className="p-4 flex items-center justify-between gap-x-8">
        {/*Call infos*/}
        <div className="flex items-center gap-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
            alt={`caller profile picture`}
            className="w-28 h-28 rounded-full"
          />
       <div>
        <h1 className="dark:text-white">
        <b>Sandeep pansari</b>
        </h1>
        <span className="dark:text-dark_text_2">Whatsapp video...</span>
       </div>
       {/* Call Actions */}
       <ul className="flex items-center gap-x-2">
        <li><button
        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
            <CloseIcon className="fill-white w-5" />
        </button></li>
        <li >
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
            <ValidIcon className="fill-white w-6 mt-2" />
            </button>
          </li>
       </ul>
          </div></div>
          {/* Ringtone */}
          <audio src="../../../../audio/ringtone.mp3"  Loop></audio>
          {/* <audio src="../../../../audio/ringtone.mp3" autoPlay Loop></audio> */}
          </div>
  )
}
