import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex justify-between mx-10 py-6 text-white text-xl font-bold pt-10">
      <div>
        <a href="#home">Lightpod </a>
      </div>
      <div className="flex justify-between w-[20%]">
        <a href="#home">
          <h3>Home</h3>
        </a>
        <a href="#features">
          <h3>Features</h3>
        </a>
        <a href="#pricing">
          <h3>Pricing</h3>
        </a>
      </div>
      <div>
        <Link to="/signIn">
          <button className='text-white'>Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar