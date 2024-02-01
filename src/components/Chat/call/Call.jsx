
import { useState } from "react";
import CallActions from "./CallActions";
import CallArea from "./CallArea";
import Header from "./Header";
import Ringing from "./Ringing";

export default function Call({call,setCall, callAccepted}) {
    const {receiveingCall, callEnded}=call;
    const [showActions,setShowActions]=useState(false);
  return (
    <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg
    ${receiveingCall && !callAccepted ? "hidden" : ""}
    `} onMouseOver={() => setShowActions(true)}
        onMouseOut={() => setShowActions(false)}>
        {/* Container */}
        <div>
          <div>
            {/*Header*/}
            <Header />
            {/*Call area*/}
          <CallArea name="Sandeep"/>
          {/*Call actions*/}
        {showActions ?  <CallActions /> : null }
            </div>  </div>
    
    {receiveingCall && !callAccepted &&(<Ringing call={call} setCall={setCall}/>)}</div>
  )
}
