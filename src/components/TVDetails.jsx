import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loader from "./partials/Loader";
import HorizontalCards from "./partials/HorizontalCards";

const TvDetails = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation(); // watch trailer ke liye hume url cahiye hoga to useLocation ki help se hume wo url mil jayega

  const { id } = useParams();
  const dispatch = useDispatch();

  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(asyncloadtv(id));

    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative w-screen h-[150vh] sm:h-[120vh] md:h-[140vh] lg:h-[220vh]"
    >
      {/* Part 1 - Navigation */}
      <nav className="w-full py-[2%] text-zinc-400 flex gap-10 text-2xl">
        <h1>
          <Link
            onClick={() => navigate(-1)}
            className="text-4xl text-zinc-400 hover:text-[#6556CD] cursor-pointer duration-300 ri-arrow-left-s-line"
          ></Link>
        </h1>
        <a target="_blank" href={info.detail.homepage}>
          <i className="hover:text-[#6556CD] cursor-pointer duration-300  ri-external-link-fill"></i>
        </a>{" "}
        {/* We have used anchor tag here becoz hume yaha kisi doosre page prr redirect hona hai... */}
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="hover:text-[#6556CD] cursor-pointer duration-300  ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          className="hover:text-[#6556CD] cursor-pointer duration-300 "
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* Part 2 - Poster and Details */}

      <div className="w-full flex px-[1%] sm:px-[1%] md:px-[2%] lg:px-[15%]">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] object-cover h-[20vh] sm:h-[25vh] md:h-[30vh] lg:h-[50vh]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className=" content ml-[3%] pl-[2%] border-l-2 border-zinc-400">
          <h1 className="text-zinc-100 font-black text-xl sm:text-2xl md:text-3xl lg:text-6xl">
            {info.name ||
              info.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-sm ml-2 font-bold text-zinc-300 sm:text-sm md:text-sm lg:text-xl">
              ({info.detail.first_air_date.split("-")[0]})
            </small>{" "}
            {/* Yaha hume sirf year dikhana tha to humne pehle date ko split kara - se and fir year hume 0th index prr milega to wo pick kia. */}
          </h1>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-1 md:gap-1 lg:gap-5">
            <span className="text-white font-bold flex items-center justify-center p-6 rounded-full bg-[#6556CD] h-[2vh] w-[2vh] text-sm sm:h-[2vh] sm:w-[2vh] sm:text-sm md:h-[3vh] md:w-[3vh] md:text-lg lg:h-[5vh] lg:w-[5vh] lg:text-xl">
              {(info.detail.vote_average * 10).toFixed()}%
            </span>

            <h1 className="text-white font-semibold sm:border-l-2 border-zinc-400 sm:text-sm sm:px-1 px-1 md:text-lg md:px-1 lg:text-xl lg:px-3">
              {info.detail.first_air_date}
            </h1>

            <h1 className="text-white font-semibold sm:border-l-2 border-zinc-400 px-1 sm:text-sm sm:w-[35%] md:text-lg md:w-[35%] lg:text-xl lg:w-auto">
              {info.detail.genres.map((g) => g.name).join(", ")}
            </h1>

            {info.detail.runtime ? (
              <h1 className="text-white font-semibold sm:border-l-2 border-zinc-400 px-1 sm:text-sm md:text-lg lg:text-xl">
                {info.detail.runtime} min
              </h1>
            ) : (
              <h1 className="text-white sm:text-xl font-semibold sm:border-l-2 border-zinc-400 px-1 sm:px-3">
                Runtime Not Available
              </h1>
            )}
          </div>

          <h1 className="text-zinc-100 mt-2 text-xl font-semibold italic">
            {info.detail.tagline}
          </h1>

          <h1 className="text-zinc-100 mt-2 text-2xl font-semibold">
            Overview
          </h1>
          <p className="text-zinc-100 w-[95%] text-sm mb-5 sm:leading-5 sm:w-[95%] lg:w-[70%] md:leading-5 lg:leading-4">
            {info.detail.overview}
          </p>

          <Link
            to={`${pathname}/trailer`}
            className="p-3 bg-[#5d4bd371] mt-2 rounded-md text-white text-xl font-semibold cursor-pointer hover:bg-[#6556CD] duration-300"
          >
            Watch Trailer
          </Link>
        </div>
      </div>

      {/* Part 3 - Available on platform */}

      <div className="px-[1%] sm:px-[1%] md:px-[2%] lg:px-[15%]">
        <div className="w-[80%] ">
          <div className="mt-5">
            {info.watchprovider && info.watchprovider.flatrate && (
              <div className="mt-5 flex items-center gap-x-10">
                <h1 className="text-xl sm:text-2xl text-zinc-100 font-semibold">
                  Available on Platform
                </h1>
                {info.watchprovider.flatrate.map((f, i) => (
                  <img
                    title={f.provider_name} // is se hum jab bhi img prr hover karenge to hume provider name dikhega.
                    key={i}
                    className="object-cover rounded h-[3vh] w-[3vh] sm:h-[3vh] sm:w-[3vh] md:h-[4vh] md:w-[4vh] lg:h-[6vh] lg:w-[6vh]"
                    src={`https://image.tmdb.org/t/p/original/${f.logo_path}`}
                    alt=""
                  />
                ))}
              </div>
            )}

            {info.watchprovider && info.watchprovider.rent && (
              <div className="mt-5 flex items-center gap-x-10">
                <h1 className="text-xl sm:text-2xl text-zinc-100 font-semibold">
                  Available on Rent
                </h1>
                {info.watchprovider.rent.map((r, i) => (
                  <img
                    title={r.provider_name}
                    key={i}
                    className="object-cover rounded h-[3vh] w-[3vh] sm:h-[3vh] sm:w-[3vh] md:h-[4vh] md:w-[4vh] lg:h-[6vh] lg:w-[6vh]"
                    src={`https://image.tmdb.org/t/p/original/${r.logo_path}`}
                    alt=""
                  />
                ))}
              </div>
            )}

            {info.watchprovider && info.watchprovider.buy && (
              <div className="mt-5 flex items-center gap-x-10">
                <h1 className="text-xl sm:text-2xl text-zinc-100 font-semibold">
                  Available to Buy
                </h1>
                {info.watchprovider.buy.map((b, i) => (
                  <img
                    title={b.provider_name}
                    key={i}
                    className="object-cover rounded h-[3vh] w-[3vh] sm:h-[3vh] sm:w-[3vh] md:h-[4vh] md:w-[4vh] lg:h-[6vh] lg:w-[6vh]"
                    src={`https://image.tmdb.org/t/p/original/${b.logo_path}`}
                    alt=""
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Part 4 - Seasons*/}

      <div className="mt-[3%] px-[1%] sm:px-[1%] md:px-[2%] lg:px-[15%]">
        <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-400" />
        <h1 className="text-xl sm:text-3xl mb-5 text-zinc-100 font-bold ">Seasons</h1>

        <div className="w-[100%] flex gap-5 overflow-y-hidden mb-5 py-2">
          {info.detail.seasons.length > 0 ? info.detail.seasons.map((s, i) => {
            return (
              <div key={i} className="flex flex-col items-center bg-zinc-400 rounded-lg overflow-hidden min-w-[30%] sm:min-w-[30%] md:min-w-[35%] lg:min-w-[14vw]">
                <img
                  className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]  w-full object-cover h-[20vh] sm:h-[20vh] md:h-[25vh] lg:h-[45vh]"
                  src={`https://image.tmdb.org/t/p/original/${
                    s.poster_path ||
                    s.backdrop_path ||
                    s.profile_path
                  }`}
                  alt=""
                />

                <h1 className="mt-3 mb-2 text-2xl text-zinc-300 font-semibold">
                  {s.name ||
                    s.title ||
                    s.original_name ||
                    s.original_title}
                </h1>
              </div>
            );
          }) : <h1 className="text-3xl text-zinc-100 font-bold text-center mt-5">Nothing to show</h1>}
        </div>
      </div>

      {/* Part 5 - Recommendations and similar stuff*/}

      <div className="mt-[3%] sm:px-[1%] md:px-[2%] lg:px-[15%]">
        <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-400" />
        <h1 className="text-xl sm:text-3xl mb-5 text-zinc-100 font-bold ">
          Recommendations & Similar TV Shows
        </h1>

        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      </div>

      <Outlet />
    </div>
  ) : (
    <Loader />
  );
};

export default TvDetails;
