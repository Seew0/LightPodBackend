import React from 'react'
import Navbar from './Navbar'
import Lottie from 'react-lottie-player'
import Land1 from '../assets/animations/landing1.json'
import Pricing from './Pricing'
import Features from './Features'
import Landing2 from './Landing2'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="">
      {/* <Navbar /> */}
      <div className="  h-[100vh] land1" id="home">
        <Navbar />
        <div className="flex">
          <div className="w-[60%] mt-36 flex  justify-center">
            <div className="flex flex-col   w-[70%]">
              <h1 className="text-6xl font-bold text-white">
                Light Pod : Container Management Platform
              </h1>
              <h2 className="text-xl text-white my-8">
                Effortlessly spin up fully isolated Docker containers with just
                a few clicks. Instantly create secure environments for testing,
                development, debugging, or running custom applications—all
                within your browser.
              </h2>
              <Link to="/signIn">
                <button className="rounded-xl w-[7rem] h-10 bg-blue-900 text-white font-bold">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="w-[40%] mt-5">
            <Lottie play animationData={Land1} className="w-[80%]" />
          </div>
        </div>
      </div>
      <Features />
      <Landing2 />
      <Pricing />
    </div>
  );
}

export default Landing