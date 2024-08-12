import React from "react";
import { Link } from "react-router-dom";


const Sidenav = () => {
  return (
    <div className="h-full border-r-2 border-zinc-400 p-6 text-white font-bold hidden sm:block sm:w-[30%] md:w-[30%] lg:w-[20%]">
      <h1>
        <i className=" text-[#6556CD] ri-tv-fill text-3xl mr-2"></i>
        <span className="text-3xl sm:text-2xl md:text-3xl">CineStar</span>
      </h1>
      <nav className="flex flex-col gap-4 text-xl font-semibold text-zinc-400"
      >
        <h1 className="text-2xl text-white font-semibold mt-8 mb-4 sm:text-xl md:text-2xl">New Feeds</h1>
        <Link to="/trending" className="hover:bg-[#6556CD] hover:text-white p-2 rounded duration-300">
        <i className="ri-fire-fill mr-2"></i>
        Trending</Link>
        <Link to="/popular" className="hover:bg-[#6556CD] hover:text-white p-2 rounded duration-300">
        <i className="ri-sparkling-fill mr-2"></i>
        Poplular</Link>
        <Link to="/movie" className="hover:bg-[#6556CD] hover:text-white p-2 rounded duration-300">
        <i className="ri-movie-2-fill mr-2"></i>
        Movies</Link>
        <Link to="/tv" className="hover:bg-[#6556CD] hover:text-white p-2 rounded duration-300">
        <i className="ri-tv-2-fill mr-2"></i>
        TV Shows</Link>
        <Link to="/people" className="hover:bg-[#6556CD] hover:text-white p-2 rounded duration-300">
        <i className="ri-group-fill mr-2"></i>
        Peoples</Link>
      </nav>
      <hr className="border-none h-[2px] bg-zinc-400 mt-3" />
      <nav className="flex flex-col gap-4 text-xl font-semibold text-zinc-400"
      >
        <h1 className="text-2xl text-white font-semibold mt-8 mb-4 sm:text-xl md:text-2xl">Information</h1>
        <Link className="hover:bg-[#6556CD] hover:text-white p-2 rounded duration-300">
        <i className="ri-information-2-fill mr-2"></i>
        About CineStar</Link>
        <Link className="hover:bg-[#6556CD] hover:text-white p-2 rounded duration-300">
        <i className="ri-phone-fill mr-2"></i>
        Contact Us</Link>
        
      </nav>
    </div>
  );
};
export default Sidenav;
