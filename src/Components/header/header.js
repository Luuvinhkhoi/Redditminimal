import React, {useState} from "react";
import { FaReddit } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { search } from "../../Store/redditSlice";
import './header.css'
export const Header = ({selectSubreddit}) => {
    const [state, setState]=useState('')
    const dispatch=useDispatch();
    const handleTermChange=(e)=>{
      setState(prev=> prev=e.target.value)
    }
    const handleSubmit = (event) =>{
        console.log(selectSubreddit)
        console.log(state)
        event.preventDefault()
        dispatch(search({arg1:selectSubreddit,arg2:state}))
    }
    return (
        <div className="header">
            <div className="logo-name">
                <FaReddit className="logo"></FaReddit>
                <p><span>Reddit</span>Minimal</p>
            </div>
            <form className="search" onSubmit={handleSubmit}>
                <div className="input-flex">
                    <input placeholder="Search" onChange={handleTermChange}></input>
                </div>
                <button><CiSearch></CiSearch></button>
            </form>
        </div>
    )
}