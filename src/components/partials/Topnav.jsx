import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../../utils/Axios";

import noImage from "/noImage.jpg";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
      //   console.log(searches);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  //   console.log(query);
  return (
    <div
      className="w-full relative flex justify-start items-center gap-3 pl-[10%] h-[5vh] sm:h-[5vh] sm:pl-[10%] md:h-[5vh] md:pl-[10%] lg:h-[10vh] lg:pl-[20%]"
    >
      <i className="ri-search-line text-xl sm:text-3xl text-zinc-400"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[40%] text-xl outline-none border-none bg-transparent text-zinc-200"
        type="text"
        placeholder="search here"
      />

      {
        // aagar query ki length 0 se badi hai...tabhi cross ko dikhao.
        query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="ri-close-fill text-3xl text-zinc-400 cursor-pointer"
          ></i>
        )
      }

      <div className="bg-zinc-200 absolute top-[85%] overflow-auto max-h-[35vh] w-[65vw] sm:w-[90%] sm:max-h-[35vh] md:w-[80%] md:max-h-[35vh] lg:w-[45%] lg:max-h-[55vh] z-10">
        {/* Humne yaha max height issiliye di hai qki jab isme koi bhi element nhi hoga to ye nhi dikhega aur jaise ji koi element aayega to ye utni height le lega and maximum height 55vh tak ruk jayega*/}
        {searches.map((search, index) => (
          <Link to={`/${search.media_type}/details/${search.id}`}
            key={index}
            className="w-[100%] border-b-2 border-zinc-400 p-8 flex justify-start items-center hover:bg-zinc-500 hover:text-zinc-200 font-semibold duration-300"
          >
            <img
              className="h-[6vh] w-[6vh] mr-2 object-cover rounded shadow-lg sm:mr-3 sm:h-[10vh] sm:w-[10vh]"
              src={
                search.backdrop_path ||
                search.profile_path ? `https://image.tmdb.org/t/p/original/${
                search.backdrop_path || search.profile_path
              }` : noImage}
              alt=""
            />
            {/* yaha prr jab humne internet prr search kia ki TMDB api image path link to pehli website prr hume jo link mili usme original/ tak ka part same tha and fir uske aage ka part hume humare search ke backdrop_path mai mil rha tha ya fir profile_path prr*/}
            <span>{search.name || search.title || search.original_title}</span>{" "}
            {/* humare paas naam kisi mai name mai aa rha hai ya fir kisi mai title mai aa rha hai ya fir kisi mai original_title mai aa rha hai...issiliye humne aisa kia */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
