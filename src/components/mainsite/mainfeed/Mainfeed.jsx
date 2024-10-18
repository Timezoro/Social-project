import { useContext, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
//add logout
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";


export default function Mainfeed() {

    //use data from context

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
            <div className="flex h-screen w-1/6 ">
                <div className="flex flex-col h-full">
                    <div>
                        <h1 className="text-3xl font-bold p-5 pb-0 pr-0">Sogram</h1>
                    </div>

                    <div className="flex flex-col flex-grow ">
                        <div className="flex flex-col flex-grow ml-6 mt-10 min-w-52 pb-3 pt-3">
                            <div>
                                <div className="mb-6 mr-3 hover:bg-[#8867ce]  rounded-lg p-4 cursor-pointer">
                                    <button className="text-lg font-semibold ">Home</button>
                                </div>
                                <div className="mb-6 mr-3 hover:bg-[#8867ce]  rounded-lg p-4 cursor-pointer">
                                    <button className="text-lg font-semibold  ">People</button>
                                </div>
                                <Link to={'/chat'}>
                                    <div className="mb-6 mr-3 hover:bg-[#8867ce]  rounded-lg p-4 cursor-pointer">
                                        <button className="text-lg font-semibold  ">Chat</button>
                                    </div>
                                </Link>
                                <div className="mb-6 mr-3 hover:bg-[#8867ce]  rounded-lg p-4 cursor-pointer">
                                    <button className="text-lg font-semibold  ">Saved</button>
                                </div>
                                <Link to={'/create'}>
                                    <div className="mb-6 mr-3 hover:bg-[#8867ce]  rounded-lg p-4 cursor-pointer">
                                        <button className="text-lg font-semibold  ">Create Post</button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <Link to={'/'} onClick={e => handleLogout()}>
                            <div className="ml-6 mb-6 mr-3 mt-auto hover:bg-[#8867ce] rounded-lg p-4 cursor-pointer">
                                <button className="text-lg font-semibold cursor-pointer">Logout</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-5/6 h-full overflow-auto flex justify-center">
                <div className="w-5/6 mb-10">
                    <div className="m-10 p-10 flex flex-col shadow-md rounded-md bg-[#090a0b]">
                        <div className="flex flex-row">
                            <div className="relative inline-block">
                                <img src="./avatar.png" className="w-20 h-20 rounded-full" />
                            </div>
                            <div className="flex flex-col ml-4">
                                <span className="text-2xl font-bold">Username</span>
                                <span className="text-sm">At Location</span>
                                <span className="text-xs">Date</span>
                            </div>

                        </div>
                        <div className="mt-7 mb-5  ">
                            <img src="./this___former-president.jpg  " className =" object-cover object-center w-full h-96" />

                        </div>

                        <div className="mb-5 w-full h-20 overflow-auto break-all">
                            <span className="text-lg font-bold">Username</span>
                            <span className="ml-2 text-base">Description</span>
                            <span className=" ml-1 text-base ">#Tag</span>
                        </div>
                        <div>
                            <div className="flex flex-row ">
                                <div className="flex flex-row">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#FF0000"
                                        version="1.1"
                                        viewBox="0 0 471.701 471.701"
                                        xmlSpace="preserve"
                                        className="fill-white hover:fill-red-700 cursor-pointer w-8 h-8"
                                    >
                                        <path d="M433.601 67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7 13.6-92.4 38.3l-12.9 12.9-13.1-13.1c-24.7-24.7-57.6-38.4-92.5-38.4-34.8 0-67.6 13.6-92.2 38.2-24.7 24.7-38.3 57.5-38.2 92.4 0 34.9 13.7 67.6 38.4 92.3l187.8 187.8c2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-3.9l188.2-187.5c24.7-24.7 38.3-57.5 38.3-92.4.1-34.9-13.4-67.7-38.1-92.4zm-19.2 165.7l-178.7 178-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3s10.7-53.7 30.3-73.2c19.5-19.5 45.5-30.3 73.1-30.3 27.7 0 53.8 10.8 73.4 30.4l22.6 22.6c5.3 5.3 13.8 5.3 19.1 0l22.4-22.4c19.6-19.6 45.7-30.4 73.3-30.4 27.6 0 53.6 10.8 73.2 30.3 19.6 19.6 30.3 45.6 30.3 73.3.1 27.7-10.7 53.7-30.3 73.3z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
