
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import api from "../utils/api";

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
            await api.post(`/request/send/${status}/${userId}`, {}, { withCredentials: true });
        } catch (error) {
            console.error("Failed to send request:", error);
            // Here you could add logic to revert the UI change if the request fails
        }
    };

    return (
        <div className="card w-full max-w-sm h-[600px] bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 image-full rounded-3xl overflow-hidden border border-base-200">
            <figure>
                <img
                    src={photoURL || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=512`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </figure>
            
            <div className="card-body p-6 flex flex-col justify-end from-black/90 via-black/50 to-transparent bg-gradient-to-t">
                
                {/* RESTORED TEXT CONTENT */}
                <div className="mb-2">
                    <h2 className="card-title text-3xl font-bold text-white drop-shadow-md">
                        {firstName || lastName ? `${firstName || ''} ${lastName || ''}`.trim() : "Unknown Developer"}
                        {age && <span className="text-2xl font-light ml-2 text-white/80">{age}</span>}
                    </h2>
                    {gender && <p className="text-white/80 font-medium drop-shadow-sm mt-1">{gender}</p>}
                    <p className="text-white/90 mt-3 h-20 line-clamp-3 drop-shadow-sm leading-relaxed">
                        {about || "No bio information provided."}
                    </p>
                </div>
                
                <div className="card-actions justify-center items-center gap-6 mt-4 pb-2">
                    <button 
                        className="btn btn-circle btn-lg bg-base-200/20 hover:bg-error/20 text-error backdrop-blur-md border-2 border-error/30 shadow-xl hover:scale-110 active:scale-95 transition-all duration-200" 
                        onClick={() => handleSendRequest("ignore", _id)}
                    >
                        <XIcon />
                    </button>
                    <button 
                        className="btn btn-circle btn-lg bg-base-200/20 hover:bg-success/20 text-success backdrop-blur-md border-2 border-success/30 shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
                        onClick={() => handleSendRequest("interested", _id)}
                    >
                        <HeartIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Usercard;