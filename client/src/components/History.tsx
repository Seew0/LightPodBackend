import React, { useEffect, useState } from 'react'
import Lottie from 'react-lottie-player'
import available from "../assets/animations/available.json"
import axios from 'axios';
const History = () => {
  const [logsList , setLogsLost] = useState<any>();
  const userId = sessionStorage.getItem("userId");
  const getContainerList = async()=>{
    try{
      const res = await axios.get("/getAllUserLogs", {
        headers: {
          // Replace this with the actual token you have from session/authentication
          Authorization: userId
          ,
        },
      });
      const data = res.data;
      setLogsLost((prev:any)=>[...prev,data])
    }
    catch(error){
      console.log(error);
      
    }
  }

  useEffect(()=>{
    getContainerList();
  },[])


  return (
    <div className="flex justify-center w-full">
      {logsList ? (
        <div>
           <h1 className='text-4xl font-bold text-center'>Check your previous used containers</h1>
          {logsList.map((data: any,index: any)=>{
            <div key={index}>
              <h1>  </h1>
            </div>
          })}
           <div>
            <h2></h2>
           </div>
          
        </div>
      ):(<div>
        <Lottie play animationData={available} className='w-[90%]'/>
        <h1 className='text-2xl text-center text-blue-950 font-bold'>No containers run yet</h1>
      </div>)}
      
    </div>
  );
}

export default History