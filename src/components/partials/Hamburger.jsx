import React, { useState } from "react";
import { Link } from "react-router-dom";

const Hamburger = () => {
  const [isOpen, setisOpen] = useState(false);

  const toggleMenu = () => {
    setisOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="text-zinc-400 sm:hidden pt-2">
        <i className="ri-menu-2-fill text-2xl"></i>
      </button>
      {isOpen && (
        <div className="absolute top-[5vh] left-0 z-10 sm:hidden">
          <div className="h-[95vh] w-[70vw] p-3 bg-[#1f1e24]">
            <h1>
              <i className=" text-[#6556CD] ri-tv-fill text-3xl mr-2"></i>
              <span className="text-3xl font-semibold text-zinc-400">CineStar</span>
            </h1>
            <nav className="flex flex-col gap-4 text-xl font-semibold text-zinc-400">
              <h1 className="text-2xl text-white font-semibold mt-8 mb-4">
                New Feeds
              </h1>
              <Link
                to="/trending"
                className="hover:bg-[#6556CD] hover:text-white p-2 rounded duration-300"
              >
                <i className="ri-fire-fill mr-2"></i>
                Trending
              </Link>
              <Link
                to="/popular"
                className="hover:bg-[#6556CD] hover:text-white p-2 rounded duration-300"
              >
                <i className="ri-sparkling-fill mr-2"></i>
                Poplular
              </Link>
              <Link
                to="/movie"
                className="hover:bg-[#6556CD] hover:text-white p-2 rounded duration-300"
              >
                <i className="ri-movie-2-fill mr-2"></i>
                Movies
              </Link>
              <Link
                to="/tv"
                className="hover:bg-[#6556CD] hover:text-white p-2 rounded duration-300"
              >
                <i className="ri-tv-2-fill mr-2"></i>
                TV Shows
              </Link>
              <Link
                to="/people"
                className="hover:bg-[#6556CD] hover:text-white p-2 rounded duration-300"
              >
                <i className="ri-group-fill mr-2"></i>
                Peoples
              </Link>
            </nav>
            <hr className="border-none h-[2px] bg-zinc-400 mt-3" />
            <nav className="flex flex-col gap-4 text-xl font-semibold text-zinc-400">
              <h1 className="text-2xl text-white font-semibold mt-8 mb-4 ">
                Information
              </h1>
              <Link className="hover:bg-[#6556CD] hover:text-white p-2 rounded duration-300">
                <i className="ri-information-2-fill mr-2"></i>
                About CineStar
              </Link>
              <Link className="hover:bg-[#6556CD] hover:text-white p-2 rounded duration-300">
                <i className="ri-phone-fill mr-2"></i>
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
