import { useState, useContext, useEffect } from "react";
import { db } from "../../../lib/firebase";
import { setDoc, collection, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useUpload } from "../../../hooks/useupload";
import Sidebar from "./layout/sidebar";

export default function createSite() {
    const { setCaption, setLocation, setTags } = useContext(UserContext);

    const [userCaption, setuserCaption] = useState("");
    const [userImage, setuserImage] = useState("");
    const [userLocation, setuserLocation] = useState("");
    const [userTags, setuserTags] = useState("");
    const [imagePreview, setImagePreview] = useState(""); // State for image preview

    const navigate = useNavigate();

    const { upload } = useUpload();

    async function handleChange(e) {
        e.preventDefault();
        try{
            await addDoc(collection(db, "posts"), {
                caption: userCaption,
                image: userImage,
                location: userLocation,
                tags: userTags,
                timestamp: serverTimestamp()
            });
            setuserCaption('');
            setuserImage("");
            setuserLocation('');
            setuserTags('');
            setImagePreview("");
            navigate('/');

        }catch(e){
            console.error(e);
        }

    }

    function handleCancel(e) {
        e.preventDefault();
        setuserCaption('');
        setuserImage("");
        setuserLocation('');
        setuserTags('');
        setImagePreview("");
        navigate('/');
    }

    async function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            // setuserImage(file);
            // const reader = new FileReader();
            // reader.onload = () => {
            //     setImagePreview(reader.result);
            // };
            // reader.readAsDataURL(file);
            const img_url = await upload(file);
            setuserImage(img_url.data.path);
            setImagePreview(img_url.data.path);
            console.log(img_url.data.path);      
        }
    }

    return (
        <div className="h-screen w-screen flex">
            <div className="h-50 w-screen overflow-auto">
                <div className="p-24">
                    <div className="flex-row ">
                        <h1 className="text-2xl font-bold pb-10">Create a Post</h1>
                    </div>
                    <div className="flex-col p-5">
                        <form>
                            <div className="pb-5">
                                <label className="text-sm font-semibold">Caption</label>
                                <textarea value={userCaption} onChange={e => setuserCaption(e.target.value)} type="text" className="border-2 border-gray-300 text-slate-900 p-2 rounded-lg w-full" placeholder="Caption" />
                            </div>
                            <div className="pb-5">
                                <div className="flex items-center justify-center w-full  object-contain object-center ">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="object-cover h-full w-full rounded-lg" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                        )}
                                        <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} />
                                    </label>
                                </div>
                            </div>
                            <div className="pb-5">
                                <label className="text-sm font-semibold">Add Location</label>
                                <input value={userLocation} onChange={e => setuserLocation(e.target.value)} type="text" className="text-slate-900 border-2 border-gray-300 p-2 rounded-lg w-full" placeholder="Location" />
                            </div>
                            <div className="pb-5">
                                <label className="text-sm font-semibold">Add tags</label>
                                <input value={userTags} onChange={e => setuserTags(e.target.value)} type="text" className="text-slate-900 border-2 border-gray-300 p-2 rounded-lg w-full" placeholder="Tags" />
                            </div>
                            <div className="flex justify-end pt-5">
                                <button onClick={e => handleCancel(e)} className="bg-gray-300 text-black p-2 rounded-lg mr-3">Cancel</button>
                                <button onClick={e => handleChange(e)} className="bg-blue-500 text-white p-2 rounded-lg">Create Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
