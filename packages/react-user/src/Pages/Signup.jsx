import React, { useState } from 'react'
import { CTA, CTA_Secondary } from '../assets/styles'
import { Link, useNavigate } from "react-router";
import Header from '../Components/Header'

export default function Signup() {

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {}
    formData.forEach((value, key) => data[key] = value);
    if (data.password == data["confirm-password"]){
      const response = await fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    const result = await response.json();
    if (!response.ok){
      console.log(result.errors)
      setErrors(result.errors);
      return;
    }else{
      return true;
    }
     navigate("/login");
    }else {
      alert("passwords dont match")
    }

  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-secondary">
      
      <Header title="Sign Up Now To View" highlight="Posts"/>
      <form onSubmit={handleFormSubmit} action="http://localhost:3001/signup" method='POST' className='flex flex-col gap-5'>
        <div className='flex flex-col justify-items-center items-start gap-3 w-100'>
          <label htmlFor="email">Email:</label>
          <input required type="email" id='email' name='email' className='border border-black-200 px-2 py-3 w-[100%]' />
        </div>
        <div className='flex flex-col justify-items-center items-start gap-3 w-100'>
          <label htmlFor="name">Name:</label>
          <input required maxLength={24} minLength={2} type="text" id='name' name='name' className='border border-black-200 px-2 py-3 w-[100%]' />
        </div>
        <div className='flex flex-col justify-items-center items-start gap-3 w-100'>
          <label htmlFor="password">Password:</label>
          <input type="password" maxLength={24} minLength={8} id='password' name='password' className='border border-black-200 px-2 py-3 w-[100%]' />
        </div>
        <div className='flex flex-col justify-items-center items-start gap-3 w-100'>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" maxLength={24} minLength={8} id='confirm-password' name='confirm-password' className='border border-black-200 px-2 py-3 w-[100%]' />
        </div>
        <div className='flex flex-row justify-items-center items-start gap-3 w-100'>
          <button type="submit" className={CTA}>Sign up</button>
          <Link className={CTA_Secondary} to="/login">Login Instead</Link>
        </div>
        { errors.length > 0 && errors.map(err => <li>{err.msg}</li>)}
      </form>
      
    </div>
  )
}
