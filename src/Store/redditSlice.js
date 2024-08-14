import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import Reddit from '../util/Reddit';
const redditSlice = createSlice({
    name: 'reddit', //Name of slice
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false,
    }, //Initial state of slice
    reducers: {
    },
    extraReducers:{
      [Reddit.home().pending]: (state, action) =>{
        state.isLoading = true;
        state.hasError = false;
      },
      [Reddit.home().fulfilled]: (state, action) =>{
        state.isLoading = false;
        state.hasError = false;
        state.recipes = action.payload;
      },
      [Reddit.home().rejected]: (state, action) => {
        // fill out function body
        state.isLoading = false;
        state.hasError = true;  
      }
    }
})