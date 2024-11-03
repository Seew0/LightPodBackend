import React from 'react'
import Navbar from './Navbar'

const SignIn = () => {
  return (
    <div className="flex h-[100vh]">
      {/* <Navbar /> */}

      <div className="w-[40%] flex flex-col items-center justify-center">
        <div className="bg-blue-100 p-5 w-[70%] rounded-2xl">
          <h1 className="text-4xl">Create your account</h1>
          <h2>Sign up for more advanced features</h2>
          <div className="mt-10 ">
            <div className="flex gap-10">
              <div>
                <h3>First Name</h3>
                <input type="text" className="w-[100%] p-1 rounded-md mt-1 border-none border-green-300" />
              </div>
              <div>
                <h3>Last Name</h3>
                <input type="text" className="w-[100%] p-1 rounded-md mt-1 "/>
              </div>
            </div>
            <div className="my-5 w-full">
              <h3>Email</h3>
              <input type="email" name="" id="" className="w-[100%] p-1 rounded-md mt-1 " />
            </div>
            <div className="my-5">
              <h3>Password</h3>
              <input type="password" name="" id="" className="w-[100%] p-1 rounded-md mt-1 " />
            </div>
            <button className="bg-blue-900 p-2 rounded-xl mx-auto w-[100%] text-white">
              Create Account
            </button>
            <h2 className="text-center">
              Already have an account? <span className='text-blue-800 underline'>Log in</span>
            </h2>
          </div>
        </div>
      </div>
      <div className="w-[60%] signIn"></div>
    </div>
  );
}

export default SignIn