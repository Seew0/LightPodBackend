import React, { useState } from 'react'
import { supabase } from '../SupabaseClient'
// import { supabase } from '../SupabaseClient' // Import the Supabase client
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try{
      console.log(username," ",email);
      
      const res = await axios.post('http://localhost:5050/api/user/register',{email,username});
      const userId = res.data.userId;
      console.log("succesful");
      
      sessionStorage.setItem("userId",userId);
      navigate('/land');
    }
    catch(e){
      console.log(e);
      
    }
  }

  return (
    <div className="flex h-[100vh] ">
      {/* <Navbar /> */}
      <div className="w-[55%] h-[100vh] signIn "></div>
      <div className="w-[45%] flex flex-col items-center justify-center bg-blue-500">
        <div className=" p-7  w-[70%] rounded-2xl bg-blue-500 text-white">
          <div className="text-center">
            <h1 className="text-4xl mb-2 font-bold ">
              Create your account
            </h1>
            <h2 className="text-gray-100 font-medium">
              Sign up for more advanced features
            </h2>
          </div>
          <div className="mt-7">
            <div className="my-5 w-full">
              <h3>Username</h3>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-[100%] p-1 rounded-md mt-1 border-none   text-black"
              />
            </div>
            <div className="my-5 w-full">
              <h3>Email</h3>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[100%] p-1 rounded-md mt-1 text-black "
              />
            </div>
            <div className="my-5">
              <h3>Password</h3>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[100%] p-1 rounded-md mt-1 text-black "
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleSignUp}
              className=" p-2 rounded-xl mt-3 mx-auto w-[100%] text-white bg-blue-950  "
            >
              Create Account
            </button>
            {/* <h2 className="text-center">
              Already have an account? <span className="text-blue-800 underline">Log in</span>
            </h2> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn
// import { useState, useEffect } from 'react'
//   import { createClient } from '@supabase/supabase-js'
//   import { Auth } from '@supabase/auth-ui-react'
//   import { ThemeSupa } from '@supabase/auth-ui-shared'

//   const supabase = createClient('https://nfdsxcxgfxlzwdwulhcp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mZHN4Y3hnZnhsendkd3VsaGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MDYxNjMsImV4cCI6MjA0MjQ4MjE2M30.PV53rvnXWpjMJYzZcUZ8nnjUy5p_Qel94EVXmCLXT_Q')
  
//   export default function App() {
//     const [session, setSession] = useState<any>(null)

//     useEffect(() => {
//       supabase.auth.getSession().then(({ data: { session } }) => {
//         setSession(session)
//       })

//       const {
//         data: { subscription },
//       } = supabase.auth.onAuthStateChange((_event, session) => {
//         setSession(session)
//       })

//       return () => subscription.unsubscribe()
//     }, [])

//     if (!session) {
//       return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
//     }
//     else {
//       return (<div>Logged in!</div>)
//     }
//   }