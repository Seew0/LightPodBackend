import React from 'react'
import Lottie from 'react-lottie-player'


const Pricing = () => {
  return (
    <div className="flex justify-center h-[100vh] items-start pricing" id='pricing'>
      <div className="flex justify-center flex-col items-center w-full mt-[10vh]">
        <h1 className="text-5xl font-bold">
          Choose the Plan that Fits Your Needs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-[20vh] w-[85%]">
          <div className="w-full bg-white opacity-95 flex flex-col items-center shadow-sm rounded-xl shadow-blue-950 p-3 justify-center text-center gap-2">
            <h1 className="font-semibold  text-2xl">Free</h1>
            <h2>$0/month</h2>
            <div className="">
              <h1>Access to basic features</h1>
              <h1>Limited to one environment</h1>
              <h1>Community support</h1>
            </div>
            <button className="rounded-xl p-2 bg-blue-900 text-white my-2">
              Choose Plan
            </button>
          </div>
          <div className="w-full bg-white opacity-95 flex flex-col items-center shadow-sm rounded-xl shadow-blue-950 p-3 justify-center text-center gap-2">
            <h1 className='font-semibold  text-2xl'>Pro</h1>
            <h2>$15/month</h2>
            <div>
              <h1>Access to all features</h1>
              <h1>Unlimited environments</h1>
              <h1>Email support</h1>
              <button className="rounded-xl p-2 bg-blue-900 text-white my-3">
                Choose Plan
              </button>
            </div>
          </div>
          <div className="w-full bg-white flex flex-col items-center shadow-sm rounded-xl shadow-blue-950 p-3 justify-center text-center gap-2">
            <h1 className='font-semibold  text-2xl'>Enterprise</h1>
            <h2>$49/month</h2>
            <div>
              <h1>All Pro features</h1>
              <h1>Dedicated support</h1>
              <h1>Custom solutions</h1>
              <button className="rounded-xl p-2 bg-blue-900 text-white my-3">
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing