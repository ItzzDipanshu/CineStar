import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: null,

}

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
      loadpeople: (state, action) => {
        state.info = action.payload;
      },
      removepeople: (state, action) => {
        state.info = null;
      }
    },
  })

  export const { loadpeople, removepeople } = peopleSlice.actions
  
  export default peopleSlice.reducer