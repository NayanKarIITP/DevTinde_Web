// import { useDispatch, useSelector } from 'react-redux'
// import { BASE_URL } from '../utils/constants'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { addConnections } from '../utils/connectionSlice'
// import { Link } from 'react-router-dom'

// const Connections = () => {
//   const connection = useSelector((store) => store.connection);
//   const dispatch = useDispatch();

//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
//       dispatch(addConnections(res.data.data));
//     } catch (error) {
//       //Handle Error case
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   if (!connection) return <h1>Loading...</h1>;
//   if (connection.length === 0) return <h1>No Connections</h1>;

//   return (
//     <div className='text-center my-10'>
//       <h1 className='text-bold text-white text-3xl'>Connections</h1>

//       {connection.map((connection) => {
//         const { _id,firstName, lastName, photoURL, age,gender, about } = connection;

//         // And then explicitly return the JSX
//         return (
//           <div key={_id} className='flex justify-between m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
//             <div><img className='w-20 h-20 rounded-full' src={photoURL} alt="Photo" /></div>
//             <div className='text-left mx-4'>
//               <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
//               {age && gender && <p>{age + ", " + gender}</p>}
//               <p>{about}</p></div>
//               <Link to={"/chat/"+_id}><button className='btn btn-primary'>Chat</button></Link>
//           </div>
          
//         );
//       })}
//     </div>
//   );
// };


// export default Connections





import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import api from "../utils/api";
import { useEffect } from 'react';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animations

const Connections = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    // Avoid re-fetching if connections are already loaded
    if (connection && connection.length > 0) return;
    try {
      const res = await api.get('/user/connections', { withCredentials: true });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Failed to fetch connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // 1. Enhanced Loading State
  if (!connection) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  // 2. Enhanced Empty State
  if (connection.length === 0) {
    return (
      <div className='text-center my-10 p-10 bg-base-200 rounded-2xl max-w-lg mx-auto shadow-md'>
        <h1 className='text-3xl font-bold mb-3'>No Connections Found</h1>
        <p className='text-base-content/70'>Start networking to see your connections here!</p>
      </div>
    );
  }
  
  // Animation variants for the container and cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Animates each card one by one
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };


  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className="text-center mb-12">
        <h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight'>Your Network</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-base-content/70">
          Connect, chat, and build relationships.
        </p>
      </div>

      {/* 3. Responsive Grid Layout with Staggered Animation */}
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {connection.map((person) => {
          const { _id, firstName, lastName, photoURL, about } = person;
          
          return (
            // 4. Modern, Clickable Profile Card
            <motion.div key={_id} variants={cardVariants}>
              <Link to={"/chat/" + _id} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 block group">
                <figure className="px-10 pt-10">
                  <img 
                    src={photoURL} 
                    alt={`${firstName} ${lastName}`} 
                    className="rounded-full w-28 h-28 object-cover ring ring-primary ring-offset-base-100 ring-offset-4" 
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-xl font-bold group-hover:text-primary transition-colors">
                    {`${firstName} ${lastName}`}
                  </h2>
                  <p className="text-base-content/70 text-sm line-clamp-2 h-10 my-2">
                    {about || "This user hasn't added a bio yet."}
                  </p>
                  <div className="card-actions mt-2">
                    <button className='btn btn-primary btn-sm'>
                      Send Message
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Connections;