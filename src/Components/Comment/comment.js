import React from "react";
import './comment.css'
import moment from "moment";
import {useDispatch} from 'react-redux'
import { fetchComment, updateSubreddit } from "../../Store/redditSlice";
export const Comment = ({comments}) => {
    console.log(comments)
    return (
        comments.map((comment)=>
            <div className="comment">
                <div className="comment-detail">
                    <div className="comment-author">
                        {comment.author}
                    </div>
                    <div className="comment-time">
                        {moment.unix(comment.created).fromNow()}
                    </div>
                </div>
                <div className="comment-body">
                    {comment.body}
                </div>
            </div>
        )
    )
}