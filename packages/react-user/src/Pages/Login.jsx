import React from 'react'
import { CTA, CTA_Secondary } from '../assets/styles'
import { Link, useNavigate } from "react-router";
import Header from '../Components/Header'

export default function Login() {
    const navigate = useNavigate();
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      let data = {}
      formData.forEach((value, key) => data[key] = value);
      console.log(data)
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
           Accept: 'application/json',
          "Content-Type": "application/json",
          credentials: 'include',
        },
        body: JSON.stringify(data)
      })
      .then(res => {
        console.log(res)
        return res.json
      })
      .catch((err) => {
        console.error(err)
      })
    }
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Header title="Login to View" highlight="Posts"/>
      <form onSubmit={handleFormSubmit} action="/http://localhost:3001/login" method='POST' className='flex flex-col gap-5'>
        <div className='flex flex-col justify-items-center items-start gap-3 w-100'>
          <label htmlFor="email">Email:</label>
          <input type="email" id='email' name='email' className='border border-gray-200 px-2 py-3 w-[100%]' />
        </div>
        <div className='flex flex-col justify-items-center items-start gap-3 w-100'>
          <label htmlFor="password">Password:</label>
          <input type="password" id='password' name='password' className='border border-gray-200 px-2 py-3 w-[100%]' />
        </div>
        <div className='flex flex-row justify-items-center items-start gap-3 w-100'>
          <button type="submit" className={CTA}>Log in</button>
          <Link className={CTA_Secondary} to="/signup">Sign up Instead</Link>
        </div>
      </form>
      
    </div>
  )
}
