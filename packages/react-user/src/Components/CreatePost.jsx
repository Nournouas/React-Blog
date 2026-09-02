import React, { useState } from 'react'
import { postNewPost } from '../Utility/API'
import { CTA, CTA_Secondary } from '../assets/styles';
import { Navbar } from '../Components/Navbar';
import MCEEDitor from './MCEEditor';

export default function CreatePost () {
  const [formData, setFormData] = useState({description: "I hereby declare..."});
  const handleNewPost = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    formData.forEach((value, key) => data[key] = value);
    console.log(data)
    await postNewPost(data);
  }

  return(
    <div>
      <Navbar />
      <div className='flex flex-1 gap-4 flex-col p-8 w-full items-center justify-center bg-background'>
        <MCEEDitor formData={formData} setFormData={setFormData}/>
        <form onSubmit={handleNewPost} action="http://localhost:3001/API/posts/create" method="POST" className='flex bg-secondary flex-col gap-6 p-6'>
          <div className='flex flex-col justify-items-center items-start gap-3 w-100'>
            <label htmlFor="title">Title:</label>
            <input required type="text" id='title' name='title' className='border border-black-200 px-2 py-3 w-full' />
          </div>
            <input type="text" readOnly hidden id='body' name='body' value={formData.description} className='border border-black-200 px-2 py-3 w-full' />
          <div className='flex flex-row justify-items-center items-start gap-3 w-100'>
            <button type="submit" className={CTA}>Publish</button>
          </div>
        </form>
      </div>
    </div>
    
  )
  /*
  return (
    <>
    <Navbar/>
      <div className='flex flex-1 flex-col p-8 w-full items-center justify-center bg-background'>
        <form onSubmit={handleNewPost} action="http://localhost:3001/API/posts/create" method="POST" className='flex bg-secondary flex-col gap-6 p-6'>
          <div className='flex flex-col justify-items-center items-start gap-3 w-100'>
            <label htmlFor="title">Title:</label>
            <input type="text" id='title' name='title' className='border border-black-200 px-2 py-3 w-full' />
          </div>
          <div className='flex flex-col justify-items-center items-start gap-3 w-100'>
            <label htmlFor="body">Body:</label>
            <input type="text" id='body' name='body' className='border border-black-200 px-2 py-3 w-full' />
          </div>
          <div className='flex flex-row justify-items-center items-start gap-3 w-100'>
            <button type="submit" className={CTA}>Publish</button>
          </div>
        </form>
      </div>
    </>
  )*/
}
