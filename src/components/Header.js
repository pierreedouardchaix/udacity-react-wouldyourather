import React from 'react';
import {Link} from "react-router-dom";

const Header = (props) => (
    <div className="w-full h-12 flex justify-center items-center bg-blue-500 py-8 relative">
        <span className="text-white leading-relaxed font-semibold">Would you rather?</span>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <div className="flex flex-row items-center">
                                    <span
                                        className="text-white font-light text-xs pr-2">Welcome, {props.authedUser}!</span>
                <Link className="text-xs text-white hover:text-gray-100 pr-2"
                      to="/logout">Logout</Link>
                <div className="flex items-center w-12 h-12">
                    <img alt="You" src={props.authedUserAvatarURL} className="rounded-full"/>
                </div>
            </div>
        </div>
    </div>
)

export default Header;
