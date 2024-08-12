import React from "react";
import { Link } from "react-router-dom";
import noImage from "/noImage.webp";

const HorizontalCards = ({ data }) => {
  // console.log(data);

  return (
    <div className="w-[100%] overflow-x-auto p-1 flex gap-5 mb-5">
      {data.length > 0 ? data.map((item, i) => (
        <Link to={`/${item.media_type}/details/${item.id}`}
          key={i}
          className="rounded-md bg-zinc-400 text-[#1F1E24] overflow-hidden mb-3 min-w-[45%] sm:min-w-[40%] sm:h-[25vh] md:min-w-[45%] md:h-[25vh] lg:min-w-[20%] lg:h-[46vh]"
        >
          <img
            className="w-full object-cover h-[50%]"
            src={
              item.backdrop_path || item.poster_path ? 
              `https://image.tmdb.org/t/p/original/${
              item.backdrop_path || item.poster_path
            }` : noImage}
            alt=""
          />

          <div className="p-2 h-[45%] overflow-y-auto">
            <h1 className="text-xl font-bold">
              {item.title ||
                item.name ||
                item.original_title ||
                item.original_name}
            </h1>
            <p className="text-sm mt-3 font-semibold">
              {item.overview.slice(0, 80)} ...
              <span className="text-zinc-600">more</span>
            </p>
          </div>
        </Link>
      )) : <h1 className="text-3xl text-zinc-100 font-bold text-center mt-5">Nothing to show</h1>} {/* agar kisi movie mai recommendations nhi hai to ye dikhaega */}
    </div>
  );
};
export default HorizontalCards;
