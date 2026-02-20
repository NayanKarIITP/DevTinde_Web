// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addFeed } from "../utils/feedSlice";
// import Usercard from "./Usercard";
// import api from "../utils/api";

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   const dispatch = useDispatch();

//   const getFeed = async () => {
//     if (feed) return;

//     try {
//       const res = await api.get("/feed");
//       dispatch(addFeed(res.data));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);

//   if (!feed) return null;

//   if (feed.length <= 0) {
//     return (
//       <h1 className="text-center text-white text-2xl mt-7">
//         There are no users
//       </h1>
//     );
//   }

//   return (
//     <div className="flex justify-center my-10">
//       <Usercard user={feed[0]} />
//     </div>
//   );
// };

// export default Feed;







import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Usercard from "./Usercard";
import api from "../utils/api";
import { motion } from "framer-motion";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await api.get("/feed");
      dispatch(addFeed(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );
  }

  if (feed.length <= 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center items-center min-h-[70vh]"
      >
        <div className="text-center p-12 bg-base-100/50 backdrop-blur-lg rounded-3xl border border-base-300 shadow-xl max-w-md">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-2xl font-bold mb-2">You're all caught up!</h1>
          <p className="text-base-content/70">Check back later for more developers in your area, or update your profile to increase your reach.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex justify-center my-10 min-h-[70vh] items-center"
    >
      <Usercard user={feed[0]} />
    </motion.div>
  );
};

export default Feed;