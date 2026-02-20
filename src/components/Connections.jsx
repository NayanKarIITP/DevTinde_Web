
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import api from "../utils/api";
import { useEffect } from 'react';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 

const Connections = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
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

  // 1. Consistent Loading State
  if (!connection) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  // 2. Premium Glassmorphism Empty State
  if (connection.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[70vh] flex items-center justify-center p-4"
      >
        <div className='text-center p-12 bg-base-100/50 backdrop-blur-md border border-base-200 rounded-3xl max-w-lg w-full shadow-xl'>
          <div className="text-5xl mb-4">🤝</div>
          <h1 className='text-2xl font-bold mb-2'>No Connections Yet</h1>
          <p className='text-base-content/70'>Head over to your feed and start swiping to build your network!</p>
          <Link to="/" className="btn btn-primary mt-6">Discover Developers</Link>
        </div>
      </motion.div>
    );
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1 },
  };

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[80vh]'>
      <div className="text-center mb-12">
        <h1 className='text-4xl sm:text-5xl font-black tracking-tight'>Your Network</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-base-content/60">
          Connect, chat, and build relationships.
        </p>
      </div>

      {/* 3. Responsive Grid Layout */}
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {connection.map((person) => {
          const { _id, firstName, lastName, photoURL, about } = person;
          
          return (
            // 4. Modern, Glassmorphism Profile Card
            <motion.div key={_id} variants={cardVariants}>
              <Link 
                to={"/chat/" + _id} 
                className="card bg-base-100/80 backdrop-blur-lg border border-base-200 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 ease-in-out transform hover:-translate-y-2 block group h-full"
              >
                <figure className="px-10 pt-10">
                  <div className="avatar">
                    <div className="w-28 rounded-full ring-4 ring-primary/20 group-hover:ring-primary/50 transition-all ring-offset-base-100 ring-offset-4">
                      <img 
                        src={photoURL || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`} 
                        alt={`${firstName} ${lastName}`} 
                      />
                    </div>
                  </div>
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-xl font-bold group-hover:text-primary transition-colors">
                    {`${firstName} ${lastName}`}
                  </h2>
                  <p className="text-base-content/70 text-sm line-clamp-2 h-10 my-2">
                    {about || "This user hasn't added a bio yet."}
                  </p>
                  <div className="card-actions mt-4 w-full">
                    <button className='btn btn-primary w-full group-hover:scale-[1.02] transition-transform'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                        <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                      </svg>
                      Message
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