import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import api from "../utils/api";
import { motion } from 'framer-motion';
import './Body.css';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    // No need to fetch if user data already exists in the Redux store
    if (userData) return;

    try {
      const res = await api.get('/profile/view', {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      // It's better to check error.response for network errors
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        // Navigate to login for other errors as a fallback
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="body-container">
      <Navbar />
      {/* The motion.main component will animate its children */}
      <motion.main
        className="content-wrap"
        initial={{ opacity: 0, y: 20 }} // Start invisible and slightly down
        animate={{ opacity: 1, y: 0 }}   // Animate to visible and original position
        exit={{ opacity: 0, y: -20 }}   // Animate out by fading and moving up
        transition={{ duration: 0.5, ease: "easeInOut" }} // Animation timing
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
};

export default Body;