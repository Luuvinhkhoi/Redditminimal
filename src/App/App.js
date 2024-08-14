import { useState, useEffect } from 'react';
import './App.css';
import { Header } from '../Components/header/header';
import { Main } from '../Components/main/main';
import Reddit from '../util/Reddit';
function App() {
  const [home, setHome]= useState({})
  const [subreddit, setSubreddit] = useState({})
  useEffect(()=>{
    async function getPopular(){
      console.log('hi')
      await Reddit.home().then(result => {setHome(prev=>({
        ...prev,
        result
      }))})
    }
    async function getSubReddit() {
      console.log('2')
      await Reddit.fetchSubReddit().then(result=>{setSubreddit(prev=>({
        ...prev,
        result
      }))})
    }
    getPopular()
    getSubReddit()
  }, [])
  return (
    <div className='app'>
      <Header></Header>
      <Main home={home} subreddit={subreddit}></Main>
    </div>
  );
}

export default App;
