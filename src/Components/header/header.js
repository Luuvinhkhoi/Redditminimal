import React from "react";
import { FaReddit } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import './header.css'
export const Header = () => {
    return (
        <div className="header">
            <div className="logo-name">
                <FaReddit className="logo"></FaReddit>
                <p><span>Reddit</span>Minimal</p>
            </div>
            <div className="search">
                <div className="input-flex">
                    <input placeholder="Search"></input>
                </div>
                <button><CiSearch></CiSearch></button>
            </div>
        </div>
    )
}