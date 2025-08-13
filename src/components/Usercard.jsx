import React, { use } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeUserFromFeed } from '../utils/feedSlice';

const Usercard = ({ user }) => {
    const { _id, firstName, lastName, photoURL, age, gender, about } = user;
    const dispatch = useDispatch();
    const [isOwnProfile, setIsOwnProfile] = useState(true)

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + '/request/send/' + status + "/" + userId, {}, { withCredentials: true }) //request/send/interested/68923b952993bc505925a1d0
            dispatch(removeUserFromFeed(userId));
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <div className="border-1 border-white card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src={photoURL}
                        alt="Profile Photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <p>{gender},{age}</p>
                    
                    <p>{about}</p>
                    {<div className="card-actions justify-center my-4">
                        <button className="btn btn-primary" onClick={() => handleSendRequest("ignore", _id)}>Ignore</button>
                        <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Usercard;
