import React from 'react'
import { Navbar } from '../Components/Navbar'
import { Link } from 'react-router'

export default function My404Componenet() {
  return (
    <>
      <Navbar />
      <div className='flex flex-col gap-3 justify-items-center items-center w-full p-8 pt-[20vh] px-10 xl:px-60 lg:px-40 text-black font-medium text-center text-2xl'>
        <h1>The Path You Have Chosen Leads To Darkness</h1>
        <Link className="text-(--color-primary) font-bold underline" to="/home">Go Back Home </Link>
      </div>
    </>
    
  )
}
