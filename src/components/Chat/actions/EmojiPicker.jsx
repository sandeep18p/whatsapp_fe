import { useEffect, useState } from "react";
import { CloseIcon, EmojiIcon } from "../../../svg";
import EmojiPicker from 'emoji-picker-react';

export default function EmojiPickerApp({textRef, message, setMessage, showPicker, setShowPicker, setShowAttachments}) {
 
  const [cursorPosition, setCursorPosition] = useState();
  useEffect(()=>{
    textRef.current.selectionEnd = cursorPosition;
  },[cursorPosition]);
  const handleEmoji = (emojiData, e) => {

    const { emoji } = emojiData; //
    // extracting emoji
  
    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPosition(start.length + emoji.length); //it will poitn after where the last emoji is added in text
  };
  return (
   <li>
    <button className="btn" type="button"
    onClick={()=>{
      setShowAttachments(false);
      setShowPicker((prev)=>!prev)}}>
    {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
    
    </button>
    {showPicker ?
    (<div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
        </div>) : null }
   </li>
  )
}
