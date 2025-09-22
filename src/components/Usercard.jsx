// import React, { use } from 'react'
// import { BASE_URL } from '../utils/constants';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { removeUserFromFeed } from '../utils/feedSlice';

// const Usercard = ({ user }) => {
//     const { _id, firstName, lastName, photoURL, age, gender, about } = user;
//     const dispatch = useDispatch();

//     const handleSendRequest = async (status, userId) => {
//         try {
//             const res = await axios.post(BASE_URL + '/request/send/' + status + "/" + userId, {}, { withCredentials: true }) //request/send/interested/68923b952993bc505925a1d0
//             dispatch(removeUserFromFeed(userId));
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     return (
//         <div>
//             <div className="border-1 border-white card bg-base-100 w-96 shadow-sm">
//                 <figure>
//                     <img
//                         src={photoURL}
//                         alt="Profile Photo" />
//                 </figure>
//                 <div className="card-body">
//                     <h2 className="card-title">{firstName + " " + lastName}</h2>
//                     <p>{gender},{age}</p>
                    
//                     <p>{about}</p>
//                     {<div className="card-actions justify-center my-4">
//                         <button className="btn btn-primary" onClick={() => handleSendRequest("ignore", _id)}>Ignore</button>
//                         <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
//                     </div>}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Usercard;





import React from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

// --- Icon components for the buttons ---
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.662l1.318-1.344a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;


const Usercard = ({ user }) => {
    if (!user) return null; // Return nothing if no user is provided

    const { _id, firstName, lastName, photoURL, age, gender, about } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            // Optimistically update the UI by dispatching the removal action first
            dispatch(removeUserFromFeed(userId));
            await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
        } catch (error) {
            console.error("Failed to send request:", error);
            // Here you could add logic to revert the UI change if the request fails
        }
    };

    return (
        <div className="card w-full max-w-sm h-[600px] bg-base-100 shadow-xl image-full rounded-2xl overflow-hidden">
            <figure>
                <img
                    src={photoURL || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=512`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </figure>
            
            {/* Gradient overlay for text readability */}
            <div className="card-body p-6 flex flex-col justify-end from-black/80 via-black/40 to-transparent bg-gradient-to-t">
                <div>
                    <h2 className="card-title text-3xl font-bold text-white">
                        {`${firstName} ${lastName}`}
                        {age && <span className="text-2xl font-light ml-2">{age}</span>}
                    </h2>
                    {gender && <p className="text-white/80 font-medium">{gender}</p>}
                    <p className="text-white/90 mt-4 h-24 line-clamp-4">{about || "No bio information provided."}</p>
                </div>
                
                <div className="card-actions justify-center items-center gap-8 mt-6">
                    <button 
                        className="btn btn-circle btn-lg bg-white/10 hover:bg-white/20 text-red-400 backdrop-blur-sm border-none shadow-xl" 
                        onClick={() => handleSendRequest("ignore", _id)}
                    >
                        <XIcon />
                    </button>
                    <button 
                        className="btn btn-circle btn-lg bg-white/10 hover:bg-white/20 text-green-400 backdrop-blur-sm border-none shadow-xl"
                        onClick={() => handleSendRequest("interested", _id)}
                    >
                        <HeartIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Usercard;