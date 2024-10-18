import { useContext, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
//add logout
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";


export default function Mainfeed() {

    //handle logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("logout");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex h-screen w-screen">
            <div className="flex h-screen w-1/6">
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
                        <Link to={'/'} onClick={e => handleLogout()}>
                            <div className="ml-6 mb-6 mt-auto hover:bg-slate-500 rounded-md p-4 cursor-pointer">
                                <button className="text-lg font-semibold cursor-pointer">Logout</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-5/6 h-full overflow-auto flex justify-center">
                <div className="w-5/6 mb-10">
                    <div className="m-10 p-10 flex flex-col shadow-md rounded-md bg-slate-600">
                        <div className="flex flex-row">
                            <div className="relative inline-block">
                                <img src="./avatar.png" className="w-20 h-20 rounded-full" />
                                
                            </div>
                            <div className="flex flex-col ml-4">
                                    <span className="text-2xl font-bold">Username</span>
                                    <span className="text-sm">Location</span>
                                    <span className="text-xs">Date</span>
                            </div>

                        </div>
                        <div className="mt-10 mb-5 bg-slate-400 w-full max-h-full">
                            <img src="./img.png" className="w-full max-h-96" />

                        </div>

                        <div className="mb-5">
                            <p className="text-lg">Description</p>
                        </div>
                        <div>
                            <div className="flex flex-row ">
                                <div className="flex flex-row">
                                    <img src="./heart.png" className="w-8 h-8 cursor-pointer" />
                                    {/* <img src="./heart_hold.png" className="w-8 h-8" />
                                    <img src="./heart_place.png" className="w-8 h-8" /> */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
