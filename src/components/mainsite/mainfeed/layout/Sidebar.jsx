import { useEffect, useState } from "react";
//add logout
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../../lib/firebase";

export default function Sidebar() {




    return (
        <div className="flex flex-col h-full">
            <div>
                <h1 className="text-3xl font-bold p-5 pb-0 pr-0">Sogram</h1>
            </div>

            <div className="flex flex-col flex-grow ">
                <div className="flex flex-col flex-grow ml-6 mt-10 min-w-52 pb-3 pt-3">
                    <div>
                        <div className="mb-6 hover:bg-slate-500 rounded-md p-4 cursor-pointer">
                            <button className="text-lg font-semibold ">Home</button>
                        </div>
                        <div className="mb-6 hover:bg-slate-500 rounded-md p-4 cursor-pointer">
                            <button className="text-lg font-semibold  ">People</button>
                        </div>
                        <Link to={'/chat'}>
                            <div className="mb-6 hover:bg-slate-500 rounded-md p-4 cursor-pointer">
                                <button className="text-lg font-semibold  ">Chat</button>
                            </div>
                        </Link>
                        <div className="mb-6 hover:bg-slate-500 rounded-md p-4 cursor-pointer">
                            <button className="text-lg font-semibold  ">Saved</button>
                        </div>
                        <Link to={'/create'}>
                            <div className="mb-6 hover:bg-slate-500 rounded-md p-4 cursor-pointer">
                                <button className="text-lg font-semibold  ">Create Post</button>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="ml-6 mb-6 mt-auto hover:bg-slate-500 rounded-md p-4 cursor-pointer">
                    <button className="text-lg font-semibold cursor-pointer">Logout</button>
                </div>
            </div>
        </div>
    )
}