import React from "react";

import { UserProvider } from "../../../../context/UserContext";
import { BrowserRouter as Router, Route, Routes, useNavigate, BrowserRouter } from "react-router-dom";

import createSite from "./createSite";
import Sidebar from "../Sidebar";
import Main from "../Main";

const Layout = ({props}) => {

    return (
        <UserProvider>
            <BrowserRouter>
                <Router>
                    <div className="flex h-screen w-screen">
                        <div className="flex w-1/6">
                            <Sidebar/>
                        </div>
                        <div className="w-5/6 h-full bg-gray-200 overflow-auto">
                            <Route path="/" element={<Main />} />
                            <Route path="/chat" element={<List />} />
                            <Route path="/create" element={<createSite />} />

                        </div>
                    </div>

                </Router>            
            </BrowserRouter>

        </UserProvider>
    )
}

export default Layout;