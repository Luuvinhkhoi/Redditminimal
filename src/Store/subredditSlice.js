import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import Reddit from '../util/Reddit';
const subRedditSlice = createSlice({
    name: 'subReddit', //Name of slice
    initialState: {
        subReddit: [],
        isLoading: false,
        hasError: false,
    }, //Initial state of slice
    reducers: {
      getSubreddit: (state, action) =>{
        return state.subReddit = action.payload
      }
    },
})
export const { getSubreddit } = subRedditSlice.actions
export default subRedditSlice.reducer