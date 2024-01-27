
// import Menu from "./menu/Menu";

import { useState } from "react";
import { AttachmentIcon } from "../../../../svg";
import Menu from "./Menu";

export default function Attachments({
  showAttachments,
  setShowAttachments,
  setShowPicker,
}) {
  const [show,setShow] = useState(false);
  return (
    <li className="relative">
      <button
        onClick={() => {
          // setShow((prev)=> !prev)
          setShowPicker(false);
          setShowAttachments((prev) => !prev);
        }}
        type="button"
        className="btn"
      >
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {/* Menu */}
      {/* <Menu /> */}
      {showAttachments ? <Menu /> : null}
    </li>
  );
}
