
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom' 
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import api from "../utils/api";

const Navbar = () => {
  const user = useSelector(state => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // If we are on the login page, don't show the Navbar at all
  if (location.pathname === '/login') {
    return null; 
  }
  
  const handlelogout =async()=>{
    try {
      await api.post('/logout',{},{withCredentials:true});
      dispatch(removeUser());
      return Navigate('/login');
    } catch (error) {
      //Enter logic maybe redirect to error page
      console.log(error);
    }
  }
  return (
    <div className="sticky top-0 z-50 w-full bg-base-100/70 backdrop-blur-lg border-b border-base-200 shadow-sm">
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost text-2xl font-black tracking-tight hover:scale-105 transition-transform">
            🖥️ <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">TechTribe</span>
          </Link>
        </div>

        {user && (
          <div className="flex gap-4 items-center">
            <div className='hidden md:block font-medium text-base-content/80'>
              Welcome, <span className="text-base-content font-bold">{user.firstName}</span>
            </div>
            <div className="dropdown dropdown-end mx-4">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring ring-primary/20 hover:ring-primary/50 transition-all">
                <div className="w-10 rounded-full">
                  <img alt="User Photo" src={user.photoURL} />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-xl rounded-2xl z-1 mt-4 w-56 p-3 shadow-2xl border border-base-200 gap-1">
                <li><Link to='/profile' className="hover:bg-primary/10 rounded-xl py-3 font-medium">Profile <span className="badge badge-primary badge-sm">New</span></Link></li>
                <li><Link to='/connections' className="hover:bg-primary/10 rounded-xl py-3 font-medium">Connections</Link></li>
                <li><Link to='/requests' className="hover:bg-primary/10 rounded-xl py-3 font-medium">Requests</Link></li>
                <li><Link to='/chat/:targetUserId' className="hover:bg-primary/10 rounded-xl py-3 font-medium">Chat</Link></li>
                <div className="divider my-0"></div>
                <li><Link onClick={handlelogout} className="hover:bg-error/10 text-error rounded-xl py-3 font-bold">Logout</Link></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
