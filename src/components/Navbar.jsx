import React from 'react'
import { FaRobot, FaRegCircleUser } from "react-icons/fa6";
import "./../App.css"
export const Navbar = () => {
  return (
    <div className='nav flex items-center justify-between h-25'>
        <div className="logo flex items-center gap-2.5">
            <i className='text-[50px]'><FaRobot /></i>
            <h3 className='text-[25px] font-bold'>Bot<span className='text-purple-500'>GPT</span></h3>
        </div>
        <div className='user'>
            <i className='text-[27px] cursor-pointer'><FaRegCircleUser /></i>
        </div>
        
    </div>
  )
}
