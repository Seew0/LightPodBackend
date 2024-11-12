import React from 'react'
import Lottie from 'react-lottie-player'
import landing2 from '../assets/animations/landing2.json'
import { Link } from 'react-router-dom';
const Landing2 = () => {
  return (
    <div className="flex flex-row-reverse bg-blue-800 h-[100vh] land3">
      <div className="w-[45%] mt-36 flex  justify-center">
        <div className="flex flex-col   w-[70%]">
          <h1 className="text-6xl font-bold text-white">
            Simplify Your Development
          </h1>
          <h2 className="text-xl text-white my-8">
            Light Pod’s user-friendly interface allows you to effortlessly
            manage and run custom applications in secure Docker environments.
            Perfect for all your testing and development needs!
          </h2>
          <Link to="/signIn">
          <button className="rounded-xl w-[7rem] h-10 bg-blue-900 text-white font-bold">
            Get Started
          </button>
          </Link>
        </div>
      </div>
      <div className="w-[55%] mt-32">
        <Lottie play animationData={landing2} className="w-[80%]" />
      </div>
    </div>
  );
}

export default Landing2