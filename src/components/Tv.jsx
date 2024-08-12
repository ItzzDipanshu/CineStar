import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import Topnav from "./partials/Topnav";
import axios from "../utils/Axios";
import Cards from "./partials/Cards";
import Loader from "./partials/Loader";
import Dropdown from "./partials/Dropdown";


const Tv = () => {

  document.title = "CineStar | Tv Shows";

  const navigate = useNavigate();
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState("airing_today");

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        setPage((page) => page + 1);
        setTv((prev) => [...prev, ...data.results]);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      GetTv();
    } else {
      setPage(1);
      setTv([]);
      GetTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  },[category]);

  return tv.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-start">
        <div className="flex items-center justify-start gap-5">
          <h1>
            <i
              onClick={() => navigate(-1)}
              className="text-4xl text-zinc-400 hover:text-[#6556CD] cursor-pointer duration-300 ri-arrow-left-s-line"
            ></i>
          </h1>
          <h1 className="text-2xl font-semibold text-zinc-400">TV Shows</h1>
        </div>
        <div className="w-[80%] mb-5 sm:mb-0 flex items-center">
          <Topnav />
          <Dropdown
            title="Category"
            options={["on_the_air", "top_rated", "popular", "airing_today"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
    //  Below are some attributes necessary for infinite scrolling.
        dataLength={tv.length}
        next={GetTv} // page khatam hone ke baad next kya show krna hai uske liye kaam aata

        hasMore={hasMore} 
        loader={<h1>Loading...</h1>} // jab tak data render nhi ho tab tak ye dikhao
      > {/* For applyig infinite scroll on the page and since we want to apply it on Cards wo we wrap card in it.*/}
        <Cards data={tv} title="tv" />
      </InfiniteScroll>

    </div>
  ) : (
    <Loader />
  );
};
export default Tv;