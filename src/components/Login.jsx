import axios from 'axios'
import { useState } from 'react';
import { addUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { useNavigate } from 'react-router';

const Login = () => {
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/login', {
        emailId,
        password
      }, { withCredentials: true });
      dispatch(addUser(res.data));
      return navigate('/');
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className='flex justify-center my-10'>
      <div className="card card-border bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className='gap-3'>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <p className='text-red-600'>{error}</p>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mt-3">Password</span>
              </div>
              <p className='text-red-600'>{error}</p>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
