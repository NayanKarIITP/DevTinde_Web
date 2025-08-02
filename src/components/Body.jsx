import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet,useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import axios from 'axios'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user);

  const fetchUser = async()=>{
    if(userData) return;
    try {
      const res=await axios.get(BASE_URL+'/profile/view', {
        withCredentials:true
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if(error.status===401){
        navigate('/login');
      }
      else return navigate('/SomethingWentWrong');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
