// import React, { useEffect } from 'react'
// import api from "../utils/api";
// import { useSelector, useDispatch } from 'react-redux'
// import { BASE_URL } from '../utils/constants'
// import { addFeed } from '../utils/feedSlice';
// import Usercard from './Usercard'
// import api from "../utils/api";

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   const dispatch = useDispatch();

//   const getFeed = async() => {
//     if (feed) return;
//     try {
//       const res= await api.get(BASE_URL+'/feed',{withCredentials:true});
//       dispatch(addFeed(res.data));
//     } catch (error) {
//       //TODO: Handle error
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);

//   if(!feed) return;

//   if(feed.length <=0) return <h1 className='text-center text-white text-2xl mt-7'>There are no users</h1>;
//   return (
//     feed?.length > 0  &&(
//     <div className='flex justify-center my-10'>
//       <Usercard user={feed[0]}/>
//     </div>
//     )
//   )
// }

// export default Feed;







import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Usercard from "./Usercard";
import api from "../utils/api"; // ✅ ONLY ONE api import

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await api.get("/feed"); // ✅ NO BASE_URL
      dispatch(addFeed(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length <= 0) {
    return (
      <h1 className="text-center text-white text-2xl mt-7">
        There are no users
      </h1>
    );
  }

  return (
    <div className="flex justify-center my-10">
      <Usercard user={feed[0]} />
    </div>
  );
};

export default Feed;
