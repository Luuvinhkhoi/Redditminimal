import { useState, useEffect } from 'react';
import './App.css';
import { Header } from '../Components/header/header';
import { Main } from '../Components/main/main';
import Reddit from '../util/Reddit';
import { selectSubredditState,selectPostState} from "../Store/redditSlice";
import { useSelector } from "react-redux";
import { fetchPost } from '../Store/redditSlice';
import { useDispatch } from 'react-redux';
function App() {
  const dispatch=useDispatch()
  const [subreddit, setSubreddit] = useState({})
  let selectSubreddit=useSelector(selectSubredditState)
  console.log(selectSubreddit)
  let selectPost=useSelector(selectPostState)
  console.log(selectPost)
  selectSubreddit.toLowerCase()
  useEffect(()=>{
    async function getPosts(){
      console.log('hi')
      dispatch(fetchPost(selectSubreddit))
    }
    async function getSubReddit() {
      console.log('2')
      await Reddit.fetchSubReddit().then(result=>{setSubreddit(prev=>({
        ...prev,
        result
      }))})
    }
    getPosts()
    getSubReddit()
  }, [selectSubreddit])
  return (
    <div className='app'>
      <Header></Header>
      <Main home={selectPost} subreddit={subreddit} selectSubreddit={selectSubreddit}></Main>
    </div>
  );
}

export default App;
