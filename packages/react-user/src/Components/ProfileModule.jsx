import React from 'react'

export default function ProfileModule({name, postCount, tarot}) {
  const cardLinks = [
    "./t-1.webp",
    "./t-2.webp",
    "./t-3.webp",
    "./t-4.webp",
    "./t-5.webp",
    "./t-6.webp",
    "./t-7.webp",
    "./t-8.webp",
    "./t-9.webp",
    "./t-10.webp",
    "./t-11.webp",
    "./t-12.webp",
  ]
  console.log(tarot)

  return (
    <div className='bg-secondary text-primary p-6 my-4 flex flex-row gap-4 max-h-50 items-center'>
      <img src={cardLinks[tarot]} alt="" className='max-h-40'/>
      <h1 className='min-h-1 mt-5 mb-5 h-fit' >{name}, {postCount} posts</h1>
    </div>
  )
}
