import React from "react";

import createSite from "./createSite";
import Main from "../Mainfeed";
import Sidebar from "./Sidebar";


export default function Layout() {


    return (
        <div className="flex h-screen w-screen">
            <div className="flex w-1/6">
                <Sidebar/>
            </div>
            
            <div className="w-5/6 h-full bg-gray-200 overflow-auto">
                <Main/>
            </div>
        </div>
    )
}