import React from 'react';
import { NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="text-white flex justify-center items-center w-full bg-blue-500 py-4">
            <NavLink to="/" exact className="px-2" activeClassName="underline-nav">
                Home
            </NavLink>
            <NavLink to="/add" exact className="px-2" activeClassName="underline-nav">
                Add new question
            </NavLink>
            <NavLink to="/leaderboard" exact className="px-2" activeClassName="underline-nav">
                Leaderboard
            </NavLink>
        </nav>
    )
}
