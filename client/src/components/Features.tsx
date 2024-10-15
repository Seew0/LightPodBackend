import React from 'react'
import secure from '../assets/animations/secure.json'
import integration from '../assets/animations/integration.json'
import docker from '../assets/animations/docker.json'
import Lottie from 'react-lottie-player'

const Features = () => {
  return (
    <div className='flex justify-center items-start h-[100vh] land2' id='features'>
      <div className="flex flex-col items-center justify-center w-[85%] mt-[10vh]">
        <h1 className='text-5xl font-bold text-center'>Revolutionizing Browser-based Environments</h1>
        <h2 className='my-[40px] text-2xl text-center'>
          Experience seamless, secure, and fully sandboxed interactions with
          isolated environments directly within your browser.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[10px]" >
          <div className="w-full bg-white opacity-95 flex flex-col items-center shadow-sm rounded-xl shadow-blue-950 p-3 justify-center text-center">
            <Lottie play animationData={integration} className="w-[35%]" />
            <h1 className='text-xl my-3 font-medium'>Seamless Integration</h1>
            <h2>
              Instantly access browsers, development environments, editors, and
              more within your browser.
            </h2>
          </div>
          <div className="w-full bg-white opacity-95 flex flex-col items-center shadow-sm rounded-xl shadow-blue-950 p-3 justify-center text-center">
            <Lottie play animationData={docker} className="w-[35%]" />
            <h1 className='text-xl my-3 font-medium'>Powered by Docker</h1>
            <h2>
              Harness the power of Docker containers to deliver a robust and
              reliable experience.
            </h2>
          </div>
          <div className="w-full bg-white opacity-95 flex flex-col items-center shadow-sm rounded-xl shadow-blue-950 p-3 justify-center text-center">
            <Lottie play animationData={secure} className="w-[35%]" />
            <h1 className='text-xl my-3 font-medium'>Secure & Isolated</h1>
            <h2>
              Ensure complete isolation of processes, providing a fresh instance
              of any service with each interaction.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features