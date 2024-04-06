// SendMessage.jsx
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import CryptoJS from "crypto-js";

const SendMessage = ({ scroll }) => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (input === "") {
      alert("Please enter a valid message");
      return;
    }

    // Encrypt the message before storing it in Firestore
    const encryptedMessage = encryptMessage(input);

    const { uid, displayName } = auth.currentUser;

    await addDoc(collection(db, "messages"), {
      text: encryptedMessage, // Store the encrypted message
      name: displayName,
      uid: uid,
      profile: auth.currentUser.photoURL,
      timestamp: serverTimestamp(),
    });

    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  // Function to encrypt the message before sending to Firestore
  const encryptMessage = (message) => {
    // Use a secret key for encryption (Make sure to keep this secret key secure)
    const secretKey = 'YourSecretKeyHere';
    return CryptoJS.AES.encrypt(message, secretKey).toString();
  };

  return (
    <form onSubmit={sendMessage} className="h-14 w-full max-w-[728px]  flex text-xl absolute bottom-0">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full text-xl p-3 bg-gray-900 text-white outline-none border-none"
        type="text"
        placeholder="Message"
      />
      <button type="submit" className="w-[20%] bg-green-500">
        <ion-icon name="send"></ion-icon>
      </button>
    </form>
  );
};

export default SendMessage;
