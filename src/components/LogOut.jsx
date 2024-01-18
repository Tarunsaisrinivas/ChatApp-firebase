import React from 'react'
import {auth} from '../firebase'
import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

const style = {
  button: `bg-gray-200 px-4 py-2 hover:bg-gray-100`,
};


const LogOut = () => {
 const [user] = useAuthState(auth)
    const signOut = () => {
         signOut(auth);
       };
  return (
    <div className="flex">
      {user && user.photoURL && (
        <img
          src={user.photoURL}
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      )}
      <p className="text-center text-white text-xl ml-3 m-auto mr-5">
        {" "}
        {user.displayName}{" "}
      </p>

      <button onClick={() => auth.signOut()} className={style.button}>
        LogOut
      </button>
    </div>
  );
}

export default LogOut
