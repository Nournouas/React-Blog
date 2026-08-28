import React from 'react'
import { postNewPost } from '../Utility/API'
import { CTA } from '../assets/styles';


export default function CreatePost ({ setPub, pub }) {
  const handleNewPost = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    formData.forEach((value, key) => data[key] = value);
    postNewPost(data);
    setPub(pub + 1);
  }
  return (
    <div className='flex flex-col p-8  w-full items-center bg-secondary'>
      <form onSubmit={handleNewPost} action="http://localhost:3001/API/posts/create" method="POST" className='flex flex-col gap-6'>
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
      <div className='w-full h-0.5 bg-black mt-10'></div>
    </div>

  )
}
