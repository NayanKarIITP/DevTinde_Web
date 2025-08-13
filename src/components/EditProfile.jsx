import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Usercard from './Usercard';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const EditProfile = ({ user }) => {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [about, setAbout] = useState(user.about || " ");
    const [age, setAge] = useState(user.age || " ");
    const [gender, setGender] = useState(user.gender || "");
    const [photoURL, setPhotoURL] = useState(user.photoURL|| " ");
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async () => {
        setError('');
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                about,
                age,
                gender,
                photoURL
            }, { withCredentials: true });

            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <div className='flex justify-center items-stretch my-10 gap-8'>
                {/* Card 1: Edit Profile */}
                <div className="card card-border bg-base-200 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        {/* All your form labels and inputs go here... */}
                        <div className='gap-3'>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">First Name</span>
                                </div>
                                <input
                                    type="text"
                                    value={firstName}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text mt-3">Last Name</span>
                                </div>
                                <input
                                    type="text"
                                    value={lastName}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text mt-3">Gender</span>
                                </div>
                                <input
                                    type="text"
                                    value={gender}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text mt-3">Age</span>
                                </div>
                                <input
                                    type="text"
                                    value={age}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text mt-3">About</span>
                                </div>
                                <input
                                    type="text"
                                    value={about}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </label>

                            {/* ... other labels for Last Name, Gender, etc. */}
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text mt-3">Photo URL</span>
                                </div>
                                <input
                                    type="text"
                                    value={photoURL}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                        </div>
                        {error && (
                            <p className="text-red-500 text-center mt-2">{error}</p>
                        )}
                    </div>
                </div>

                {/* Card 2: Usercard */}
                {/* Make sure to pass the className prop to your Usercard component */}
                <Usercard className="w-96" user={{ firstName, lastName, photoURL, age, gender, about }} />

                {
                    showToast && <div className="toast toast-top toast-center">
                        <div className="alert alert-info">
                            <span>Saved Successfully!</span>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default EditProfile;
