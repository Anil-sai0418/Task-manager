import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Create Task</h2>
        <p className="mb-4">Create new tasks to manage your work.</p>
        <button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200">
          Get Started
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Track Task</h2>
        <p className="mb-4">Track the progress of your tasks.</p>
        <button
          onClick={() => navigate("/track")}
          className="w-full h-10 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors duration-200"
        >
          Get Started
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Manage Task</h2>
        <p className="mb-4">Manage and update your existing tasks.</p>
        <button className="w-full h-10 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors duration-200">
          Get Started
        </button>
      </div>
    </div>
  );
}