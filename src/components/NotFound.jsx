import React from "react"

import notfound from "/notFound.mp4"
import { Link, useNavigate } from "react-router-dom"

const NotFound = ()=>{
    const navigate = useNavigate();
    return(
        <div className="w-screen h-screen flex justify-center items-center bg-black absolute top-0 left-0">
            <video autoPlay loop muted  src={notfound}></video>
            <Link onClick={()=>navigate(-1)}
                  className=" absolute top-[5%] right-[5%] ri-close-fill text-4xl text-zinc-100 hover:text-[#6556CD] duration-300"
            
            >
                
            
            </Link>
        </div>
    )
}

export default NotFound;