
// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import Usercard from './Usercard';
// import { addUser } from '../utils/userSlice';
// import { BASE_URL } from '../utils/constants';
// import { motion, AnimatePresence } from 'framer-motion';
// import api from "../utils/api";

// const EditProfile = ({ user }) => {
//     const dispatch = useDispatch();

//     const [formData, setFormData] = useState({
//         firstName: '', lastName: '',
//         about: '', age: '', gender: '',
//         photoURL: ''
//     });

//     useEffect(() => {
//         if (user) {
//             setFormData({
//                 firstName: user.firstName || '',
//                 lastName: user.lastName || '',
//                 about: user.about || '',
//                 age: user.age || '',
//                 gender: user.gender || '',
//                 photoURL: user.photoURL || ''
//             });
//         }
//     }, [user]);

//     const [error, setError] = useState('');
//     const [isSaving, setIsSaving] = useState(false);
//     const [showToast, setShowToast] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const saveProfile = async (e) => {
//         e.preventDefault();
//         setError('');
//         setIsSaving(true);

//         try {
//             const res = await api.patch(`/profile/edit`, formData, { withCredentials: true });
//             dispatch(addUser(res?.data?.data));
//             setShowToast(true);
//             setTimeout(() => setShowToast(false), 2500);
//         } catch (err) {
//             setError(err.response?.data?.message || "Unexpected error occurred.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     return (
//         <>
//             {/* FULL PAGE - NO SCROLL */}
//             {/* <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 p-4 flex flex-col"></div> */}
//             <div className="min-h-[85vh] p-4 flex flex-col items-center justify-center">

//                 {/* HEADER */}
//                 <div className="text-center mb-2">
//                     <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Edit Profile</h1>
//                     <p className="text-white/70 text-sm">Update your personal information</p>
//                 </div>

//                 {/* MAIN GRID FITTING INSIDE SCREEN */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 max-h-[82vh]">

//                     {/* LEFT CARD (FORM) */}
//                     <motion.div
//                         initial={{ opacity: 0, x: -30 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5 }}
//                         className="backdrop-blur-xl bg-white/10 border border-white/10 
//                                    shadow-xl rounded-2xl p-6 overflow-y-auto"
//                     >
//                         <h2 className="text-xl text-white font-semibold mb-4">Profile Information</h2>

//                         <form onSubmit={saveProfile} className="space-y-4">

//                             {/* FIRST & LAST NAME */}
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="text-white/80 text-sm">First Name</label>
//                                     <input 
//                                         type="text" 
//                                         name="firstName" 
//                                         value={formData.firstName}
//                                         onChange={handleChange}
//                                         className="input input-bordered w-full bg-white/5 text-white" 
//                                         required 
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="text-white/80 text-sm">Last Name</label>
//                                     <input 
//                                         type="text" 
//                                         name="lastName" 
//                                         value={formData.lastName}
//                                         onChange={handleChange}
//                                         className="input input-bordered w-full bg-white/5 text-white" 
//                                         required 
//                                     />
//                                 </div>
//                             </div>

//                             {/* AGE & GENDER */}
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="text-white/80 text-sm">Gender</label>
//                                     <select 
//                                         name="gender"
//                                         value={formData.gender}
//                                         onChange={handleChange}
//                                         className="select select-bordered w-full bg-white/5 text-white"
//                                     >
//                                         <option value="" disabled>Select gender</option>
//                                         <option value="Male">Male</option>
//                                         <option value="Female">Female</option>
//                                         <option value="Other">Other</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="text-white/80 text-sm">Age</label>
//                                     <input 
//                                         type="number" 
//                                         name="age" 
//                                         value={formData.age}
//                                         onChange={handleChange}
//                                         className="input input-bordered w-full bg-white/5 text-white"
//                                     />
//                                 </div>
//                             </div>

//                             {/* ABOUT */}
//                             <div>
//                                 <label className="text-white/80 text-sm">About</label>
//                                 <textarea 
//                                     name="about"
//                                     value={formData.about}
//                                     onChange={handleChange}
//                                     className="textarea textarea-bordered w-full bg-white/5 text-white h-20"
//                                     placeholder="Tell something about yourself..."
//                                 ></textarea>
//                             </div>

//                             {/* PHOTO URL */}
//                             <div>
//                                 <label className="text-white/80 text-sm">Photo URL</label>
//                                 <input 
//                                     type="url" 
//                                     name="photoURL" 
//                                     value={formData.photoURL}
//                                     onChange={handleChange}
//                                     className="input input-bordered w-full bg-white/5 text-white"
//                                     placeholder="https://your-photo-link.com"
//                                 />
//                             </div>

//                             {/* ERROR */}
//                             {error && (
//                                 <div className="alert alert-error text-sm"><span>{error}</span></div>
//                             )}

//                             {/* SAVE BUTTON */}
//                             <button 
//                                 type="submit" 
//                                 className="btn btn-primary w-full"
//                                 disabled={isSaving}
//                             >
//                                 {isSaving ? <span className="loading loading-spinner"></span> : "Save Changes"}
//                             </button>
//                         </form>
//                     </motion.div>

//                     {/* RIGHT: LIVE PREVIEW */}
//                     <motion.div
//                         initial={{ opacity: 0, x: 30 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5 }}
//                         className="flex flex-col items-center justify-start overflow-hidden"
//                     >
//                         <h3 className="text-lg text-white font-semibold mb-2">Live Preview</h3>

//                         <div className="w-full max-w-xs">
//                             <Usercard user={formData} />
//                         </div>
//                     </motion.div>
//                 </div>
//             </div>

//             {/* SUCCESS TOAST */}
//             <AnimatePresence>
//                 {showToast && (
//                     <motion.div
//                         className="toast toast-top toast-center"
//                         initial={{ opacity: 0, y: -60 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -60 }}
//                     >
//                         <div className="alert alert-success shadow-lg">
//                             <span>Profile updated successfully!</span>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </>
//     );
// };

// export default EditProfile;




import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Usercard from './Usercard';
import { addUser } from '../utils/userSlice';
import { motion, AnimatePresence } from 'framer-motion';
import api from "../utils/api";

const EditProfile = ({ user }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: '', lastName: '',
        about: '', age: '', gender: '',
        photoURL: ''
    });

    // NEW STATE FOR FILE UPLOAD
    const [photoFile, setPhotoFile] = useState(null);

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

    // NEW FUNCTION TO HANDLE DESKTOP FILE SELECTION
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            const previewUrl = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, photoURL: previewUrl }));
        }
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        setError('');
        setIsSaving(true);

        // NEW: PACKAGE DATA AS FORMDATA FOR THE BACKEND
        const submitData = new FormData();
        submitData.append("firstName", formData.firstName);
        submitData.append("lastName", formData.lastName);
        if (formData.age) submitData.append("age", formData.age);
        if (formData.gender) submitData.append("gender", formData.gender);
        if (formData.about) submitData.append("about", formData.about);

        if (photoFile) {
            submitData.append("photo", photoFile);
        }

        try {
            const res = await api.patch(`/profile/edit`, submitData, {
                withCredentials: true
            });
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
            <div className="min-h-[85vh] p-4 flex flex-col items-center justify-center">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-base-content tracking-tight">Edit Profile</h1>
                    <p className="text-base-content/70 text-sm mt-1">Update your personal information</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-base-100/80 backdrop-blur-xl border border-base-200 shadow-2xl rounded-3xl p-8"
                    >
                        <h2 className="text-xl font-bold mb-6 text-base-content">Profile Information</h2>

                        <form onSubmit={saveProfile} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-base-content/80 text-sm mb-1 block font-medium">First Name</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors" required />
                                </div>
                                <div>
                                    <label className="text-base-content/80 text-sm mb-1 block font-medium">Last Name</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-base-content/80 text-sm mb-1 block font-medium">Gender</label>
                                    <select name="gender" value={formData.gender} onChange={handleChange} className="select select-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors">
                                        <option value="" disabled>Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-base-content/80 text-sm mb-1 block font-medium">Age</label>
                                    <input type="number" name="age" value={formData.age} onChange={handleChange} className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors" />
                                </div>
                            </div>

                            <div>
                                <label className="text-base-content/80 text-sm mb-1 block font-medium">About</label>
                                <textarea name="about" value={formData.about} onChange={handleChange} className="textarea textarea-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors h-24" placeholder="Tell us about your tech stack and interests..."></textarea>
                            </div>

                            {/* 👉 THIS IS THE MAGIC LINE: type="file" 👈 */}
                            <div>
                                <label className="text-base-content/80 text-sm mb-1 block font-medium">Profile Picture</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="file-input file-input-bordered file-input-primary w-full bg-base-200/50"
                                />
                            </div>

                            {error && (
                                <div className="alert alert-error text-sm py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary w-full shadow-lg hover:shadow-primary/30 mt-4" disabled={isSaving}>
                                {isSaving ? <span className="loading loading-spinner"></span> : "Save Changes"}
                            </button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-start overflow-hidden"
                    >
                        <h3 className="text-lg font-bold mb-6 text-base-content">Live Preview</h3>
                        <div className="w-full max-w-sm">
                            <Usercard user={formData} />
                        </div>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {showToast && (
                    <motion.div className="toast toast-top toast-center z-50" initial={{ opacity: 0, y: -60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -60 }}>
                        <div className="alert alert-success shadow-xl font-medium">
                            <span>Profile updated successfully!</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
export default EditProfile;