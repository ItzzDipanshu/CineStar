import axios from "../../utils/Axios";
import { loadtv } from "../reducers/tvSlice";

export { removetv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getState) => {

    try{
        const detail = await axios.get(`/tv/${id}`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`)
        const videos = await axios.get(`/tv/${id}/videos`)
        const watchprovider = await axios.get(`/tv/${id}/watch/providers`);

        let theultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data,
            videos: videos.data.results.find(t => t.type === "Trailer"),
            watchprovider: watchprovider.data.results.IN,
        }

        dispatch(loadtv(theultimatedetails));
    } catch(err){
        console.log(err);
    }

};
