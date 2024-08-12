import React from "react";
import { Link } from "react-router-dom";
import noImage from "/noImage.jpg";

const Cards = ({ data, title }) => {
  return (
    <div className="px-[3%] w-full flex flex-wrap gap-8 bg-[#1f1e24]">
      {data.map((item, i) => (
        <Link to={`/${item.media_type || title}/details/${item.id}`}className="w-[10vh] text-zinc-400 text-xl font-semibold text-center rounded-md overflow-hidden sm:w-[10vh] md:w-[12vh] lg:w-[25vh]" key={i}> {/* Jab hum cards pr click karenge to hi hume MovieDetails/PeopleDetails/TVDetail prr jaana hai issiliye humne is link ko ye path de rhe(to="" mai)...yaha humare paas kisi mai to media_type hai aur kisi mai nhi hai, issiliye humne uppar likha hai ki aagar media_type hai to item.media_type chala do warna title chala do. Title mai hum jaha bhi cards use krr rhe hai waha value bhej rhe hai. */}

            <img className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[15vh] object-cover sm:h-[15vh] md:h-[20vh] lg:h-[40vh]" src={
              item.poster_path || item.backdrop_path || item.profile_path ?
              `https://image.tmdb.org/t/p/original/${item.poster_path || item.backdrop_path || item.profile_path}` : noImage} alt="" />

            <h1 className="mt-3 text-sm sm:text-sm md:text-lg">
            {item.name || item.title || item.original_name || item.original_title}
            </h1>


            {item.vote_average && (<h1 className="text-xs text-zinc-500">Rating - {(item.vote_average*10).toFixed()}%</h1>)}

            
        </Link>
      ))}
    </div>
  );
};
export default Cards;
