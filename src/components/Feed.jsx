import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Usercard from "./Usercard";
import api from "../utils/api";

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
