import React, { useState } from 'react'
import explore from "../assets/icons/explore.png"
import chrome from "../assets/icons/chrome.png"
import ubuntu from "../assets/icons/ubuntu.png"
import axios from 'axios'
import Lottie from 'react-lottie-player'
import loading from "../assets/animations/loading.json"
const animationData =  loading;
const NewContainer = () => {
  
  const [loading,setLoading] = useState(false)

  const storeLog = async(logId:string)=>{
    try{
      const res = axios.post("http://localhost:5050/api/logs/getLog",logId);
      console.log(res);
      
    }
    catch(err){
      console.log(err);
      
    }
  }

  const startContainer = async (userId: string, imageName: string, productId: string) => {
    setLoading(true);
    try {
      const res:any = await axios.post("http://localhost:5050/api/services/start-container", {
        userId,
        imageName,
        productId,
      });
      
      
      if (res) {
        storeLog(imageName);
        window.open(res, '_blank');
      } else {
        console.error("URL not found in response");
      }
    } catch (error) {
      console.error("Error starting container:", error);
    } finally {
      setLoading(false); // Hide loading animation
    }
  };
  return (
    <div className="relative">
      {loading && (
        <div className="w-[75vw] h-[80vh] absolute flex items-center justify-center">
          <h1 className="text-6xl text-white">
            <Lottie
              play
              animationData={animationData}
              className="w-[90%]"
            ></Lottie>
          </h1>
        </div>
      )}
      <div >
        <h1 className="text-4xl text-blue-950 font-bold">Welcome User</h1>
        <h2>Spin up your containers with just one simple click</h2>
        <div className="mt-7">
          <h1 className="text-2xl">Free Containers</h1>
          <div className="flex gap-3">
            <div
              className=" px-2 py-2 rounded-xl mt-3 flex justify-center text-center w-[150px] bg-blue-950 gap-2"
              onClick={() => startContainer("1", "kasmweb/chrome:1.16.0", "0")}
            >
              <img src={chrome} alt="" className="w-[25px]" />
              <h1 className="text-white">Chrome</h1>
            </div>
            <div
              className=" px-2 py-2 rounded-xl mt-3 flex justify-center text-center w-[150px] bg-blue-950 gap-2"
              onClick={() =>
                startContainer("2", "kasmweb/ubuntu-jammy-desktop:1.16.0", "1")
              }
            >
              <img src={ubuntu} alt="" className="w-[25px]" />
              <h1 className="text-white">Ubuntu</h1>
            </div>
          </div>
        </div>
        <div className="mt-7">
          <h1 className="text-2xl">Premium Containers</h1>
          <div className="flex gap-3">
            <div className=" px-2 py-2 rounded-xl mt-3 flex justify-center text-center w-[150px] bg-blue-950 gap-2">
              <img src={chrome} alt="" className="w-[25px]" />
              <h1 className="text-white">VS Code</h1>
            </div>
            <div className=" px-2 py-2 rounded-xl mt-3 flex justify-center text-center w-[150px] bg-blue-950 gap-2">
              <img src={ubuntu} alt="" className="w-[25px]" />
              <h1 className="text-white">Zoom</h1>
            </div>
            <div className=" px-2 py-2 rounded-xl mt-3 flex justify-center text-center w-[150px] bg-blue-950 gap-2">
              <img src={ubuntu} alt="" className="w-[25px]" />
              <h1 className="text-white">Atom</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewContainer