import axios from "../../utils/Axios";
import { loadmovie } from "../reducers/movieSlice";

export { removemovie } from "../reducers/movieSlice"; // Is line ka matlab hai ki humne ../reducers/movieSlice se removemovie liya and usse yahi se export bhi krr dia...Ye humne issiliye kiya qki Good Practice ye hoti hai ki kabhi bhi reducers ke path prr mat jao actions lene ke liye, actions wale folder mai hi action import kra kr export bhi krr do. Ye aachi practice hoti hai.

export const asyncloadmovies = (id) => async (dispatch, getState) => {

    try{
        const detail = await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`)
        const videos = await axios.get(`/movie/${id}/videos`)
        const watchprovider = await axios.get(`/movie/${id}/watch/providers`);

        let theultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data,
            videos: videos.data.results.find(m => m.type === "Trailer"), // Yaha humne .find method use kia hai qki hume videos mai bht saari videos mil rhi thi aur hume bas wahi movie cahiye thi jo ki trailer ho.
            watchprovider: watchprovider.data.results.IN,
        }

        dispatch(loadmovie(theultimatedetails));  // Yaha humne loadmovie action se theultimatedetails object pass krr dia.
        
        // console.log(theultimatedetails);
    } catch(err){
        console.log(err);
    }

};
