import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import API_BASE_URL from '../config/api';

export default function Register(){
  const [userDetails, setUserDetails] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({
    type: "",
    text: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  function handleInput(event) {
    setUserDetails((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    // Clear any previous messages
    setMessage({ type: "", text: "" });

    if (userDetails.password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }
    
    // Basic validation
    if (!userDetails.name || !userDetails.email || !userDetails.password) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    console.log(userDetails);
    
    fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }
        
        // Show success message
        setMessage({ type: "success", text: data.message || "Registration successful! Please login." });
        
        // Wait and then clear form and navigate
        setTimeout(() => {
          setUserDetails({ name: "", password: "", email: "" });
          setConfirmPassword("");
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        console.log("Error", err);
        setMessage({ 
          type: "error", 
          text: err.message || "Registration failed. Please try again." 
        });
      });
  }

  return(
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#050b14] px-4 py-12">
        <motion.section
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-[#070f1f] rounded-xl border border-cyan-400/40 shadow-[0_0_40px_rgba(56,189,248,0.35)] overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
         
          <form className="relative z-10 w-full p-10 flex flex-col gap-5 text-white" onSubmit={handleSubmit}>
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-semibold mb-6 tracking-wider"
            >
              Register
            </motion.h1>
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm mb-6 text-gray-400 tracking-wide"
            >
              Start managing your tasks smarter.
            </motion.p>
            
            <motion.input
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              type="text"
              placeholder="Enter name"
              name="name"
              value={userDetails.name}
              onChange={handleInput}
              className="w-full bg-transparent border-b border-cyan-400/50 text-white placeholder-gray-400 py-2 tracking-wide text-sm focus:outline-none focus:border-cyan-300"
              required
            />
            
            <motion.input
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              type="email"
              placeholder="Enter email"
              name="email"
              value={userDetails.email}
              onChange={handleInput}
              className="w-full bg-transparent border-b border-cyan-400/50 text-white placeholder-gray-400 py-2 tracking-wide text-sm focus:outline-none focus:border-cyan-300"
              required
            />
            
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                minLength={6}
                maxLength={20}
                value={userDetails.password}
                onChange={handleInput}
                className="w-full bg-transparent border-b border-cyan-400/50 text-white placeholder-gray-400 py-2 tracking-wide text-sm focus:outline-none focus:border-cyan-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-cyan-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </motion.div>
            
            <motion.input
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent border-b border-cyan-400/50 text-white placeholder-gray-400 py-2 tracking-wide text-sm focus:outline-none focus:border-cyan-300"
              required
            />
            
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="mt-6 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-full tracking-wider shadow-[0_0_25px_rgba(56,189,248,0.6)] transition"
            >
              Register
            </motion.button>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center text-sm text-gray-400 mt-6"
            >
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </motion.p>
            
            {message.text && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`text-center text-sm p-2 rounded font-medium mt-4 ${
                  message.type === "success"
                    ? "text-green-400 bg-green-900/20"
                    : "text-red-400 bg-red-900/20"
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </form>
        </motion.section>
      </div>
    </>
  )
}