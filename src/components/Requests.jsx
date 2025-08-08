import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addRequests } from '../utils/requestSlice'
import { useState } from 'react'

const Requests = () => {
    const dispatch = useDispatch();
    const request = useSelector((store) => store.request);

    const[showButton,setShowButton] = useState(true);

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + '/request/review/' + status + "/" + _id, {}, { withCredentials: true });
        } catch (error) {
            console.log(error);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/requests/recieved', { withCredentials: true });
            dispatch(addRequests(res.data.data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])

    if (!request) return;
    if (request.length === 0) return <h1 className='text-center text-white text-2xl mt-7'>There are no request</h1>;

    return (
        <>
            <div className='text-center my-10'>
                <h1 className='text-bold text-white text-3xl'>Your recieved requests</h1>

                {request.map((request) => {
                    const { fromUserId, _id } = request;
                    const { firstName, lastName, photoURL, age, gender, about } = fromUserId;

                    // And then explicitly return the JSX
                    return (
                        <div key={_id} className='flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto'>

                            {/* Left Section: Photo + Bio */}
                            <div className='flex items-center'>
                                <img
                                    className='w-24 h-24 object-cover rounded-full border-2 border-gray-300 shadow-md'
                                    src={photoURL}
                                    alt="Profile"
                                />

                                <div className='text-left ml-6'>
                                    <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                                    {age && gender && <p className='text-sm text-gray-500'>{age + ", " + gender}</p>}
                                    <p className='text-sm'>{about}</p>
                                </div>
                            </div>

                            {/* Right Section: Action Buttons */}
                            <div className='flex-shrink-0'>
                                <button className='btn btn-primary mx-2' onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                                <button className='btn btn-secondary mx-2' onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                            </div>
                        </div>


                    );
                })}
            </div>
        </>
    )
}

export default Requests
