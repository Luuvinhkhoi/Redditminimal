import React, {useState} from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import './main.css'
import { Comment } from "../Comment/comment";
import moment from "moment";
import {useDispatch} from 'react-redux'
import { fetchComment, updateSubreddit } from "../../Store/redditSlice";
export const Main = ({home, subreddit, selectSubreddit}) => {
    console.log(home)
    console.log(subreddit)
    const dispatch = useDispatch();
    if (!home || !subreddit.result) {
        return <div>Loading...</div>; // Hiển thị loading khi dữ liệu chưa có
    }
    function handleClick(subRedditName){
        dispatch(updateSubreddit(subRedditName))
    }
    function commentClick(id, index){
        dispatch(fetchComment({arg1:selectSubreddit,arg2:id, arg3: index}))
    }
    function choose (article) {
            if (article.data.is_video){
              return <video controls>
                        <source src={article.data.secure_media.reddit_video.fallback_url} type="video/mp4" />
                     </video>
            } else if (article.data.post_hint === "link"){
               return <a href={article.data.url}target="_blank">
                  <img src = {article.data.thumbnail}></img>
                  {article.data.title}
               </a>
            } else if (article.data.post_hint === 'image') {
               return <img src={article.data.url} controls />
            }
    }
    function chooseimg(article){
        if (article.data.icon_img===''){
           return <img src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://reddit.com&size=16"></img>
        } else {
            return <img src={article.data.icon_img} alt={article.data.title}></img>
        }
    }
    function renderComment(){
        
    }
    return (
        <div className="main">
           <section>
                {home.map((article, index)=>
                    <article key={article.data.id}>
                        <div className="main-content">
                            <div className="container">
                                <div className="vote">
                                    <FaArrowUp></FaArrowUp>
                                    <p>{article.data.score}</p>
                                    <FaArrowDown></FaArrowDown>
                                    </div>
                                <div className="post-content">
                                    <h3>{article.data.title}</h3>
                                    <div className="post-image">
                                        {choose(article)}
                                    </div>
                                    <div className="post-detail">
                                        <div className="author-detail">
                                            <img></img>
                                            <p>{article.data.author}</p>
                                        </div>
                                        <div className="time">
                                            <p>{moment.unix(article.data.created).fromNow()}</p>
                                        </div>
                                        <div className="comment" onClick={()=>commentClick((article.data.id), index)}>
                                            <FaRegCommentAlt></FaRegCommentAlt>
                                            <p>{article.data.num_comments} comments</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                )} 
           </section> 
           <div className="subreddit">
              <div className="subreddit-content">
                <h2>Subreddits</h2>
                <div className="list">
                    {subreddit.result.data.children.map(article=>
                        <div className="list-content" key={article.data.id} onClick={()=>handleClick(article.data.url)} >
                            {chooseimg(article)}
                            <p>{article.data.title}</p>
                        </div>
                    )}
                </div>
              </div>
           </div>
        </div>
    )
}