import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
       <section className="border border-gray-300 rounded-lg p-8 shadow-lg bg-black w-full max-w-md">
        <form className='flex flex-col gap-4'>
        <h1 className="text-2xl font-bold text-center text-white text-gray-800">Login here !</h1>
          <input type="email" placeholder="Enter email" name="email" className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-white-400 text-white" />
          <input type="password" placeholder="Enter password" name="password" className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-white-400 text-white"/>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded">Login</button>
          <p className="text-white">
            Don't have an account? <Link to='/register'className="text-blue-500">Register now</Link>
          </p>
        </form>
      </section>
      </div>
    </>
  );
}
