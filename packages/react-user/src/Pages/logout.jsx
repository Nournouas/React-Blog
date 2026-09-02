import React, { useState, useEffect } from 'react'
import { CTA, CTA_Secondary, card } from '../assets/styles'
import { Link, Links, useNavigate } from "react-router";
import Header from '../Components/Header'
import { logUserOut } from '../Utility/API';

export default function Logout() {
  const [loggedOut, setLoggedOut] = useState(false)
  useEffect(() => {
    async function logOut() {
      const loggedout = await logUserOut();
      if (loggedout){
        setLoggedOut(true);
      }
    }
    logOut();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
    {loggedOut ?
    <div className='flex p-5 flex-col gap-6 items-center justify-center bg-secondary border rounded-md'>
      <h1>Logged Out</h1>
      <Link className={CTA} to="/Login">Log back in</Link>
      <Link className={CTA_Secondary} to="/signup">Sign up to a different account</Link>
    </div>
    :
    <div>
      <h1>logging out..</h1>
    </div>
    }
    </ div>
  )
}
