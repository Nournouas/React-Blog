import React from 'react'
import { CTA, CTA_Secondary } from '../assets/styles'
import { Link, useNavigate } from "react-router";
import Header from '../Components/Header'

export default function Signup() {
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {}
    formData.forEach((value, key) => data[key] = value);
    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      navigate("/login");
    })
    .catch((err) => {
      console.error(err)
    })
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Header title="Sign Up Now To View" highlight="Posts"/>
      <form onSubmit={handleFormSubmit} action="http://localhost:3001/signup" method='POST' className='flex flex-col gap-5'>
        <div className='flex flex-col justify-items-center items-start gap-3 w-100'>
          <label htmlFor="email">Email:</label>
          <input type="email" id='email' name='email' className='border border-gray-200 px-2 py-3 w-[100%]' />
        </div>
        <div className='flex flex-col justify-items-center items-start gap-3 w-100'>
          <label htmlFor="password">Password:</label>
          <input type="password" id='password' name='password' className='border border-gray-200 px-2 py-3 w-[100%]' />
        </div>
        <div className='flex flex-col justify-items-center items-start gap-3 w-100'>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="confirm-password" id='confirm-password' name='confirm-password' className='border border-gray-200 px-2 py-3 w-[100%]' />
        </div>
        <div className='flex flex-row justify-items-center items-start gap-3 w-100'>
          <button type="submit" className={CTA}>Sign up</button>
          <Link className={CTA_Secondary} to="/login">Login Instead</Link>
        </div>
      </form>
      
    </div>
  )
}
