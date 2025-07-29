import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../context/usercontext';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

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
      const response = await fetch("https://task-manager-by-anil.onrender.com/login", {
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
        alert("Successfully logged in");
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
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl border border-gray-200 p-10 shadow-xl text-black"
      >
        <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
          <h1 className="text-3xl font-bold text-center mb-2 tracking-wide">Welcome back</h1>
          <p className="text-center text-sm mb-6 text-gray-500 tracking-wide">
            Please enter your credentials to login.
          </p>
          
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={usercreds.email}
            onChange={handleInput}
            className="border border-gray-300 text-black rounded p-2 tracking-wide text-sm shadow-sm focus:shadow-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              value={usercreds.password}
              onChange={handleInput}
              className="border border-gray-300 text-black rounded p-2 pr-10 tracking-wide text-sm shadow-sm focus:shadow-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded uppercase tracking-wider text-sm shadow-md hover:shadow-lg transition duration-150">
            Login
          </button>

          {message.text && (
            <p className={`text-center font-medium ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
              {message.text}
            </p>
          )}

          <p className="text-center text-sm text-gray-600">
            Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register now</Link>
          </p>
        </form>
      </motion.section>
    </div>
  );
}
