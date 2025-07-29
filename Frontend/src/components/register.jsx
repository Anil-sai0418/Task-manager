import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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
    
    fetch("https://task-manager-by-anil.onrender.com/register", {
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
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-12">
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white text-black rounded-xl border border-gray-200 p-10 shadow-xl"
        >
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center mb-2">Create your account</h1>
            <p className="text-center text-sm mb-6 text-gray-500 tracking-wide">
              Start managing your tasks smarter.
            </p>
            
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={userDetails.name}
              onChange={handleInput}
              className="border border-gray-300 p-3 rounded tracking-wide text-sm shadow-sm focus:shadow-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            />
            
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={userDetails.email}
              onChange={handleInput}
              className="border border-gray-300 p-3 rounded tracking-wide text-sm shadow-sm focus:shadow-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            />
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                minLength={6}
                maxLength={20}
                value={userDetails.password}
                onChange={handleInput}
                className="border border-gray-300 p-3 pr-10 rounded tracking-wide text-sm shadow-sm focus:shadow-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white w-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-black"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded tracking-wide text-sm shadow-sm focus:shadow-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white w-full"
              required
            />
            
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded shadow-md hover:shadow-lg uppercase tracking-wider text-sm transition duration-150"
            >
              Register
            </button>
            
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
            
            {message.text && (
              <div
                className={`text-center text-sm p-2 rounded font-medium shadow-sm ${
                  message.type === "success" 
                    ? "text-green-500 bg-green-900/20" 
                    : "text-red-500 bg-red-900/20"
                }`}
              >
                {message.text}
              </div>
            )}
          </form>
        </motion.section>
      </div>
    </>
  )
}