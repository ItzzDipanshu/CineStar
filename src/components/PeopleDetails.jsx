import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadpeople, removepeople } from "../store/actions/peopleActions";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loader from "./partials/Loader";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";

const PeopleDetails = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation(); // watch trailer ke liye hume url cahiye hoga to useLocation ki help se hume wo url mil jayega

  const { id } = useParams();
  const dispatch = useDispatch();

  const [category, setCategory] = useState("movie");

  const { info } = useSelector((state) => state.people);

  useEffect(() => {
    dispatch(asyncloadpeople(id));

    return () => {
      dispatch(removepeople());
    };
  }, [id]);

  return info ? (
    <div className="px-[2%] w-screen h-[130vh] sm:h-[150vh] bg-[#1f1e24] flex flex-col">
      {/* Part 1 */}

      <nav className="w-full h-[5vh]  text-zinc-400">
        <h1>
          <Link
            onClick={() => navigate(-1)}
            className="text-4xl text-zinc-400 hover:text-[#6556CD] cursor-pointer duration-300 ri-arrow-left-s-line"
          ></Link>
        </h1>
      </nav>

      <div className="w-full flex px-[1%] sm:pl-[1%] md:pl-[2%] lg:pl-[10%]">
        {/* Part 2 - Left Poster and Details */}
        <div className="w-[25%] sm:w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-full object-cover h-[18vh] sm:h-[18vh] md:h-[20vh] lg:h-[50vh]"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-400" />

          {/* Social Media Links */}

          <div className="text-zinc-200 flex gap-3 text-lg sm:gap-5 sm:text-lg md:text-xl lg:text-2xl">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="hover:text-[#6556CD] cursor-pointer duration-300  ri-earth-fill">
                {" "}
              </i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="hover:text-[#6556CD] cursor-pointer duration-300  ri-facebook-fill">
                {" "}
              </i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="hover:text-[#6556CD] cursor-pointer duration-300  ri-instagram-fill">
                {" "}
              </i>
            </a>
            <a
              target="_blank"
              href={`https://x.com/${info.externalid.twitter_id}`}
            >
              <i className="hover:text-[#6556CD] cursor-pointer duration-300  ri-twitter-x-fill">
                {" "}
              </i>
            </a>
          </div>

          {/* Personal Information */}

          <div>
            <h1 className="text-2xl font-bold text-zinc-400 my-3">
              Personal Info
            </h1>

            <h1 className="text-lg text-zinc-400 mt-3">Known For</h1>
            <h1 className="text-zinc-400">
              {info.detail.known_for_department}
            </h1>

            <h1 className="text-lg text-zinc-400 mt-3">Gender</h1>
            <h1 className="text-zinc-400">
              {info.detail.gender === 2 ? "Male" : "Female"}
            </h1>

            <h1 className="text-lg text-zinc-400 mt-3">Birthday</h1>
            <h1 className="text-zinc-400">{info.detail.birthday}</h1>

            <h1 className="text-lg text-zinc-400 mt-3">Deathday</h1>
            <h1 className="text-zinc-400">
              {info.detail.deathday ? info.detail.deathday : "Still Alive"}
            </h1>

            <h1 className="text-lg text-zinc-400 mt-3">Birth Place</h1>
            <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>
          </div>
        </div>

        {/* Part 3 - right - Details and info*/}

        <div className="w-[70%] sm:w-[75%] ml-[4%]">
          <h1 className="font-black text-zinc-400 my-3 sm:text-4xl md:text-6xl">
            {info.detail.name}
          </h1>

          <h1 className="text-xl text-zinc-400 mt-3">Biography</h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>
          <h1 className="mt-5 text-lg text-zinc-400 ">Famous casts</h1>
          <HorizontalCards data={info.combinedcredits.cast} />

          <div className="w-full flex justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="text-zinc-400 list-discw-full overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,0.2)] border-zinc-700 p-5 h-[25vh] sm:h-[35vh] md:h-[25vh] lg:h-[50vh]">
            {info[category + "credits"].cast.map((c, i) => (
              <li key={i} className="hover:text-white duration-300 cursor-pointer mb-5 text-xl">
                <Link className="">
                  <span className="font-bold">
                    Movie Name - 
                    {c.name ||
                      c.title ||
                      c.original_name ||
                      c.detail.original_title}
                  </span>
                  <span className="block pl-7">{c.character && `Character Name - ${c.character}`}</span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default PeopleDetails;
