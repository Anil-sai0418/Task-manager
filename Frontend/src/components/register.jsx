import { Link } from "react-router-dom"
export default function Register(){
    return(
        <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <section className="border border-gray-300 rounded-lg p-8 shadow-lg bg-black w-full max-w-md">
    <form className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-center text-white text-gray-800">Register Here!</h1>

      <input
        type="text"
        placeholder="Enter name"
        name="name"
        className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-while-400 text-white"
      />

      <input
        type="email"
        placeholder="Enter email"
        name="email"
        className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-while-400 text-white"
      />

      <input
        type="password"
        placeholder="Enter password"
        name="password"
        className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-white-400 text-white"
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
    </form>
  </section>
</div>


        </>
    )
}