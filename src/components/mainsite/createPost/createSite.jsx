import React from "react";

export default function createSite() {

    return (
    <div className ="h-screen w-screen overflow-auto">
        <div className="p-6">
            <div className="flex-row ">
                <h1 className="text-2xl font-bold">Create a Post</h1>
            </div>
            <div className="flex-col">
                <form>
                    <div className="flex-col">
                        <label className="text-lg font-semibold">Title</label>
                        <input type="text" className="border-2 border-gray-300 p-2 rounded-lg w-full" placeholder="Title"/>
                    </div>
                    <div className="flex-col">
                        <label className="text-lg font-semibold">Description</label>
                        <textarea className="border-2 border-gray-300 p-2 rounded-lg w-full" placeholder="Description"/>
                    </div>
                    <div className="flex-col">
                        <label className="text-lg font-semibold">Image</label>
                        <input type="file" className="border-2 border-gray-300 p-2 rounded-lg w-full" placeholder="Image"/>
                    </div>
                    <div className="flex-col">
                        <label className="text-lg font-semibold">Category</label>
                        <select className="border-2 border-gray-300 p-2 rounded-lg w-full">
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
                            <option value="3">Category 3</option>
                            <option value="4">Category 4</option>
                        </select>
                    </div>
                    <div className="flex-col">
                        <label className="text-lg font-semibold">Tags</label>
                        <input type="text" className="border-2 border-gray-300 p-2 rounded-lg w-full" placeholder="Tags"/>
                    </div>
                    <div className="flex-col">
                        <button className="bg-blue-500 text-white p-2 rounded-lg w-full">Create Post</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}