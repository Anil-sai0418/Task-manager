import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../context/Usercontext';
import { toast } from 'sonner';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import API_BASE_URL from '../config/api';


export default function Login() {
  const { loggedUser, setloggedUser } = useContext(UserContext);
  console.log(loggedUser)

  const navigate = useNavigate();

  const [usercreds, setusercreds] = useState({
    email: "",
    password: ""
  });

  const [message, setmessage] = useState({
    type: "",
    text: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleInput(event) {
    setusercreds((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  async function handlesubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify(usercreds),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.status === 404) {
        setmessage({ type: "error", text: "Username or email does not exist!" });
      } else if (response.status === 403) {
        setmessage({ type: "error", text: "Incorrect password" });
      } else if (response.status === 200) {
        toast.success("Successfully logged in");
        setmessage({ type: "success", text: "Successfully logged in" });
        localStorage.setItem("account-user", JSON.stringify(data));
        setloggedUser(data);
        setusercreds({ email: "", password: "" });
        navigate("/home");
      }

      setTimeout(() => {
        setmessage({ type: "", text: "" });
      }, 3000);
    } catch (err) {
      setmessage({ type: "error", text: "Something went wrong!" });
      console.error("Login error:", err);
      setTimeout(() => setmessage({ type: "", text: "" }), 3000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050b14] px-4">
      <motion.section
        initial={{ opacity: 0, rotateY: -90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-4xl bg-[#070f1f] rounded-xl border border-cyan-400/40 shadow-[0_0_40px_rgba(56,189,248,0.35)] overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
    
        <form className="relative z-10 w-full md:w-1/2 p-12 flex flex-col gap-5 text-white" onSubmit={handlesubmit}>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-semibold mb-6 tracking-wider"
          >
            Login
          </motion.h1>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm mb-8 text-gray-400 tracking-wide"
          >
            Please enter your credentials to login.
          </motion.p>
          
          <motion.input
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            type="email"
            placeholder="Enter email"
            name="email"
            value={usercreds.email}
            onChange={handleInput}
            className="w-full bg-transparent border-b border-cyan-400/50 text-white placeholder-gray-400 py-2 tracking-wide text-sm focus:outline-none focus:border-cyan-300"
          />
          
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              value={usercreds.password}
              onChange={handleInput}
              className="w-full bg-transparent border-b border-cyan-400/50 text-white placeholder-gray-400 py-2 tracking-wide text-sm focus:outline-none focus:border-cyan-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-cyan-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </motion.div>

          <motion.button 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="mt-6 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-full tracking-wider shadow-[0_0_25px_rgba(56,189,248,0.6)] transition"
          >
            Login
          </motion.button>

          {message.text && (
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`text-center font-medium ${message.type === "error" ? "text-red-500" : "text-green-500"}`}
            >
              {message.text}
            </motion.p>
          )}

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-sm text-gray-400 mt-6"
          >
            Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register now</Link>
          </motion.p>
        </form>
      </motion.section>
    </div>
  );
}
