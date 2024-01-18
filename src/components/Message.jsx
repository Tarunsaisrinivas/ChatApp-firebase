
import React from 'react'
import {auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
const style = {
  message:
    "flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full",
  name: "absolute mt-[-4rem] text-gray-600 text-xs",
  sent: "bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full",
  received: "bg-[#e5e5ea] text-black float-left rounded-br-full",
};


const Message = ({message}) => {

  const [user] = useAuthState(auth);
  console.log(user);
const messageClass = message.uid === auth.currentUser.uid ?`${style.sent}`:`${style.received}`
    const formattedTimestamp = message.timestamp?.toDate().toLocaleString();

  return (
    <div className={`${style.message} ${messageClass}`}>
      <p className={style.name}>
        {message.name} {formattedTimestamp}
        {/* {user.email} */}
      </p>
      {/* <p className={style.timestamp}>{formattedTimestamp}</p> */}
      <p>{message.text}</p>
      {/* <p>Im learning React</p> */}
    </div>
  );
}

export default Message
