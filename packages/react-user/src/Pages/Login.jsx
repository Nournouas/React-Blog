import React from 'react'
import { CTA, CTA_Secondary } from '../assets/styles'
import { Link, useNavigate } from "react-router";
import Header from '../Components/Header'

export default function Login() {
    const navigate = useNavigate();
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      let data = {}
      formData.forEach((value, key) => data[key] = value);
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
           Accept: 'application/json',
          "Content-Type": "application/json",
          credentials: 'include',
        },
        body: JSON.stringify(data)
      })
      const result = await response.json();
      localStorage.setItem('token', result)
      navigate("/home")

    }
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-secondary">
      <Header title="Login to View" highlight="Posts"/>
      <form onSubmit={handleFormSubmit} action="/http://localhost:3001/login" method='POST' className='flex flex-col gap-5'>
        <div className='flex flex-col justify-items-center items-start gap-3 w-100'>
          <label htmlFor="email">Email:</label>
          <input type="email" id='email' name='email' className='border border-black-200 px-2 py-3 w-[100%]' />
        </div>
        <div className='flex flex-col justify-items-center items-start gap-3 w-100'>
          <label htmlFor="password">Password:</label>
          <input type="password" id='password' name='password' className='border border-black-200 px-2 py-3 w-[100%]' />
        </div>
        <div className='flex flex-row justify-items-center items-start gap-3 w-100'>
          <button type="submit" className={CTA}>Log in</button>
          <Link className={CTA_Secondary} to="/signup">Sign up Instead</Link>
        </div>
      </form>
      
    </div>
  )
}
