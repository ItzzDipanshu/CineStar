import axios from "../../utils/Axios";
import { loadpeople } from "../reducers/peopleSlice";

export { removepeople } from "../reducers/peopleSlice"; // Is line ka matlab hai ki humne ../reducers/movieSlice se removemovie liya and usse yahi se export bhi krr dia...Ye humne issiliye kiya qki Good Practice ye hoti hai ki kabhi bhi reducers ke path prr mat jao actions lene ke liye, actions wale folder mai hi action import kra kr export bhi krr do. Ye aachi practice hoti hai.

export const asyncloadpeople = (id) => async (dispatch, getState) => {

    try{
        const detail = await axios.get(`/person/${id}`);
        const externalid = await axios.get(`/person/${id}/external_ids`);
        const combinedcredits = await axios.get(`/person/${id}/combined_credits`);
        const tvcredits = await axios.get(`/person/${id}/tv_credits`);
        const moviecredits = await axios.get(`/person/${id}/movie_credits`);

        let theultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            combinedcredits: combinedcredits.data,
            tvcredits: tvcredits.data,
            moviecredits: moviecredits.data,

        }

        dispatch(loadpeople(theultimatedetails));  // Yaha humne loadmovie action se theultimatedetails object pass krr dia.
        
        // console.log(theultimatedetails);
    } catch(err){
        console.log(err);
    }

};
