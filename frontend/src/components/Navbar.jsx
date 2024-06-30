import React from 'react'
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div className='sticky top-4 border border-pink-200 shadow-md w-[40%] max-w-screen-lg mx-auto px-5 font-semibold text-lg  py-2.5 flex justify-around items-center rounded-lg bg-pink-700'>
      <Link to="/" className="justify-self-start logo text-white">
        Smart City
      </Link>
      <div className="links flex w-[50%] justify-evenly">
        <Link to="/complaints" className="hover:text-purple-200 text-white">
          Forum
        </Link>
        <Link to="/addcomplaint" className="hover:text-purple-200 text-white">
          Raise a Complaint
        </Link>
        
      </div>
    </div>
  )
}

export default Navbar
