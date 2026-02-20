
import api from "../utils/api";
import { useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Minimalist Icons for Password Rules
const CheckCircle = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const EmptyCircle = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" strokeWidth="2" /></svg>;

/* PASSWORD VALIDATION */
const validatePassword = (password) => {
  return {
    minLength: password.length >= 6,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };
};

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordRules = validatePassword(formData.password);
  const isPasswordStrong = Object.values(passwordRules).every(Boolean);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!isLoginForm && !isPasswordStrong) {
      setError("Please ensure your password meets all strength requirements.");
      setIsLoading(false);
      return;
    }

    const endpoint = isLoginForm ? "/login" : "/sign";
    const payload = isLoginForm
      ? { emailId: formData.emailId, password: formData.password }
      : formData;

    try {
      const res = await api.post(endpoint, payload, {
        withCredentials: true,
      });

      dispatch(addUser(isLoginForm ? res.data : res.data.data));
      navigate(isLoginForm ? "/" : "/profile");
    } catch (err) {
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
    setError("");
    setFormData({ firstName: "", lastName: "", emailId: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200 relative overflow-hidden">
      
      {/* Abstract Background Blobs for Premium Feel */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="card w-full max-w-md bg-base-100/80 backdrop-blur-2xl shadow-2xl border border-base-100 z-10"
      >
        <div className="card-body p-8">
          
          {/* Branding Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5z" clipRule="evenodd" /></svg>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-base-content">
              {isLoginForm ? "Welcome Back" : "Join TechTribe"}
            </h2>
            <p className="text-base-content/60 mt-2 text-sm">
              {isLoginForm ? "Enter your details to access your network." : "Connect with developers worldwide."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLoginForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-4 overflow-hidden"
                >
                  <div className="form-control">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="input input-bordered bg-base-200/50 focus:bg-base-100 transition-colors w-full"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="input input-bordered bg-base-200/50 focus:bg-base-100 transition-colors w-full"
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="form-control">
              <input
                type="email"
                name="emailId"
                placeholder="Email Address"
                value={formData.emailId}
                onChange={handleChange}
                className="input input-bordered bg-base-200/50 focus:bg-base-100 transition-colors w-full"
                required
              />
            </div>

            <div className="form-control">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered bg-base-200/50 focus:bg-base-100 transition-colors w-full"
                required
              />

              {/* Polished Password Rules */}
              {!isLoginForm && (
                <div className="mt-3 p-3 rounded-xl bg-base-200/50 border border-base-300 text-sm space-y-2">
                  <p className="text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">Password Requirements</p>
                  <p className={`flex items-center gap-2 transition-colors duration-300 ${passwordRules.minLength ? "text-base-content" : "text-base-content/50"}`}>
                    {passwordRules.minLength ? <CheckCircle /> : <EmptyCircle />} Minimum 6 characters
                  </p>
                  <p className={`flex items-center gap-2 transition-colors duration-300 ${passwordRules.lowercase ? "text-base-content" : "text-base-content/50"}`}>
                    {passwordRules.lowercase ? <CheckCircle /> : <EmptyCircle />} One lowercase letter
                  </p>
                  <p className={`flex items-center gap-2 transition-colors duration-300 ${passwordRules.uppercase ? "text-base-content" : "text-base-content/50"}`}>
                    {passwordRules.uppercase ? <CheckCircle /> : <EmptyCircle />} One uppercase letter
                  </p>
                  <p className={`flex items-center gap-2 transition-colors duration-300 ${passwordRules.number ? "text-base-content" : "text-base-content/50"}`}>
                    {passwordRules.number ? <CheckCircle /> : <EmptyCircle />} One number
                  </p>
                </div>
              )}
            </div>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="alert alert-error shadow-sm text-sm py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
              </motion.div>
            )}

            <button type="submit" className="btn btn-primary w-full shadow-lg hover:shadow-primary/30 mt-2" disabled={isLoading}>
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : isLoginForm ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="divider mt-6 text-base-content/40 text-sm">OR</div>

          <p className="text-center text-sm text-base-content/70">
            {isLoginForm ? "Don't have an account? " : "Already have an account? "}
            <span
              onClick={toggleForm}
              className="font-bold text-primary hover:text-primary-focus hover:underline cursor-pointer transition-colors"
            >
              {isLoginForm ? "Sign Up" : "Log In"}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;