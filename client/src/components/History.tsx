import React from 'react'
import Lottie from 'react-lottie-player'
import available from "../assets/animations/available.json"
const History = () => {
  return (
    <div className="flex justify-center w-full">
      <div>
        <Lottie play animationData={available} className='w-[90%]'/>
        <h1 className='text-2xl text-center text-blue-950 font-bold'>No containers run yet</h1>
      </div>
    </div>
  );
}

export default History