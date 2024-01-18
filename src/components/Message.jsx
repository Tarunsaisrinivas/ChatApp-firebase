import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteDoc, doc } from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";
const style = {
  message: `flex items-center  shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
  name: `absolute mt-[-4rem] text-gray-600 text-xs`,
  sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`,
  received: `bg-[#e5e5ea] text-black float-left rounded-br-full`,
};
const Message = ({ message }) => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  const [user] = useAuthState(auth);
  const [pressTimer, setPressTimer] = useState(null);
  const pressThreshold = 1000; // Set your desired long press duration in milliseconds
  const iconRef = useRef(null);

  const messageClass =
    message.uid === auth.currentUser.uid
      ? `${style.sent}`
      : `${style.received}`;
  const formattedTimestamp = message.timestamp?.toDate().toLocaleString();
const handleDeleteMessage = async () => {
  // Check if the current user is the sender of the message
  if (auth.currentUser.uid === message.uid) {
    const confirmed = window.confirm(
      "Do you really want to delete this message?"
    );

    if (confirmed) {
      try {
        const messageDocRef = doc(db, "messages", message.id);
        await deleteDoc(messageDocRef);
        console.log("Message deleted successfully");
      } catch (error) {
        console.error("Error deleting message", error);
      }
    }
  } else {
    alert("You don't have permission to delete this message.");
    // Optionally, show a message or perform some other action
  }
};


  const handleMouseDown = () => {
    setPressTimer(
      setTimeout(() => {
        // On long press, do something
        console.log("Long press detected!");
        // For example, trigger the delete action
        handleDeleteMessage();
      }, pressThreshold)
    );
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
  };

  return (
    <div className="" data-aos="zoom-in">
      <div
        className={`${style.message} ${messageClass}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <p className={style.name}>
          {message.name} {formattedTimestamp}
        </p>
        {/* <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full" /> */}
        <div className="visible sm:invisible ">
          <ion-icon
            name="trash-outline"
            onClick={handleDeleteMessage}
            ref={iconRef}
          ></ion-icon>
        </div>
        <p className="select-none ">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
