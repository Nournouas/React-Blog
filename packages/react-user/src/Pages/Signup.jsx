import React, { useState } from 'react'
import { CTA, CTA_Secondary } from '../assets/styles'
import { Link, useNavigate } from "react-router";
import Header from '../Components/Header'
import { signUpPost } from '../Utility/API';

export default function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    formData.forEach((value, key) => data[key] = value);
    if (data.password != data["confirm-password"]){
      alert("passwords dont match");
      return;
    };
    const signUpErrors = await signUpPost(data);
    signUpErrors ? setErrors(signUpErrors) : navigate("/login");
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
        { errors.length > 0 && errors.map((err, index) => <li key={index}>{err.msg}</li>)}
      </form>
      
    </div>
  )
};
