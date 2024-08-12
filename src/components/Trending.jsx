import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/Axios";
import Cards from "./partials/Cards";
import Loader from "./partials/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {

  document.title = "CineStart | Trending";

  const navigate = useNavigate();

  const [duration, setDuration] = useState("day");
  const [category, setCategory] = useState("all");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

    //  setTrending(data.results);
    // console.log(data.results.length);

    if(data.results.length > 0){
            setPage(page=>page+1);
            setTrending((prev)=>[...prev, ...data.results])//infinite scroll ke liye humne kya kia na ki jo bhi humare paas data tha usme hum aur data add krte gaye.

        }else{
            setHasMore(false);
        }

    } catch (err) {
      console.error(err);
    }
  };

  const refreshHandler = ()=>{
    if(trending.length === 0){
        GetTrending();
    }else{
        setPage(1);
        setTrending([]);
        GetTrending();
    }
  }

  useEffect(() => {
    // GetTrending();
    refreshHandler();
  }, [duration, category]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-start gap-5">
          <h1>
            <i
              onClick={() => navigate(-1)}
              className="text-4xl text-zinc-400 hover:text-[#6556CD] cursor-pointer duration-300 ri-arrow-left-s-line"
            ></i>
          </h1>
          <h1 className="text-2xl font-semibold text-zinc-400">Trending</h1>
        </div>
        <div className="w-[100%] mb-5 sm:mb-0 sm:w-[80%] flex items-center">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
    //  Below are some attributes necessary for infinite scrolling.
        dataLength={trending.length}
        next={GetTrending} // page khatam hone ke baad next kya show krna hai uske liye kaam aata

        hasMore={hasMore} 
        loader={<h1>Loading...</h1>} // jab tak data render nhi ho tab tak ye dikhao
      > {/* For applyig infinite scroll on the page and since we want to apply it on Cards wo we wrap card in it.*/}
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Trending;
