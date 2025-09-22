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

const EditProfile = ({ user }) => {
    const dispatch = useDispatch();

    // 1. Consolidated state for cleaner management
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', about: '',
        age: '', gender: '', photoURL: ''
    });

    // Effect to populate form when user data is available
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

    // 2. Single handler for all form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        setError('');
        setIsSaving(true);

        try {
            const res = await axios.patch(`${BASE_URL}/profile/edit`, formData, { withCredentials: true });
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (err) {
            setError(err.response?.data?.message || "An unexpected error occurred.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            {/* 3. A beautiful background and main container - MODIFIED FOR FIXED LAYOUT */}
            <div className="h-screen overflow-hidden bg-gradient-to-br from-base-200 to-base-300 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
                <div className="max-w-6xl mx-auto w-full">
                    <div className="text-center mb-12">
                        <h1 className='text-4xl sm:text-5xl font-bold tracking-tight'>Your Profile</h1>
                        <p className="mt-3 max-w-2xl mx-auto text-lg text-base-content/70">
                            Keep your information up to date.
                        </p>
                    </div>

                    {/* 4. Responsive grid for the cards */}
                    <div className="flex flex-wrap justify-center items-start gap-8 lg:gap-12">
                        
                        {/* Card 1: Edit Form */}
                        <motion.div
                            className="card bg-base-100 w-full max-w-lg shadow-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="card-body p-8">
                                <h2 className="card-title text-2xl mb-6">Edit Details</h2>
                                <form onSubmit={saveProfile}>
                                    
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <label className="form-control w-full">
                                            <div className="label"><span className="label-text font-medium">First Name</span></div>
                                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input input-bordered w-full" required />
                                        </label>
                                        <label className="form-control w-full">
                                            <div className="label"><span className="label-text font-medium">Last Name</span></div>
                                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input input-bordered w-full" required />
                                        </label>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4 mt-6">
                                        <label className="form-control w-full">
                                            <div className="label"><span className="label-text font-medium">Gender</span></div>
                                            {/* 5. Better UX with a select dropdown */}
                                            <select name="gender" value={formData.gender} onChange={handleChange} className="select select-bordered">
                                                <option value="" disabled>Select...</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </label>
                                        <label className="form-control w-full">
                                            <div className="label"><span className="label-text font-medium">Age</span></div>
                                            <input type="number" name="age" value={formData.age} onChange={handleChange} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    
                                     <div className="grid sm:grid-cols-2 gap- mt-1">
                                    <label className="form-control mt-6">
                                        <div className="label"><span className="label-text font-medium">About</span></div>
                                        {/* 6. Textarea for longer text */}
                                        <textarea name="about" value={formData.about} onChange={handleChange} className="textarea textarea-bordered h-24" placeholder="Tell us about yourself..."></textarea>
                                    </label>
                                    </div>

                                   <div className="grid sm:grid-cols-2 gap-4 mt-1">
                                    <label className="form-control w-full mt-8">
                                        <div className="label"><span className="label-text font-medium">Photo URL</span></div>
                                        <input type="url" name="photoURL" value={formData.photoURL} onChange={handleChange} className="input input-bordered w-full" placeholder="https://..." />
                                    </label>
                                    </div>
                                    
                                    {error && <div role="alert" className="alert alert-error text-sm mt-6"><span>{error}</span></div>}

                                    <div className="card-actions justify-end mt-6">
                                        {/* 7. Interactive save button with loading state */}
                                        <button type="submit" className="btn btn-primary w-full md:w-auto" disabled={isSaving}>
                                            {isSaving ? <span className="loading loading-spinner"></span> : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>

                        {/* Card 2: Live Preview */}
                        <div className="w-full max-w-sm">
                            <h3 className="text-xl font-bold text-center mb-4">Live Preview</h3>
                            <Usercard user={formData} />
                        </div>

                    </div>
                </div>
            </div>

            {/* 8. Animated Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        className="toast toast-top toast-center"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                    >
                        <div className="alert alert-success shadow-lg">
                            <span>Profile saved successfully!</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EditProfile;
