import React from 'react'
import explore from "../assets/icons/explore.png"
import chrome from "../assets/icons/chrome.png"
import ubuntu from "../assets/icons/ubuntu.png"
const NewContainer = () => {
  return (
    <div className=''>
          <h1 className='text-4xl text-blue-950 font-bold'>Welcome User</h1>
          <h2>Spin up your containers with just one simple click</h2>
          <div className='mt-7'>
            <h1 className='text-2xl'>Free Containers</h1>
            <div className='flex gap-3'>
              <div className=' px-2 py-2 rounded-xl mt-3 flex justify-center text-center w-[150px] bg-blue-950 gap-2'>
                <img src={chrome} alt="" className='w-[25px]' />
                <h1 className='text-white'>Chrome</h1>
              </div>
              <div className=' px-2 py-2 rounded-xl mt-3 flex justify-center text-center w-[150px] bg-blue-950 gap-2'>
                <img src={ubuntu} alt="" className='w-[25px]' />
                <h1 className='text-white'>Ubuntu</h1>
              </div>
            </div>
          </div>
          <div className='mt-7'>
            <h1 className='text-2xl'>Premium Containers</h1>
            <div className='flex gap-3'>
              <div className=' px-2 py-2 rounded-xl mt-3 flex justify-center text-center w-[150px] bg-blue-950 gap-2'>
                <img src={chrome} alt="" className='w-[25px]' />
                <h1 className='text-white'>VS Code</h1>
              </div>
              <div className=' px-2 py-2 rounded-xl mt-3 flex justify-center text-center w-[150px] bg-blue-950 gap-2'>
                <img src={ubuntu} alt="" className='w-[25px]' />
                <h1 className='text-white'>Zoom</h1>
              </div>
              <div className=' px-2 py-2 rounded-xl mt-3 flex justify-center text-center w-[150px] bg-blue-950 gap-2'>
                <img src={ubuntu} alt="" className='w-[25px]' />
                <h1 className='text-white'>Atom</h1>
              </div>
            </div>
          </div>

          

        </div>
  )
}

export default NewContainer