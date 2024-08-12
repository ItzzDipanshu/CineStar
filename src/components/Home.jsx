import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/Axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loader from "./partials/Loader"
import Hamburger from "./partials/Hamburger";


const Home = () => {
  document.title = "CineStar | Homepage"; // ye jab bhi humara homepage khulega to ye title dikhne lagg jayega purane title ki jagah.

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  // Hum yaha prr hi data manga rahe hai qki partials mai data rakhna sahi hi rehta(bad practice hoti).

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");

      // console.log(data.results);

      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()]; // yaha hume 20 elements mil rhe thee array mai and hume ek cahiye tha...too humne Math.random ka use kia and toFixed issiliye use kia qki Math.random se value decimal mai milti hai to toFixed hume perfect number deta hai. Fir jo bhi number aayega, data.result se wo wala element randomData mai save ho jayega and wo fir humne setWallpaper mai send krke wallpaper ki value de di.
      setWallpaper(randomData); // Jab humne useState mai ek blank array rakha tha([]) to humara code issiliye nhi chal rha tha qki random data mai ek object aa rha tha na ki array.
    } catch (error) {
      console.error(error);
    }
  };
  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);

      // console.log(data.results);

      setTrending(data.results);
      // console.log(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallpaper(); // is line ka matlab hai ki - aagar wallpaper nhi hai, tabhi call krna GetHeaderWallpaper fuction ko.

    GetTrending(); // jab jab category change hogi tab tab humara GetTrending call hoga.
  }, [category]);

  return wallpaper && trending ? ( // is line ka matlab hai ki aagar wallpaper aa gya hai and trending bhi aa gyi hai to hi return krna...warna false wali statement return krna.
    <>
      <Sidenav />
      <Hamburger />
      <div className=" h-full overflow-auto overflow-x-hidden pr-[5%] w-[100%] sm:w-[70%] md:w-[70%] lg:w-[80%]">
        <Topnav />
        <Header data={wallpaper} />

        <div className="my-5 px-1 flex justify-between items-center">
          <h1 className="text-zinc-400 text-3xl font-semibold ">Trending</h1>

          <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e)=>setCategory(e.target.value)} />
            {/* dropdown se jo bhi value aayegi us se category ki value change hogi */}
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Home;
