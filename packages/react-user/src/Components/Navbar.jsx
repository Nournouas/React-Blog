import { NavLink } from "react-router";
import { useState } from 'react'
export function Navbar() {

  return (
    <div className="flex row place-content-between w-full p-8 px-10 xl:px-60 lg:px-40 bg-secondary text-black font-medium">
        <div className="flex row gap-4">
            <NavLink to="/home" className="flex items-center h-full px-6">Home</NavLink>
            <NavLink to="/profile" className="flex items-center h-full px-6">My Profile</NavLink>
        </div>
        <NavLink to="/logout" className="flex items-center h-full px-6">logout</NavLink>
    </div>
  );
}