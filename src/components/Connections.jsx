import { useDispatch, useSelector } from 'react-redux'
import React, { use } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      //Handle Error case
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connection) return <h1>Loading...</h1>;
  if (connection.length === 0) return <h1>No Connections</h1>;

  return (
    <div className='text-center my-10'>
      <h1 className='text-bold text-amber-50 text-3xl'>Connections</h1>

      {connection.map((connection) => {
        const { firstName, lastName, photoURL, age,gender, about } = connection;

        // And then explicitly return the JSX
        return (
          <div className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
            <div><img className='w-20 h-20 rounded-full' src={photoURL} alt="Photo" /></div>
            <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p></div>
          </div>
        );
      })}
    </div>
  );
};


export default Connections
