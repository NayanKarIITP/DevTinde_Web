// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import Usercard from './Usercard';
// import { addUser } from '../utils/userSlice';
// import { BASE_URL } from '../utils/constants';

// const EditProfile = ({ user }) => {
//     const dispatch = useDispatch();

//     const [firstName, setFirstName] = useState(user.firstName);
//     const [lastName, setLastName] = useState(user.lastName);
//     const [about, setAbout] = useState(user.about || "");
//     const [age, setAge] = useState(user.age || "");
//     const [gender, setGender] = useState(user.gender || "");
//     const [photoURL, setPhotoURL] = useState(user.photoURL|| "");
//     const [error, setError] = useState('');
//     const [showToast, setShowToast] = useState(false);

//     const saveProfile = async () => {
//         setError('');
//         try {
//             const res = await axios.patch(BASE_URL + "/profile/edit", {
//                 firstName,
//                 lastName,
//                 about,
//                 age,
//                 gender,
//                 photoURL
//             }, { withCredentials: true });

//             dispatch(addUser(res?.data?.data));
//             setShowToast(true);
//             setTimeout(() => setShowToast(false), 3000);
//         } catch (error) {
//             setError(error.message);
//         }
//     }

//     return (
//         <>
//             <div className='flex justify-center items-stretch my-10 gap-8'>
//                 {/* Card 1: Edit Profile */}
//                 <div className="card card-border bg-base-200 w-96 shadow-xl">
//                     <div className="card-body">
//                         <h2 className="card-title justify-center">Edit Profile</h2>
//                         {/* All your form labels and inputs go here... */}
//                         <div className='gap-3'>
//                             <label className="form-control w-full max-w-xs">
//                                 <div className="label">
//                                     <span className="label-text">First Name</span>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     value={firstName}
//                                     className="input input-bordered w-full max-w-xs"
//                                     onChange={(e) => setFirstName(e.target.value)}
//                                 />
//                             </label>

//                             <label className="form-control w-full max-w-xs">
//                                 <div className="label">
//                                     <span className="label-text mt-3">Last Name</span>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     value={lastName}
//                                     className="input input-bordered w-full max-w-xs"
//                                     onChange={(e) => setLastName(e.target.value)}
//                                 />
//                             </label>

//                             <label className="form-control w-full max-w-xs">
//                                 <div className="label">
//                                     <span className="label-text mt-3">Gender</span>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     value={gender}
//                                     className="input input-bordered w-full max-w-xs"
//                                     onChange={(e) => setGender(e.target.value)}
//                                 />
//                             </label>

//                             <label className="form-control w-full max-w-xs">
//                                 <div className="label">
//                                     <span className="label-text mt-3">Age</span>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     value={age}
//                                     className="input input-bordered w-full max-w-xs"
//                                     onChange={(e) => setAge(e.target.value)}
//                                 />
//                             </label>

//                             <label className="form-control w-full max-w-xs">
//                                 <div className="label">
//                                     <span className="label-text mt-3">About</span>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     value={about}
//                                     className="input input-bordered w-full max-w-xs"
//                                     onChange={(e) => setAbout(e.target.value)}
//                                 />
//                             </label>

//                             {/* ... other labels for Last Name, Gender, etc. */}
//                             <label className="form-control w-full max-w-xs">
//                                 <div className="label">
//                                     <span className="label-text mt-3">Photo URL</span>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     value={photoURL}
//                                     className="input input-bordered w-full max-w-xs"
//                                     onChange={(e) => setPhotoURL(e.target.value)}
//                                 />
//                             </label>
//                         </div>
//                         <div className="card-actions justify-center">
//                             <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
//                         </div>
//                         {error && (
//                             <p className="text-red-500 text-center mt-2">{error}</p>
//                         )}
//                     </div>
//                 </div>

//                 {/* Card 2: Usercard */}
//                 {/* Make sure to pass the className prop to your Usercard component */}
//                 <Usercard className="w-96" user={{ firstName, lastName, photoURL, age, gender, about }} />

//                 {
//                     showToast && <div className="toast toast-top toast-center">
//                         <div className="alert alert-info">
//                             <span>Saved Successfully!</span>
//                         </div>
//                     </div>
//                 }
//             </div>
//         </>
//     )
// }

// export default EditProfile;


import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Usercard from './Usercard';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';
import api from "../utils/api";

const EditProfile = ({ user }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: '', lastName: '',
        about: '', age: '', gender: '',
        photoURL: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                about: user.about || '',
                age: user.age || '',
                gender: user.gender || '',
                photoURL: user.photoURL || ''
            });
        }
    }, [user]);

    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        setError('');
        setIsSaving(true);

        try {
            const res = await api.patch(`${BASE_URL}/profile/edit`, formData, { withCredentials: true });
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
        } catch (err) {
            setError(err.response?.data?.message || "Unexpected error occurred.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            {/* FULL PAGE - NO SCROLL */}
            <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 p-4 flex flex-col">

                {/* HEADER */}
                <div className="text-center mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Edit Profile</h1>
                    <p className="text-white/70 text-sm">Update your personal information</p>
                </div>

                {/* MAIN GRID FITTING INSIDE SCREEN */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 max-h-[82vh]">

                    {/* LEFT CARD (FORM) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="backdrop-blur-xl bg-white/10 border border-white/10 
                                   shadow-xl rounded-2xl p-6 overflow-y-auto"
                    >
                        <h2 className="text-xl text-white font-semibold mb-4">Profile Information</h2>

                        <form onSubmit={saveProfile} className="space-y-4">

                            {/* FIRST & LAST NAME */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-white/80 text-sm">First Name</label>
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="input input-bordered w-full bg-white/5 text-white" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="text-white/80 text-sm">Last Name</label>
                                    <input 
                                        type="text" 
                                        name="lastName" 
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="input input-bordered w-full bg-white/5 text-white" 
                                        required 
                                    />
                                </div>
                            </div>

                            {/* AGE & GENDER */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-white/80 text-sm">Gender</label>
                                    <select 
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="select select-bordered w-full bg-white/5 text-white"
                                    >
                                        <option value="" disabled>Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-white/80 text-sm">Age</label>
                                    <input 
                                        type="number" 
                                        name="age" 
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="input input-bordered w-full bg-white/5 text-white"
                                    />
                                </div>
                            </div>

                            {/* ABOUT */}
                            <div>
                                <label className="text-white/80 text-sm">About</label>
                                <textarea 
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    className="textarea textarea-bordered w-full bg-white/5 text-white h-20"
                                    placeholder="Tell something about yourself..."
                                ></textarea>
                            </div>

                            {/* PHOTO URL */}
                            <div>
                                <label className="text-white/80 text-sm">Photo URL</label>
                                <input 
                                    type="url" 
                                    name="photoURL" 
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    className="input input-bordered w-full bg-white/5 text-white"
                                    placeholder="https://your-photo-link.com"
                                />
                            </div>

                            {/* ERROR */}
                            {error && (
                                <div className="alert alert-error text-sm"><span>{error}</span></div>
                            )}

                            {/* SAVE BUTTON */}
                            <button 
                                type="submit" 
                                className="btn btn-primary w-full"
                                disabled={isSaving}
                            >
                                {isSaving ? <span className="loading loading-spinner"></span> : "Save Changes"}
                            </button>
                        </form>
                    </motion.div>

                    {/* RIGHT: LIVE PREVIEW */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-start overflow-hidden"
                    >
                        <h3 className="text-lg text-white font-semibold mb-2">Live Preview</h3>

                        <div className="w-full max-w-xs">
                            <Usercard user={formData} />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* SUCCESS TOAST */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        className="toast toast-top toast-center"
                        initial={{ opacity: 0, y: -60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -60 }}
                    >
                        <div className="alert alert-success shadow-lg">
                            <span>Profile updated successfully!</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EditProfile;
