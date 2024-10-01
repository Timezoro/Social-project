import {useState, useContext} from "react";
import { UserContext } from "../../../context/UserContext";
 
export default function createSite() {
    const {setCaption,setLocation,setTags } = useContext(UserContext);

    const [userCaption, setuserCaption] = useState("");
    const [userLocation, setuserLocation] = useState("");
    const [userTags, setuserTags] = useState("");

    function handleChange() {
        e.preventDefault();
        setCaption(userCaption);
        setLocation(userLocation);
        setTags(userTags);

    }
    function handleCancle(e) {
        e.preventDefault();
    }

    return (
    <div className ="h-screen w-screen overflow-auto">
        <div className="p-24">
            <div className="flex-row ">
                <h1 className="text-2xl font-bold pb-10">Create a Post</h1>
            </div>
            <div className="flex-col p-5">
                <form>
                    <div className=" pb-5">
                        <label className="text-sm font-semibold">Caption</label>
                        <textarea onChange={e => setuserCaption(e.target.value)} type="text" className="border-2 border-gray-300 text-slate-900 p-2 rounded-lg w-full" placeholder="Caption"/>
                    </div>
                    <div className=" pb-5">
                        <label for="uploadFile1" className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                            <path
                            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                            data-original="#000000" />
                            <path
                            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                            data-original="#000000" />
                        </svg>
                        Upload file

                        <input type="file" id='uploadFile1' className="hidden" />
                        <p className="text-xs font-medium text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                        </label>
                    </div>
                    <div className="pb-5">
                        <label className="text-sm font-semibold">Add Location</label>
                        <input onChange ={e => setuserLocation(e.target.value)} type="text" className=" text-slate-900 border-2 border-gray-300 p-2 rounded-lg w-full" placeholder="Location"/>
                    </div>
                    <div className="pb-5">
                        <label className="text-sm font-semibold">Add tags</label>
                        <input onChange = {e => setuserTags(e.target.value)} type="text" className=" text-slate-900 border-2 border-gray-300 p-2 rounded-lg w-full" placeholder="Tags"/>
                    </div>
                    <div className="pb-5">
                        <label className="text-sm font-semibold">Tags</label>
                        <input type="text" className=" text-slate-900 border-2 border-gray-300 p-2 rounded-lg w-full" placeholder="Tags"/>
                    </div>
                    <div className="flex justify-end pt-5">
                        <button onclick = {e => handleCancle()} className="bg-gray-300 text-black p-2 rounded-lg mr-3">Cancle</button>
                        <button onclick= {e => handleChange()} className="bg-blue-500 text-white p-2 rounded-lg">Create Post</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}