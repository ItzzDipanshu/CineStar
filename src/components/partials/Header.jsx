import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  // console.log(data);
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full bg-red-100 flex flex-col justify-end items-start p-[1%] h-[60vh] sm:p-[3%] sm:h-[58vh] md:h-[55vh] lg:h-[50vh]"
    >
      <h1 className=" text-white font-black text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
        {data.name ||
          data.title ||
          data.original_name ||
          satisfies.original_title}
      </h1>
      <p className="text-sm text-white mt-3 font-semibold w-[100%] sm:text-lg sm:font-normal sm:w-[90%] md:font-normal md:w-[90%] lg:font-semibold lg:w-[70%]">
        {data.overview.slice(0, 200)} ...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-[#6556CD]">more</Link>
      </p>
      {/* yaha humne humare overview ko slice krr dia 0 se 200 words tak...ab humne jo bhi overview dikhega...hume 0 se 200 words tak hi dikhega...baaki ka slice ho jayega. */}

      <div className="text-white mt-3 flex gap-5 sm:flex-col sm:gap-3">
        <div>
          <i className="text-[#6556CD] text-xl ri-megaphone-fill"></i> {" "}
          {data.release_date || "No Information"} {/* aagar release date hai to date dikhao ya fir No Information dikhao */}
        </div>

        <div>
          <i className="text-[#6556CD] text-xl ri-album-fill"></i> {" "}
          {data.media_type.toUpperCase()}
        </div>
      </div>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="p-3 bg-[#6656cd50] mt-2 rounded-md text-white text-xl font-semibold cursor-pointer hover:bg-[#6556CD] duration-300">Watch Trailer</Link>
    </div>
  );
};

export default Header;
