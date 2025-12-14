// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { BASE_URL } from '../utils/constants'
// import { addRequests } from '../utils/requestSlice'

// const Requests = () => {
//     const dispatch = useDispatch();
//     const request = useSelector((store) => store.request);

//     const reviewRequest = async (status, _id) => {
//         try {
//             const res = await axios.post(BASE_URL + '/request/review/' + status + "/" + _id, {}, { withCredentials: true });
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const fetchRequests = async () => {
//         try {
//             const res = await axios.get(BASE_URL + '/user/requests/recieved', { withCredentials: true });
//             dispatch(addRequests(res.data.data));
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         fetchRequests();
//     }, [])

//     if (!request) return;
//     if (request.length === 0) return <h1 className='text-center text-white text-2xl mt-7'>There are no request</h1>;

//     return (
//         <>
//             <div className='text-center my-10'>
//                 <h1 className='text-bold text-white text-3xl'>Your recieved requests</h1>

//                 {request.map((request) => {
//                     const { fromUserId, _id } = request;
//                     const { firstName, lastName, photoURL, age, gender, about } = fromUserId;

//                     // And then explicitly return the JSX
//                     return (
//                         <div key={_id} className='flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto'>

//                             {/* Left Section: Photo + Bio */}
//                             <div className='flex items-center'>
//                                 <img
//                                     className='w-24 h-24 object-cover rounded-full border-2 border-gray-300 shadow-md'
//                                     src={photoURL}
//                                     alt="Profile"
//                                 />

//                                 <div className='text-left ml-6'>
//                                     <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
//                                     {age && gender && <p className='text-sm text-gray-500'>{age + ", " + gender}</p>}
//                                     <p className='text-sm'>{about}</p>
//                                 </div>
//                             </div>

//                             {/* Right Section: Action Buttons */}
//                             <div className='flex-shrink-0'>
//                                 <button className='btn btn-primary mx-2' onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
//                                 <button className='btn btn-secondary mx-2' onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
//                             </div>
//                         </div>

//                     );
//                 })}
//             </div>
//         </>
//     )
// }

// export default Requests





import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { addRequests } from '../utils/requestSlice';
import { motion, AnimatePresence } from 'framer-motion';
import api from "../utils/api";

// --- Icon components for the buttons ---
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;

const Requests = () => {
    const dispatch = useDispatch();
    const requestsFromStore = useSelector((store) => store.request);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (requestsFromStore) {
            setRequests(requestsFromStore);
        }
    }, [requestsFromStore]);

    const fetchRequests = async () => {
        try {
            const res = await api.get('/user/requests/recieved', { withCredentials: true });
            dispatch(addRequests(res.data.data));
        } catch (error) {
            console.error("Failed to fetch requests:", error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleReviewRequest = async (status, requestId) => {
        // Optimistically remove the request from the UI
        setRequests(currentRequests => currentRequests.filter(req => req._id !== requestId));
        
        try {
            await api.post(`/request/review/${status}/${requestId}`, {}, { withCredentials: true });
            // On success, the state is already updated. You could add a success toast here.
        } catch (error) {
            console.error(`Failed to ${status} request:`, error);
            // If the API call fails, revert the change to show the card again
            setRequests(requestsFromStore); 
            // Optionally show an error toast to the user
        }
    };

    if (!requestsFromStore) {
        return (
            <div className="flex justify-center items-center min-h-[80vh]">
                <span className="loading loading-dots loading-lg text-primary"></span>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className='text-center mb-12'>
                    <h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight text-white'>Connection Requests</h1>
                    <p className="mt-3 max-w-2xl mx-auto text-lg text-base-content/70">
                        Review pending requests to grow your network.
                    </p>
                </div>

                {requests.length === 0 ? (
                    <div className='text-center my-10 p-10 bg-base-200/50 rounded-2xl max-w-lg mx-auto shadow-md'>
                        <h1 className='text-3xl font-bold text-white mb-3'>No Pending Requests</h1>
                        <p className='text-base-content/70'>Your inbox is all clear!</p>
                    </div>
                ) : (
                    <motion.div layout className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        <AnimatePresence>
                            {requests.map((request) => {
                                const { fromUserId, _id } = request;
                                const { firstName, lastName, photoURL, about } = fromUserId;

                                return (
                                    <motion.div
                                        layout
                                        key={_id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                                        className='card bg-base-100 shadow-xl'
                                    >
                                        <div className="card-body items-center text-center">
                                            <div className="avatar">
                                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img src={photoURL || `https://ui-avatars.com/api/?name=${firstName}+${lastName}`} alt="Profile" />
                                                </div>
                                            </div>
                                            <h2 className='card-title mt-4 text-2xl'>{`${firstName} ${lastName}`}</h2>
                                            <p className='text-base-content/70 text-sm h-10 line-clamp-2'>{about || "No bio provided."}</p>
                                            <div className="card-actions justify-center mt-4 w-full">
                                                <button className='btn btn-success flex-1' onClick={() => handleReviewRequest("accepted", _id)}>
                                                    <CheckIcon /> Accept
                                                </button>
                                                <button className='btn btn-ghost flex-1' onClick={() => handleReviewRequest("rejected", _id)}>
                                                    <XIcon /> Reject
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Requests;