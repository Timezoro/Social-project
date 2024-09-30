import {useState, useContext} from "react";
import { UserContext } from "../../../context/UserContext";
 
export default function createSite() {
    const {setCaption,setLocation,setTags } = useContext(UserContext);
    const [userCaption, setuserCaption] = useState(null);
    const [userLocation, setuserLocation] = useState(null);
    const [userTags, setuserTags] = useState(null);

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
            <div className="flex-col">
                <form>
                    <div className="flex-col pb-5">
                        <label className="text-sm font-semibold">Caption</label>
                        <input onChange={e => setuserCaption(e.target.value)} type="text" className="border-2 border-gray-300 p-2 rounded-lg w-full" placeholder="Caption"/>
                    </div>
                    <div className="flex-col pb-5">
                        <label className="text-sm font-semibold">Add photos</label>
                    </div>
                    <div className="flex-col pb-5">
                        <label className="text-sm font-semibold">Add Location</label>
                        <input onChange ={e => setuserLocation(e.target.value)} type="text" className="border-2 border-gray-300 p-2 rounded-lg w-full" placeholder="Location"/>
                    </div>
                    <div className="flex-col pb-5">
                        <label className="text-sm font-semibold">Add tags</label>
                        <input onChange = {e => setuserTags(e.target.value)} type="text" className="border-2 border-gray-300 p-2 rounded-lg w-full" placeholder="Tags"/>
                    </div>
                    <div className="flex-col pb-5">
                        <label className="text-sm font-semibold">Tags</label>
                        <input type="text" className="border-2 border-gray-300 p-2 rounded-lg w-full" placeholder="Tags"/>
                    </div>
                    <div className="flex-row pt-5">
                        <button onclick = {e => handleCancle()} className="bg-gray-300 text-black p-2 rounded-lg ">Cancle</button>
                        <button onclick= {e => handleChange()} className="bg-blue-500 text-white p-2 rounded-lg">Create Post</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}