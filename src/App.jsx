import React from 'react'
import Navbar from './components/Navbar'
import Chat from './components/Chat'
import {auth} from './firebase'
import {useAuthState} from 'react-firebase-hooks/auth'

const style = {
  appContainer:
    "max-w-2xl   mx-auto text-center  ",
  sectionContainer:
    "flex   flex-col bg-gray-100 shadow-xl border mt-10 relative ",
};



const App = () => {

  const [user] =useAuthState(auth)
  console.log(user)

  return (
    <div className={style.appContainer}>
      <section className={style.sectionContainer}>
        <Navbar />
        <div className='overflow-scroll'>{user ? <Chat /> : null}</div>
        {/* <Chat /> */}
      </section>
    </div>
  );
}

export default App
