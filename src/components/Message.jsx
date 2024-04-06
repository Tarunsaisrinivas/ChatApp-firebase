// Message component
import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteDoc, doc } from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";
import CryptoJS from "crypto-js";

const style = {
  message: `flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
  name: `absolute mt-[-4rem] flex text-gray-600 text-xs`,
  sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`,
  received: `bg-[#e5e5ea] text-black float-left rounded-br-full`,
};

const Message = ({ message }) => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const [user] = useAuthState(auth);
  const [pressTimer, setPressTimer] = useState(null);
  const pressThreshold = 1000;
  const iconRef = useRef(null);

  // Determine the message class based on the sender's UID
  const messageClass = message.uid === auth.currentUser.uid ? `${style.sent}` : `${style.received}`;

  const formattedTimestamp = message.timestamp?.toDate().toLocaleString();

  const decryptMessage = (encryptedMessage) => {
    const secretKey = 'YourSecretKeyHere';
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleDeleteMessage = async () => {
    if (auth.currentUser.uid === message.uid) {
      const confirmed = window.confirm("Do you really want to delete this message?");
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
    }
  };

  const handleMouseDown = () => {
    setPressTimer(
      setTimeout(() => {
        console.log("Long press detected!");
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
          <img src={message.profile} alt="" className="w-5 h-5 rounded-full " />
          {message.name}
          {formattedTimestamp}
        </p>
        <div className="visible sm:invisible ">
          <ion-icon
            name="trash-outline"
            onClick={handleDeleteMessage}
            ref={iconRef}
          ></ion-icon>
        </div>
        <p className="select-none ">{decryptMessage(message.text)}</p>
      </div>
    </div>
  );
};

export default Message;
