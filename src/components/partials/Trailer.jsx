import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = ()=>{

    const navigate = useNavigate();

    const { pathname } = useLocation();

    const category = pathname.includes("movie") ? "movie" : "tv"; // humne ye line issiliye liki hai qki jab bhi hume path milega to ya to wo movie ka hoga ya fir tvshow ka to humne check kia hai ki aagar pathname mai movie include hai to movie bhej do category mai warna tv bhej do.

    // const ytvideo = useSelector(state=>state.movie.info.videos); 
    const ytvideo = useSelector(state=>state[category].info.videos); // suppose humare category mai movie aaya and wo category mai save hai to ye bhi ek tareeka hota hai(state[category]) state.movie likhne ka.
    console.log(ytvideo)



    return ytvideo ? (
        <div className="bg-[#000000be] z-[100] absolute top-0 left-0 w-screen h-screen flex items-center justify-center">

            <Link onClick={()=>navigate(-1)}
                  className=" absolute top-[5%] right-[5%] ri-close-fill text-4xl text-zinc-100 hover:text-[#6556CD] duration-300"
            
            >
                
            
            </Link>



            <ReactPlayer
            controls
            height="70%"
            width="70%"
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`} /> {/* yaha hume ytvideo mai ek object milega jisme bht saari values hogi prr hume sirf key cahiye qki is usl ke end mai key hi lagegi issiliye ytvideo.key likha */}

        </div>
    ) : <NotFound />
}

export default Trailer;