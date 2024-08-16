import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import Reddit from '../util/Reddit';
import { act } from 'react';
const redditSlice = createSlice({
    name: 'reddit', //Name of slice
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false,
        subReddit:'/r/home/'
    }, //Initial state of slice
    reducers: {
      updateSubreddit: (state, action) =>{
        state.subReddit = action.payload
      },
      updatePost: (state, action)=>{
        state.posts =action.payload
      },
      updateComment: (state, action)=>{
        state.posts[action.payload.arg3].comments=action.payload.comments
      }
    },
    
})
export const fetchPost= createAsyncThunk(
  'post/fetchPostBySubreddit', // action type
  async (arg, thunkAPI) => { // payload creator
    const response = await Reddit.home(arg);
    thunkAPI.dispatch(updatePost(response.data.children.map((post)=>({
      ...post, 
      comments:[],
      showComment: false
    }))))
  }
)
export const fetchComment = createAsyncThunk(
  'comment/fetCommentbyArticle',
  async ({arg1, arg2, arg3}, thunkAPI)=>{
    const response = await Reddit.getComment(arg1, arg2);
    const comments = response[1].data.children.map(comment => comment.data);
    thunkAPI.dispatch(updateComment({arg3, comments}))
  }
)
export const { updateSubreddit, updatePost, updateComment} = redditSlice.actions
export const selectSubredditState =(state)=> state.reddit.subReddit
export const selectPostState=(state)=>state.reddit.posts
export default redditSlice.reducer