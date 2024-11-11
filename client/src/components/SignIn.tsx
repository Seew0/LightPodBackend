import React, { useState } from 'react'
import { supabase } from '../SupabaseClient'
// import { supabase } from '../SupabaseClient' // Import the Supabase client
import Navbar from './Navbar'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSignUp = async () => {
    setError(null)

    // Sign up with Supabase
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    })

    if (error) {
      console.log(error);
      
      // setError(error)
    } else {
      alert('Sign-up successful! Please check your email for confirmation.')
    }
  }

  return (
    <div className="flex h-[100vh] signin">
      {/* <Navbar /> */}

      <div className="w-[40%] flex flex-col items-center justify-center">
        <div className="bg-blue-950 p-7 w-[70%] rounded-2xl text-white">
          <h1 className="text-4xl mb-2 font-bold">Create your account</h1>
          <h2 className='font-mono'>Sign up for more advanced features</h2>
          <div className="mt-7">
            <div className="my-5 w-full">
              <h3>Username</h3>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-[100%] p-1 rounded-md mt-1 border-none bg-blue-50 border-green-300 text-black"
              />
            </div>
            <div className="my-5 w-full">
              <h3>Email</h3>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[100%] p-1 rounded-md mt-1 text-black bg-blue-50"
              />
            </div>
            <div className="my-5">
              <h3>Password</h3>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[100%] p-1 rounded-md mt-1 text-black bg-blue-50"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleSignUp}
              className="bg-white p-2 rounded-xl mt-3 mx-auto w-[100%] text-black hover:bg-blue-100 "
            >
              Create Account
            </button>
            {/* <h2 className="text-center">
              Already have an account? <span className="text-blue-800 underline">Log in</span>
            </h2> */}
          </div>
        </div>
      </div>
      <div className="w-[60%] signIn"></div>
    </div>
  )
}

export default SignIn
