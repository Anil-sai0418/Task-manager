import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Bell, CopyPlus, HomeIcon, User } from "lucide-react";
// import { Button } from "./ui/button";

export default function List() {
  const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState(null);
  const [names, setNames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [, setShowMobileMenu] = useState(false);

  const openCreditModal = () => {
    setShowModal((prev) => {
      const willOpen = !prev;
      if (willOpen) {
        setDescription('');
        setAmount('');
      }
      return willOpen;
    });
    setShowMobileMenu(false);
  };

  const handleSubmitTransaction = () => {
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      alert('Please enter valid description and amount');
      return;
    }

    console.log('Credit Transaction:', {
      description: description.trim(),
      amount: parseFloat(amount),
      type: 'credit'
    });

    setShowModal(false);
    setDescription('');
    setAmount('');
  };

  const closeModal = () => {
    setShowModal(false);
    setDescription('');
    setAmount('');
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-gray-200 dark:bg-gray-900 shadow-lg px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-blue-700">List Page</div>
          <input
            type="search"
            placeholder="Search names..."
            className="w-100 px-4 py-2 ml-50  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-800 shadow-sm"
          />
        </div>
        <div className="flex items-center space-x-4 gap-10">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md shadow transition "
          >
            <HomeIcon className="w-4 h-4 " />
            Home
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md shadow transition">
            <Bell className="w-4 h-4" />
            Notifications
          </button>
          <User />
        </div>
      </nav>

      {/* Main Content */}
     
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        <main className="w-full max-w-7xl px-6 md:px-12">
          <div className="bg-gray-300 p-6 rounded-lg w-gray min-h-[600px]">
            <div className="grid gap-6 grid-cols-2">
              {names.map((name, index) => (
                <div

                
                key={index}
                onClick={() => navigate("/data")}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative cursor-pointer hover:shadow-xl transition"
              >
                {/* Edit & Delete Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  {editIndex === index ? (
                    <button
                      onClick={() => setEditIndex(null)}
                      className="bg-green-100 dark:bg-green-600 text-green-700 dark:text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-green-200"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditIndex(index)}
                      className="bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-200"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    title="Delete User"
                    className="bg-red-100 dark:bg-red-600 text-red-700 dark:text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
                {/* Name or Editable Input */}
                {editIndex === index ? (
                  <input
                    value={names[index]}
                    onChange={(e) => {
                      const updated = [...names];
                      updated[index] = e.target.value;
                      setNames(updated);
                    }}
                    className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 bg-transparent border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 ">
                    {name}
                  </h2>
                )}
                <p className="text-large text-gray-500 mb-4 ">credited at</p>
                
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center shadow hover:shadow-lg transition h-full w-full">
                    <p className="text-[16px] font-semibold text-gray-600 dark:text-gray-300">Credit 📈</p>
                    <p className="text-lg font-semibold">₹ 0</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center shadow hover:shadow-lg transition h-full w-full">
                    <p className="text-[16px] font-semibold text-gray-600 dark:text-gray-300">Debit 📉</p>
                    <p className="text-lg font-semibold">₹ 0</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg p-4 text-center shadow hover:shadow-lg transition h-full w-full">
                    <p className="text-sm font-medium">Balance</p>
                    <p className="text-lg font-semibold">₹ 0</p>
                  </div>
                </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Floating Button for Credit Modal */}
        <button
          onClick={openCreditModal}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white text-xl font-bold flex items-center justify-center rounded-full fixed bottom-10 right-10 shadow-lg transition"
        >
          <CopyPlus />
        </button>

        {/* Modal for Adding Credit */}
        {showModal && (
          <div className="fixed  inset-0  flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full shadow-xl relative">
              <h2 className="text-2xl font-bold mb-4 text-green-600">Create a New Task</h2>
              {/* Description Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter the name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Date and Time */}
              <div className="mb-6 flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                
              </div>
              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleSubmitTransaction}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition"
                >
                  Add Credit
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
    </>
  );
}