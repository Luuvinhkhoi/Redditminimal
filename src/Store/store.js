import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
    reducer: {
      reddit: redditReducer,
      subreddits: subRedditReducer,
    }
})