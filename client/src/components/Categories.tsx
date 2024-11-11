import React ,{useState} from 'react'
import add from "../assets/icons/plus.png"
import home from "../assets/icons/home.png"
import history from "../assets/icons/history.png"
import explore from "../assets/icons/explore.png"
import chrome from "../assets/icons/chrome.png"
import ubuntu from "../assets/icons/ubuntu.png"
import NewContainer from './NewContainer'
import Explore from './Explore'
import History from './History'
import { Link } from 'react-router-dom'

const Categories = () => {

  const [current,setCurrent] = useState<String>("new-container")

  // const [check , setCheck] = useState<Boolean>(false);

  // const startContainer = async((imageName:String,userId:String)=>{
  //     try{
  //       const response = axios.post("localhost:3000/services/start-container",{imageName:imageName,userId:userId,productId:"0"});
        
  //     }
  //     catch(e){
  //       console.log(e);
        
  //     }
  // });

  return (
    <div className="flex">
      <div className="w-[15%] h-[100vh] bg-blue-950 flex flex-col pl-5 pt-6">
        <h1 className="text-2xl font-bold text-white">LightPod</h1>
        <div className="flex flex-col gap-5 mt-10">
          <Link to="/">
            <div className="flex items-center gap-3 p-2 w-[90%] rounded-lg hover:bg-slate-400">
              <img src={home} alt="" className="w-[25px]" />
              <h1 className="text-white  font-medium">Home</h1>
            </div>
          </Link>
          <div
            className="flex items-center gap-3 p-2 w-[90%] rounded-lg hover:bg-slate-400 cursor-pointer"
            onClick={() => {
              setCurrent("new-container");
            }}
          >
            <img src={add} alt="" className="w-[25px]" />
            <h1 className="text-white  font-medium">New Container</h1>
          </div>
          <div
            className="flex items-center gap-3 p-2 w-[90%] rounded-lg hover:bg-slate-400 cursor-pointer"
            onClick={() => {
              setCurrent("history");
            }}
          >
            <img src={history} alt="" className="w-[25px]" />
            <h1 className="text-white  font-medium">Past Containers</h1>
          </div>
          <div
            className="flex items-center gap-3 p-2 w-[90%] rounded-lg hover:bg-slate-400 cursor-pointer"
            onClick={() => {
              setCurrent("explore");
            }}
          >
            <img src={explore} alt="" className="w-[25px]" />
            <h1 className="text-white  font-medium">Explore</h1>
          </div>
        </div>
      </div>
      <div className="w-[85%] flex pl-10 pt-5 ">
        {current === "new-container" && <NewContainer />}
        {current === "history" && <History />}
        {current === "explore" && <Explore />}
      </div>
    </div>
  );
}

export default Categories

// function async(arg0: (imageName: String, userId: String) => void) {
//   throw new Error('Function not implemented.');
// }
