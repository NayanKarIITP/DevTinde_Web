import React from 'react'
import EditProfile from './EditProfile'
import { useSelector, useDispatch } from 'react-redux'


const profile = () => {
  const user = useSelector((store) => store.user);
  
  return (
    user && (
      <div>
        <h1>Profile</h1>
        <EditProfile user={user} />
      </div>
    )
  )
}

export default profile
