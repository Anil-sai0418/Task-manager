import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../context/usercontext';

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

  function handleInput(event) {
    setusercreds((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  async function handlesubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
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
        navigate("/dashboard");
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <section className="border border-gray-300 rounded-lg p-8 shadow-lg bg-black w-full max-w-md">
        <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
          <h1 className="text-2xl font-bold text-center text-white">Login here!</h1>
          
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={usercreds.email}
            onChange={handleInput}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-white-400 text-white bg-transparent"
          />
          
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={usercreds.password}
            onChange={handleInput}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-white-400 text-white bg-transparent"
          />

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded">
            Login
          </button>

          {message.text && (
            <p className={`text-center font-medium ${message.type === "error" ? "text-red-400" : "text-green-400"}`}>
              {message.text}
            </p>
          )}

          <p className="text-white text-center">
            Don't have an account? <Link to="/register" className="text-blue-500">Register now</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

