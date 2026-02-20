
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { BASE_URL } from '../utils/constants';
// import { addRequests } from '../utils/requestSlice';
// import { motion, AnimatePresence } from 'framer-motion';
// import api from "../utils/api";

// // --- Icon components for the buttons ---
// const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;
// const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;

// const Requests = () => {
//     const dispatch = useDispatch();
//     const requestsFromStore = useSelector((store) => store.request);
//     const [requests, setRequests] = useState([]);

//     useEffect(() => {
//         if (requestsFromStore) {
//             setRequests(requestsFromStore);
//         }
//     }, [requestsFromStore]);

//     const fetchRequests = async () => {
//         try {
//             const res = await api.get('/user/requests/recieved', { withCredentials: true });
//             dispatch(addRequests(res.data.data));
//         } catch (error) {
//             console.error("Failed to fetch requests:", error);
//         }
//     };

//     useEffect(() => {
//         fetchRequests();
//     }, []);

//     const handleReviewRequest = async (status, requestId) => {
//         // Optimistically remove the request from the UI
//         setRequests(currentRequests => currentRequests.filter(req => req._id !== requestId));
        
//         try {
//             await api.post(`/request/review/${status}/${requestId}`, {}, { withCredentials: true });
//             // On success, the state is already updated. You could add a success toast here.
//         } catch (error) {
//             console.error(`Failed to ${status} request:`, error);
//             // If the API call fails, revert the change to show the card again
//             setRequests(requestsFromStore); 
//             // Optionally show an error toast to the user
//         }
//     };

//     if (!requestsFromStore) {
//         return (
//             <div className="flex justify-center items-center min-h-[80vh]">
//                 <span className="loading loading-dots loading-lg text-primary"></span>
//             </div>
//         );
//     }
    
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 lg:p-8">
//             <div className="max-w-7xl mx-auto">
//                 <div className='text-center mb-12'>
//                     <h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight text-white'>Connection Requests</h1>
//                     <p className="mt-3 max-w-2xl mx-auto text-lg text-base-content/70">
//                         Review pending requests to grow your network.
//                     </p>
//                 </div>

//                 {requests.length === 0 ? (
//                     <div className='text-center my-10 p-10 bg-base-200/50 rounded-2xl max-w-lg mx-auto shadow-md'>
//                         <h1 className='text-3xl font-bold text-white mb-3'>No Pending Requests</h1>
//                         <p className='text-base-content/70'>Your inbox is all clear!</p>
//                     </div>
//                 ) : (
//                     <motion.div layout className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
//                         <AnimatePresence>
//                             {requests.map((request) => {
//                                 const { fromUserId, _id } = request;
//                                 const { firstName, lastName, photoURL, about } = fromUserId;

//                                 return (
//                                     <motion.div
//                                         layout
//                                         key={_id}
//                                         initial={{ opacity: 0, scale: 0.8 }}
//                                         animate={{ opacity: 1, scale: 1 }}
//                                         exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
//                                         className='card bg-base-100 shadow-xl'
//                                     >
//                                         <div className="card-body items-center text-center">
//                                             <div className="avatar">
//                                                 <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                                                     <img src={photoURL || `https://ui-avatars.com/api/?name=${firstName}+${lastName}`} alt="Profile" />
//                                                 </div>
//                                             </div>
//                                             <h2 className='card-title mt-4 text-2xl'>{`${firstName} ${lastName}`}</h2>
//                                             <p className='text-base-content/70 text-sm h-10 line-clamp-2'>{about || "No bio provided."}</p>
//                                             <div className="card-actions justify-center mt-4 w-full">
//                                                 <button className='btn btn-success flex-1' onClick={() => handleReviewRequest("accepted", _id)}>
//                                                     <CheckIcon /> Accept
//                                                 </button>
//                                                 <button className='btn btn-ghost flex-1' onClick={() => handleReviewRequest("rejected", _id)}>
//                                                     <XIcon /> Reject
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </motion.div>
//                                 );
//                             })}
//                         </AnimatePresence>
//                     </motion.div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Requests;





import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addRequests } from '../utils/requestSlice';
import { motion, AnimatePresence } from 'framer-motion';
import api from "../utils/api";

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;

const Requests = () => {
    const dispatch = useDispatch();
    const requestsFromStore = useSelector((store) => store.request);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (requestsFromStore) setRequests(requestsFromStore);
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
        setRequests(currentRequests => currentRequests.filter(req => req._id !== requestId));
        try {
            await api.post(`/request/review/${status}/${requestId}`, {}, { withCredentials: true });
        } catch (error) {
            setRequests(requestsFromStore); 
        }
    };

    if (!requestsFromStore) {
        return <div className="flex justify-center items-center min-h-[70vh]"><span className="loading loading-dots loading-lg text-primary"></span></div>;
    }
    
    return (
        <div className="min-h-[80vh] w-full p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className='text-center mb-12'>
                    <h1 className='text-4xl sm:text-5xl font-black tracking-tight'>Connection Requests</h1>
                    <p className="mt-3 max-w-2xl mx-auto text-lg text-base-content/60">Review pending requests to grow your network.</p>
                </div>

                {requests.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center my-10 p-12 bg-base-100/50 backdrop-blur-md border border-base-200 rounded-3xl max-w-lg mx-auto shadow-sm'>
                        <div className="text-5xl mb-4">📬</div>
                        <h1 className='text-2xl font-bold mb-2'>Inbox Zero</h1>
                        <p className='text-base-content/70'>You have no pending requests at the moment.</p>
                    </motion.div>
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
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        transition={{ duration: 0.2 }}
                                        className='card bg-base-100/80 backdrop-blur-lg border border-base-200 shadow-xl hover:shadow-2xl transition-all'
                                    >
                                        <div className="card-body items-center text-center">
                                            <div className="avatar mb-2">
                                                <div className="w-24 rounded-full ring-4 ring-primary/20 ring-offset-base-100 ring-offset-2">
                                                    <img src={photoURL || `https://ui-avatars.com/api/?name=${firstName}+${lastName}`} alt="Profile" />
                                                </div>
                                            </div>
                                            <h2 className='card-title text-2xl font-bold'>{`${firstName} ${lastName}`}</h2>
                                            <p className='text-base-content/70 text-sm h-10 line-clamp-2'>{about || "No bio provided."}</p>
                                            <div className="flex gap-4 w-full mt-6">
                                                <button 
                                                    className='btn btn-circle btn-error btn-outline flex-1 hover:scale-105 active:scale-95 transition-all' 
                                                    onClick={() => handleReviewRequest("rejected", _id)}>
                                                    <XIcon />
                                                </button>
                                                <button 
                                                    className='btn btn-circle btn-success btn-outline flex-1 hover:scale-105 active:scale-95 transition-all' 
                                                    onClick={() => handleReviewRequest("accepted", _id)}>
                                                    <CheckIcon />
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