// import axios from 'axios'
// import { useState } from 'react';
// import { addUser } from '../utils/userSlice'
// import { useDispatch } from 'react-redux'
// import { BASE_URL } from '../utils/constants'
// import { useNavigate } from 'react-router-dom';


// const Login = () => {
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [emailId, setEmailId] = useState('')
//   const [password, setPassword] = useState('')
//   const [isLogginForm, setIsLogginForm] = useState(true)
//   const [error, setError] = useState('')
//   const dispatch = useDispatch();
//   const navigate = useNavigate();


//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + '/login', {
//         emailId,
//         password
//       }, { withCredentials: true });
//       dispatch(addUser(res.data));
//       return navigate('/');
//     } catch (error) {
//       setError(error?.response?.data || "Something went wrong");
//       console.error(error);
//     }
//   };

//   const handleSignUp = async ()=>{
//     try {
//       const res = await axios.post(
//         BASE_URL + '/sign', {
//         firstName,
//         lastName,
//         emailId,
//         password
//       }, { withCredentials: true });
//       dispatch(addUser(res.data.data));
//       return navigate('/profile');
//     } catch (error) {
//        setError(error?.response?.data || "Something went wrong");
//       console.error(error);
//     }
//   }

//   return (
//     <div className='flex justify-center my-10'>
//       <div className="card card-border bg-base-200 w-96 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title justify-center">{isLogginForm ? "Login" : "Signup"}</h2>
//           <div className='gap-3'>

//             {!isLogginForm && (
//               <>
//                 <label className="form-control w-full max-w-xs">
//                   <div className="label">
//                     <span className="label-text">First Name</span>
//                   </div>
//                   <p className='text-red-600'>{error}</p>
//                   <input
//                     type="text"
//                     value={firstName}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setFirstName(e.target.value)}
//                   />
//                 </label>

//                 <label className="form-control w-full max-w-xs">
//                   <div className="label">
//                     <span className="label-text">Last Name</span>
//                   </div>
//                   <p className='text-red-600'>{error}</p>
//                   <input
//                     type="text"
//                     value={lastName}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setLastName(e.target.value)}
//                   />
//                 </label>
//               </>
//             )}

//             <label className="form-control w-full max-w-xs">
//               <div className="label">
//                 <span className="label-text">Email ID</span>
//               </div>
//               <p className='text-red-600'>{error}</p>
//               <input
//                 type="text"
//                 value={emailId}
//                 className="input input-bordered w-full max-w-xs"
//                 onChange={(e) => setEmailId(e.target.value)}
//               />
//             </label>

//             <label className="form-control w-full max-w-xs">
//               <div className="label">
//                 <span className="label-text mt-3">Password</span>
//               </div>
//               <p className='text-red-600'>{error}</p>
//               <input
//                 type="password"
//                 value={password}
//                 className="input input-bordered w-full max-w-xs"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </label>
//           </div>

//           <div className="card-actions justify-center py-2">
//             <button className="btn btn-primary" onClick={ isLogginForm ?handleLogin : handleSignUp}>{isLogginForm ? "Login" : "Signup"}</button>
//           </div>
//         </div>

//         <p className='text-center pointer cursor-pointer' onClick={() => setIsLogginForm(!isLogginForm)}>{isLogginForm ? "Don't have an account? Signup" : "Already have an account? Login"}
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Login



import axios from 'axios';
import { useState } from 'react';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // 🔥 Frontend weak password check for signup
        if (!isLoginForm && formData.password.length < 8) {
            setError("Password is too weak. Use at least 8 characters.");
            setIsLoading(false);
            return;
        }

        const endpoint = isLoginForm ? '/login' : '/sign';
        const payload = isLoginForm
            ? { emailId: formData.emailId, password: formData.password }
            : formData;

        try {
            const res = await axios.post(BASE_URL + endpoint, payload, {
                withCredentials: true
            });

            dispatch(addUser(isLoginForm ? res.data : res.data.data));
            navigate(isLoginForm ? '/' : '/profile');

        } catch (err) {
            // 🔥 Improved error handling → shows backend message exactly
            const errorMessage =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.response?.data?.errors?.password ||
                err.response?.data?.errors?.emailId ||
                "Unexpected error occurred.";

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
        setError('');
        setFormData({ firstName: '', lastName: '', emailId: '', password: '' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="card w-full max-w-md bg-white/10 backdrop-blur-lg shadow-2xl"
            >
                <div className="card-body">
                    <h2 className="card-title justify-center text-3xl font-bold text-white">
                        {isLoginForm ? "Welcome Back" : "Create Account"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <AnimatePresence mode="wait">
                            {!isLoginForm && (
                                <motion.div
                                    key="signup-fields"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-2 gap-4 overflow-hidden"
                                >
                                    <label className="form-control">
                                        <div className="label"><span className="label-text text-white/70">First Name</span></div>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input input-bordered w-full bg-white/10" required />
                                    </label>
                                    <label className="form-control">
                                        <div className="label"><span className="label-text text-white/70">Last Name</span></div>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input input-bordered w-full bg-white/10" required />
                                    </label>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <label className="form-control">
                            <div className="label"><span className="label-text text-white/70">Email</span></div>
                            <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} className="input input-bordered w-full bg-white/10" required />
                        </label>

                        <label className="form-control">
                            <div className="label"><span className="label-text text-white/70">Password</span></div>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} className="input input-bordered w-full bg-white/10" required />
                        </label>

                        {error && (
                            <div role="alert" className="alert alert-error text-sm">
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="card-actions justify-center pt-4">
                            <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                                {isLoading ? <span className="loading loading-spinner"></span> : (isLoginForm ? "Login" : "Sign Up")}
                            </button>
                        </div>
                    </form>

                    <p className='text-center text-sm text-white/60 mt-4'>
                        {isLoginForm ? "Don't have an account? " : "Already have an account? "}
                        <span onClick={toggleForm} className="font-bold text-primary hover:underline cursor-pointer">
                            {isLoginForm ? "Sign Up" : "Login"}
                        </span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
