import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function List() {
    const navigate = useNavigate();
    const [editIndex, setEditIndex] = useState(null);
    const [names, setNames] = useState(["Abhishek", "Anil", "Bharani"]);
    return (
        <>
            <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 fixed w-full top-0 z-50 text-gray-800 dark:text-white">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold">List Page</div>
                </div>
            </nav>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
              <main className="text-gray-800 dark:text-white w-[70%] pt-20 px-4 md:px-20">
                <div className="grid gap-6 p-6 bg-[#f5f7fb] dark:bg-gray-950 max-w-7xl mx-auto w-full">
                    {names.map((name, index) => (
                        <div
                          key={index}
                          onClick={() => navigate("/data")}
                          className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 relative text-gray-800 dark:text-white hover:ring-2 hover:ring-blue-400 transition"
                        >
                            <div className="absolute top-4 right-4 flex gap-6" onClick={e => e.stopPropagation()}>
                                {editIndex === index ? (
                                  <button
                                    onClick={() => setEditIndex(null)}
                                    className="flex items-center gap-1 px-7 py-1.5 rounded-md bg-green-100 dark:bg-green-600 text-sm text-green-700 dark:text-white font-medium"
                                  >
                                    Save
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => setEditIndex(index)}
                                    className="flex items-center gap-1 px-7 py-1.5 rounded-md bg-blue-100 dark:bg-blue-600 text-sm text-blue-700 dark:text-white font-medium"
                                  >
                                    Edit
                                  </button>
                                )}
                                <button title="Delete User" className="flex items-center gap-1 px-5 py-1.5 rounded-md bg-red-100 dark:bg-red-600 text-sm text-red-700 dark:text-white font-medium">
                                     Delete
                                </button>
                            </div>
                            {editIndex === index ? (
                              <input
                                value={names[index]}
                                onChange={(e) => {
                                  const updated = [...names];
                                  updated[index] = e.target.value;
                                  setNames(updated);
                                }}
                                className="text-2xl font-bold text-left text-blue-700  mb-4 bg-transparent border-b "
                                onClick={e => e.stopPropagation()}
                              />
                            ) : (
                              <div className="text-2xl font-bold text-left text-blue-700 dark:text-blue-400 mb-4">
                                {name}
                              </div>
                            )}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                                    <p className="text-[18px] font-bold text-gray-600 dark:text-gray-300 ">Credit 📈</p>
                                    <p className="text-lg font-semibold">₹ 0</p>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                                    <p className="text-[18px] font-bold text-gray-600 dark:text-gray-300">Debit 📉</p>
                                    <p className="text-lg font-semibold">₹ 0</p>
                                </div>
                                <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg p-4 text-center shadow-md">
                                    <p className="text-sm font-medium">Balance</p>
                                    <p className="text-lg font-semibold">₹ 0</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
              </main>
            </div>
        </>
    );
}