import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import Reddit from '../util/Reddit';
import { act } from 'react';
import { FaAsymmetrik } from 'react-icons/fa';
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
      },
      renderComment:(state, action)=>{
        state.posts[action.payload.arg3].showComment=!state.posts[action.payload.arg3].showComment
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
    thunkAPI.dispatch(updateComment({arg3, comments}));
    thunkAPI.dispatch(renderComment({arg3}))
  }
)
export const search = createAsyncThunk(
  'search/searchArticle',
  async({arg1, arg2}, thunkAPI)=>{
    const response = await Reddit.search(arg1, arg2);
    thunkAPI.dispatch(updatePost(response.data.children.map((post)=>({
      ...post, 
      comments:[],
      showComment: false
    }))))
  }
)

export const { updateSubreddit, updatePost, updateComment, renderComment} = redditSlice.actions
export const selectSubredditState =(state)=> state.reddit.subReddit
export const selectPostState=(state)=>state.reddit.posts
export default redditSlice.reducer