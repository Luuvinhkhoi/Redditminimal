import { configureStore } from '@reduxjs/toolkit';
import redditReducer from './redditSlice'
import subRedditReducer from './subredditSlice'
export const store = configureStore({
    reducer: {
      reddit: redditReducer,
      subreddits: subRedditReducer,
    }
})