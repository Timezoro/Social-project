import { useContext, useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { collection, onSnapshot, getDoc, doc, deleteDoc, setDoc} from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function Mainfeed() {

    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "posts"), async (snapshot) => {
            // Clear the posts array for each new snapshot
            const posts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            // Use Promise.all to fetch user info for each post
            const postsWithUser = await Promise.all(
                posts.map(async (post) => {
                    const docRef = doc(db, "users", post.user_id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        post.user = docSnap.data();
                    }

                    return post;
                })
            );

            // Update the state with the new posts that include user info
            setPosts(postsWithUser);
            console.log(postsWithUser);

        });

        return () => {
            unsubscribe();
        };
    }, []);

    //handle like
    const handleLike = async (postId) => {
        try {
            // Get the current user's ID
            const userId = auth.currentUser?.uid;
            if (!userId) return; // User is not logged in
    
            // Reference to the post document
            const postRef = doc(db, "posts", postId);
            const postSnap = await getDoc(postRef);
    
            if (postSnap.exists()) {
                const postData = postSnap.data();
                const likesCount = postData.likes || 0;
                const likedByUser = postData.likedBy?.includes(userId) || false;
    
                if (!likedByUser) {
                    // User hasn't liked this post yet, so increment the likes count
                    await setDoc(postRef, {
                        likes: likesCount + 1,
                        likedBy: [...(postData.likedBy || []), userId]
                    }, { merge: true });
                } else {
                    // User already liked this post, so decrement the likes count
                    await setDoc(postRef, {
                        likes: likesCount - 1,
                        likedBy: postData.likedBy.filter(id => id !== userId)
                    }, { merge: true });
                }
            }
        } catch (error) {
            console.log("Error liking post:", error);
        }
    };
    const handleDelete = async (postId) => {
    //Can delete only if the user is the owner of the post
    const userId = auth.currentUser?.uid;
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
        const postData = postSnap.data();
        if (postData.user_id === userId) {
            await deleteDoc(postRef);
        }else{
            alert("You not owner of this post");
        }
    }

    }

    

    //handle logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("logout");
        } catch (error) {
            console.log(error);
        }
    }

    //delete post
    const handledelete = async (id) => {
        try {
            await deleteDoc(doc(db, "posts", id));
        } catch (error) {
            console.log(error);
        }
        console.log("delete");
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
                                <div className="mb-6 mr-3 hover:bg-[#8867ce]  rounded-lg p-4 cursor-pointer flex flex-row">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="800"
                                        height="800"
                                        fill="#000"
                                        data-name="01 - Home Button"
                                        viewBox="-1.27 0 30.066 30.066"
                                        className="fill-white w-7 h-7 mr-3"

                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M29.759 9.912a3 3 0 00-1.543-2.623L17.457 1.312a3 3 0 00-2.914 0L3.784 7.289a3 3 0 00-1.543 2.623V28a3 3 0 003 3h6.5a1 1 0 001-1v-5.088a1 1 0 011-1h4.51a1 1 0 011 1V30a1 1 0 001 1h6.5a3 3 0 003-3V9.912zm-2 0V28a1 1 0 01-1 1h-5.5v-4.088a3 3 0 00-3-3h-4.51a3 3 0 00-3 3V29h-5.5a1 1 0 01-1-1V9.912a1 1 0 01.514-.875L15.514 3.06a1 1 0 01.972 0l10.759 5.977a1 1 0 01.514.875z"
                                            data-name="01 - Home Button"
                                            transform="translate(-2.241 -.934)"
                                        ></path>
                                    </svg>
                                    <button className="text-lg font-semibold ">Home</button>
                                </div>
                                <div className="mb-6 mr-3 hover:bg-[#8867ce]  rounded-lg p-4 cursor-pointer flex flex-row">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="800"
                                        height="800"
                                        fill="#000"
                                        version="1.1"
                                        viewBox="0 0 489.3 489.3"
                                        xmlSpace="preserve"
                                        className="fill-white w-7 h-7 mr-3"

                                    >
                                        <path d="M257.35 62.7c0 34.6 28.1 62.7 62.7 62.7s62.7-28.1 62.7-62.7S354.65 0 320.05 0s-62.7 28.1-62.7 62.7zm24.5 0c0-21.1 17.1-38.2 38.2-38.2s38.2 17.1 38.2 38.2-17.1 38.2-38.2 38.2-38.2-17.1-38.2-38.2zM238.15 62.7c0-34.6-28.1-62.7-62.7-62.7s-62.7 28.1-62.7 62.7 28.1 62.7 62.7 62.7 62.7-28.1 62.7-62.7zm-24.5 0c0 21.1-17.1 38.2-38.2 38.2s-38.2-17.1-38.2-38.2 17.1-38.2 38.2-38.2 38.2 17.1 38.2 38.2zM424.45 200.6v79.7c0 23-12.9 44-32.8 54.7v104.7c0 27.3-22.2 49.5-49.5 49.5h-56.6c-6.8 0-12.3-5.5-12.3-12.3s5.5-12.3 12.3-12.3h56.6c13.8 0 25-11.2 25-25V327.2c0-5.1 3.2-9.7 8-11.5 14.8-5.4 24.7-19.6 24.7-35.3v-79.8c0-20.8-16.9-37.7-37.7-37.7h-53.5c-6.8 0-12.3-5.5-12.3-12.3s5.5-12.3 12.3-12.3h53.5c34.4.2 62.3 28.1 62.3 62.3zM223.85 138.5h-96.8c-34.3 0-62.2 27.9-62.2 62.2v79.7c0 23 12.9 44 32.8 54.7v104.7c0 27.3 22.2 49.5 49.5 49.5h56.6c27.3 0 49.5-22.2 49.5-49.5V335c19.9-10.7 32.8-31.7 32.8-54.7v-79.7c-.1-34.2-27.9-62.1-62.2-62.1zm37.6 141.8c0 15.7-9.9 29.9-24.7 35.3-4.8 1.8-8 6.4-8 11.5v112.6c0 13.8-11.2 25-25 25h-56.6c-13.8 0-25-11.2-25-25V327.2c0-5.1-3.2-9.7-8-11.5-14.8-5.4-24.7-19.6-24.7-35.3v-79.8c0-20.8 16.9-37.7 37.7-37.7h96.8c20.8 0 37.7 16.9 37.7 37.7v79.7h-.2z"></path>
                                    </svg>
                                    <button className="text-lg font-semibold  ">People</button>
                                </div>
                                <Link to={'/chat'}>
                                    <div className="mb-6 mr-3 hover:bg-[#8867ce]  rounded-lg p-4 cursor-pointer flex flex-row">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="800"
                                            height="800"
                                            fill="#000"
                                            version="1.1"
                                            viewBox="0 0 490.1 490.1"
                                            xmlSpace="preserve"
                                            className="fill-white w-7 h-7 mr-3"

                                        >
                                            <path d="M32.1 141.15h76.7c17.7 0 32.1-14.4 32.1-32.1v-76.7c0-17.7-14.4-32.1-32.1-32.1H32.1C14.4.25 0 14.65 0 32.35v76.7c0 17.7 14.4 32.1 32.1 32.1zm-7.6-108.8c0-4.2 3.4-7.6 7.6-7.6h76.7c4.2 0 7.6 3.4 7.6 7.6v76.7c0 4.2-3.4 7.6-7.6 7.6H32.1c-4.2 0-7.6-3.4-7.6-7.6v-76.7zM0 283.45c0 17.7 14.4 32.1 32.1 32.1h76.7c17.7 0 32.1-14.4 32.1-32.1v-76.7c0-17.7-14.4-32.1-32.1-32.1H32.1c-17.7 0-32.1 14.4-32.1 32.1v76.7zm24.5-76.8c0-4.2 3.4-7.6 7.6-7.6h76.7c4.2 0 7.6 3.4 7.6 7.6v76.7c0 4.2-3.4 7.6-7.6 7.6H32.1c-4.2 0-7.6-3.4-7.6-7.6v-76.7zM0 457.75c0 17.7 14.4 32.1 32.1 32.1h76.7c17.7 0 32.1-14.4 32.1-32.1v-76.7c0-17.7-14.4-32.1-32.1-32.1H32.1c-17.7 0-32.1 14.4-32.1 32.1v76.7zm24.5-76.7c0-4.2 3.4-7.6 7.6-7.6h76.7c4.2 0 7.6 3.4 7.6 7.6v76.7c0 4.2-3.4 7.6-7.6 7.6H32.1c-4.2 0-7.6-3.4-7.6-7.6v-76.7zM477.8 31.75H202.3c-6.8 0-12.3 5.5-12.3 12.3 0 6.8 5.5 12.3 12.3 12.3h275.5c6.8 0 12.3-5.5 12.3-12.3 0-6.8-5.5-12.3-12.3-12.3zM477.8 85.15H202.3c-6.8 0-12.3 5.5-12.3 12.3s5.5 12.3 12.3 12.3h275.5c6.8 0 12.3-5.5 12.3-12.3-.1-6.8-5.5-12.3-12.3-12.3zM477.8 206.05H202.3c-6.8 0-12.3 5.5-12.3 12.3s5.5 12.3 12.3 12.3h275.5c6.8 0 12.3-5.5 12.3-12.3-.1-6.8-5.5-12.3-12.3-12.3zM477.8 259.55H202.3c-6.8 0-12.3 5.5-12.3 12.3s5.5 12.3 12.3 12.3h275.5c6.8 0 12.3-5.5 12.3-12.3-.1-6.8-5.5-12.3-12.3-12.3zM477.8 380.45H202.3c-6.8 0-12.3 5.5-12.3 12.3s5.5 12.3 12.3 12.3h275.5c6.8 0 12.3-5.5 12.3-12.3-.1-6.8-5.5-12.3-12.3-12.3zM490 446.15c0-6.8-5.5-12.3-12.3-12.3H202.3c-6.8 0-12.3 5.5-12.3 12.3s5.5 12.3 12.3 12.3h275.5c6.8-.1 12.2-5.6 12.2-12.3z"></path>
                                        </svg>
                                        <button className="text-lg font-semibold  ">Chat</button>
                                    </div>
                                </Link>
                                <div className="mb-6 mr-3 hover:bg-[#8867ce]  rounded-lg p-4 cursor-pointer flex flex-row">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="800"
                                        height="800"
                                        fill="#000"
                                        data-name="09 - Bookmark"
                                        viewBox="-4.72 0 29.494 29.494"
                                        className="fill-white w-7 h-7 mr-3"

                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M26.029 4a3 3 0 00-3-3H8.971a3 3 0 00-3 3v23.494a3 3 0 004.629 2.519l5.4-3.489 5.4 3.489a3 3 0 004.628-2.519V4zm-2 0v23.494a1 1 0 01-1.542.839l-5.944-3.84a1 1 0 00-1.086 0l-5.944 3.84a1 1 0 01-1.542-.839V4a1 1 0 011-1h14.058a1 1 0 011 1z"
                                            data-name="09 - Bookmark"
                                            transform="translate(-5.971 -1)"
                                        ></path>
                                    </svg>
                                    <button className="text-lg font-semibold  ">Saved</button>
                                </div>
                                <Link to={'/create'}>
                                    <div className="mb-6 mr-3 hover:bg-[#8867ce]  rounded-lg p-4 cursor-pointer flex flex-row">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="800"
                                            height="800"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        className="fill-white w-8 h-8 mr-2"

                                        >
                                            <path
                                                stroke="#000"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M11 4H7.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C4 5.52 4 6.08 4 7.2v9.6c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C5.52 20 6.08 20 7.2 20h9.6c1.12 0 1.68 0 2.108-.218a2 2 0 00.874-.874C20 18.48 20 17.92 20 16.8v-4.3m-4.5-7l2.828 2.828m-7.565 1.91l6.648-6.649a2 2 0 112.828 2.828l-6.862 6.862c-.761.762-1.142 1.143-1.576 1.446-.385.269-.8.491-1.237.663-.492.194-1.02.3-2.076.514L8 16l.047-.332c.168-1.175.252-1.763.443-2.312a6 6 0 01.69-1.377c.323-.482.743-.902 1.583-1.742z"
                                            ></path>
                                        </svg>
                                        <button className="text-lg font-semibold  ">Create Post</button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <Link to={'/'} onClick={e => handleLogout()}>
                            <div className="flex flex-row ml-6 mb-6 mr-3 mt-auto hover:bg-[#8867ce] rounded-lg p-4 cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="800"
                                    height="800"
                                    fill="#000"
                                    version="1.1"
                                    viewBox="0 0 490.3 490.3"
                                    xmlSpace="preserve"
                                    className="fill-white w-8 h-8 mr-3"

                                >
                                    <path d="M0 121.05v248.2c0 34.2 27.9 62.1 62.1 62.1h200.6c34.2 0 62.1-27.9 62.1-62.1v-40.2c0-6.8-5.5-12.3-12.3-12.3s-12.3 5.5-12.3 12.3v40.2c0 20.7-16.9 37.6-37.6 37.6H62.1c-20.7 0-37.6-16.9-37.6-37.6v-248.2c0-20.7 16.9-37.6 37.6-37.6h200.6c20.7 0 37.6 16.9 37.6 37.6v40.2c0 6.8 5.5 12.3 12.3 12.3s12.3-5.5 12.3-12.3v-40.2c0-34.2-27.9-62.1-62.1-62.1H62.1c-34.2 0-62.1 27.8-62.1 62.1z"></path>
                                    <path d="M385.4 337.65c2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6l83.9-83.9c4.8-4.8 4.8-12.5 0-17.3l-83.9-83.9c-4.8-4.8-12.5-4.8-17.3 0s-4.8 12.5 0 17.3l63 63H218.6c-6.8 0-12.3 5.5-12.3 12.3 0 6.8 5.5 12.3 12.3 12.3h229.8l-63 63c-4.8 4.7-4.8 12.5 0 17.2z"></path>
                                </svg>
                                <button className="text-lg font-semibold cursor-pointer">Logout</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="overflow-auto w-5/6 h-full ">
                {posts.length > 0 &&
                    posts.map((post) => {
                        return (
                            <div key={post.id} className=" overflow-auto flex justify-center">
                                <div className="w-5/6 ">
                                    <div className="m-10 p-10 flex flex-col shadow-md rounded-md bg-[#090a0b]">
                                        <div className="flex flex-row">
                                            <div className="relative inline-block">
                                                <img src={post.user.avatar} className="w-20 h-20 rounded-full" />
                                            </div>
                                            <div className="flex flex-col ml-4">
                                                <span className="text-2xl font-bold">{post.user.username}</span>
                                                <span className="text-sm">At {post.location}</span>
                                            </div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="800"
                                                height="800"
                                                fill="#000"
                                                version="1.1"
                                                viewBox="0 0 490.4 490.4"
                                                xmlSpace="preserve"
                                                className="fill-white hover:fill-[#d85050] cursor-pointer w-5 h-5 flex justify-end ml-auto"
                                                onClick = {() => handleDelete(post.id)}
                                                
                                            >
                                                <path d="M245.2 490.4c65.5 0 127.1-25.5 173.4-71.8s71.8-107.9 71.8-173.4-25.5-127.1-71.8-173.4S310.7 0 245.2 0 118.1 25.5 71.8 71.8 0 179.7 0 245.2s25.5 127.1 71.8 173.4 107.9 71.8 173.4 71.8zm156.1-89.1c-41.7 41.7-97.1 64.6-156.1 64.6-54.8 0-106.6-19.9-147.1-56.2L409.7 98.1c36.3 40.5 56.2 92.3 56.2 147.1 0 59-23 114.4-64.6 156.1zM89.1 89.1c41.7-41.6 97.1-64.6 156.1-64.6 54.9 0 106.6 19.9 147.1 56.2L80.7 392.3c-36.3-40.5-56.2-92.2-56.2-147.1 0-59 23-114.4 64.6-156.1z"></path>
                                            </svg>
                                        </div>
                                        {/* onClick={() => window.open(post.image)} */}
                                        <div className="mt-7 mb-5 ">
                                        
                                            {post.image && <img src={post.image} className=" object-contain object-center w-screen h-96 "  />}
                                
                                        </div>

                                        <div className="mb-5 w-full h-20 overflow-auto break-all">
                                            <span className="text-lg font-extrabold">{post.user.username}</span>
                                            <span className="ml-2 text-base font-thin">{post.caption}</span>
                                            <span className=" ml-1 text-base text-[#2fbdff] ">#{post.tags}</span>
                                        </div>

                                        <div>
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="#FF0000"
                                                        version="1.1"
                                                        viewBox="0 0 471.701 471.701"
                                                        xmlSpace="preserve"
                                                        className="fill-white hover:fill-[#d85050] cursor-pointer w-8 h-8 "
                                                        onClick={() => handleLike(post.id)}
                                                        
                                                    >
                                                        <path d="M433.601 67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7 13.6-92.4 38.3l-12.9 12.9-13.1-13.1c-24.7-24.7-57.6-38.4-92.5-38.4-34.8 0-67.6 13.6-92.2 38.2-24.7 24.7-38.3 57.5-38.2 92.4 0 34.9 13.7 67.6 38.4 92.3l187.8 187.8c2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-3.9l188.2-187.5c24.7-24.7 38.3-57.5 38.3-92.4.1-34.9-13.4-67.7-38.1-92.4zm-19.2 165.7l-178.7 178-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3s10.7-53.7 30.3-73.2c19.5-19.5 45.5-30.3 73.1-30.3 27.7 0 53.8 10.8 73.4 30.4l22.6 22.6c5.3 5.3 13.8 5.3 19.1 0l22.4-22.4c19.6-19.6 45.7-30.4 73.3-30.4 27.6 0 53.6 10.8 73.2 30.3 19.6 19.6 30.3 45.6 30.3 73.3.1 27.7-10.7 53.7-30.3 73.3z"></path>
                                                    </svg>
                                                    <span className="text-lg font-bold ml-4  ">{post.likes}</span>
                                                    
                                                </div>

                                                <div className="flex flex-row">
                                                    <span className="text-lg font-bold mr-4">{post.comments}</span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="800"
                                                        height="800"
                                                        viewBox="0 0 24 24"
                                                        className="fill-white hover:fill-[#704bac] cursor-pointer w-9 h-9"
                                                    >
                                                        <path d="M5 11a1 1 0 001-1V6a1 1 0 00-2 0v4a1 1 0 001 1zm-.71-7.29a1 1 0 001.09.21 1.15 1.15 0 00.33-.21 1.15 1.15 0 00.21-.33A.84.84 0 006 3a1 1 0 00-.29-.71 1 1 0 00-1.09-.21 1 1 0 00-.33.21A1 1 0 004 3a1 1 0 00.08.38 1.15 1.15 0 00.21.33zM17 6H9a1 1 0 000 2h8a1 1 0 011 1v9.72l-1.57-1.45a1 1 0 00-.68-.27H7a1 1 0 01-1-1v-2a1 1 0 00-2 0v2a3 3 0 003 3h8.36l3 2.73A1 1 0 0019 22a1.1 1.1 0 00.4-.08A1 1 0 0020 21V9a3 3 0 00-3-3z"></path>
                                                    </svg>
                                                    
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}
