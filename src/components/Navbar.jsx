import { useSelector,useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user = useSelector(state => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handlelogout =async()=>{
    try {
      await axios.post(BASE_URL+'/logout',{},{withCredentials:true});
      dispatch(removeUser());
      return Navigate('/login');
    } catch (error) {
      //Enter logic maybe redirect to error page
      return Navigate('/SomethingWentWrong');
    }
  }
  return (
    <div>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <div className="btn btn-ghost text-xl ">
            <img src="./src/images/FinalDT.png" alt="DevTinder Logo" className="w-13 h-14" />
            <span><Link to='/'>DevTinder</Link></span>
          </div>
        </div>

        {user && (
          <div className="flex gap-2">
            <div className='form-control'>Welcome, {user.firstName}</div>
            <div className="dropdown dropdown-end X-end mx-8">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Photo"
                    src={user.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to='/profile' className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><Link to='/connections'>Connections</Link></li>
                <li><Link onClick={handlelogout}>Logout</Link></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}

export default Navbar