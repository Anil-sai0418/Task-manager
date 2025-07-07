import { Link } from "react-router-dom"
import { useState } from "react";
export default function Register(){
  const [userDetails, setUserDetails] = useState({
    name: "",
    password: "",
    email: "",
    

  });
  const[message,setmessage] = useState({
    type:" ",
    text :""
  })
  function handleinput(event) {
    setUserDetails((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function handlesubmit(event) {
    event.preventDefault();
    console.log(userDetails);

    fetch("http://localhost:8000/register", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) =>{
        setmessage({ type: "success", text: data.message });
        
        setUserDetails({ name: "", password: "", email: "" });

        setTimeout(()=>{
            console.log("going")
        },3000)

      })
      .catch((err) =>{
        console.log("Error",err)
       setmessage({ type: "error", text: "Registration failed. Try again." })

      });
  }

    return(
        <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <section className="border border-gray-300 rounded-lg p-8 shadow-lg bg-black w-full max-w-md">
    <form className="flex flex-col gap-5" onSubmit={handlesubmit}>
  <h1 className="text-2xl font-bold text-center text-white">Register Here!</h1>
  <input
    type="text"
    placeholder="Enter name"
    name="name"
    value={userDetails.name}
    onChange={handleinput}
    className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-white text-white"
  />

      <input
        type="email"
        placeholder="Enter email"
        name="email"
        value = {userDetails.email}
        onChange={handleinput}
        className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-while text-white"
      />

      <input
        type="password"
        placeholder="Enter password"
        name="password"
        maxLength={8}
        value={userDetails.password}
        onChange={handleinput}
        className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-white text-white"
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded"
      >
        Register
      </button>

      <p className="text-center text-sm text-gray-600 text-white">
        Already Registered?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
      {message.text && (
    <p
      className={`text-center text-sm ${
        message.type === "success" ? "text-green-400" : "text-red-400"
      }`}
    >
      {message.text}
    </p>
  )}
    </form>
  </section>
</div>


        </>
    )
}