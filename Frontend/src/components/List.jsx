import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Bell, CopyPlus, HomeIcon, User, Camera, Map, MapPin } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "./ui/button";

export default function List() {
  const navigate = useNavigate();
  const [editModalTask, setEditModalTask] = useState(null);
  const [names, setNames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [, setShowMobileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const localStorage1 = localStorage.getItem("account-user")
  const localStorage2 = JSON.parse(localStorage1)
  console.log(localStorage2)

  // User dropdown/profile states and ref
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Anil Sai',
    email: 'anilsai@example.com',
    phone: '',
    address: '',
    profileImage: null
  });
  const dropdownRef = useRef(null);
  // Image upload handler for user profile
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserProfile(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Profile field update handler
  const handleProfileUpdate = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save profile handler
  const handleSaveProfile = async () => {
    try {
      const response = await fetch("http://localhost:8000/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: localStorage2.user.id,
          name: userProfile.name,
          phone: userProfile.phone,
          address: userProfile.address,
          profileImage: userProfile.profileImage
        })
      });

      const data = await response.json();
      if (data.success) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Server error");
    }
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
        setIsEditing(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8000/get-profile/${localStorage2.user.id}`);
        const data = await res.json();
        if (data.success) {
          setUserProfile({
            name: data.user.name || '',
            email: data.user.email || '',
            phone: data.user.phone || '',
            address: data.user.address || '',
            profileImage: data.user.profileImage || null
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:8000/get-task/${localStorage2.user.id}`);
        const data = await response.json();
        if (response.ok) {
          setNames(data.tasks);
          console.log(data.tasks)
        } else {
          console.error("Failed to fetch tasks:", data.message);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSubmitTransaction = async () => {
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      alert('Please enter valid description and amount');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: description.trim(),
          amount: parseFloat(amount),
          date: new Date().toISOString().split('T')[0], // current date
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          userId: localStorage2.user.id // replace with actual user ID if available
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert('Task created successfully!');
        // Refresh task list
        const updatedRes = await fetch(`http://localhost:8000/get-task/${localStorage2.user.id}`);
        const updatedData = await updatedRes.json();
        if (updatedRes.ok) {
          setNames(updatedData.tasks);
        } else {
          console.error("Failed to fetch tasks:", updatedData.message);
        }
      } else {
        alert(data.message || 'Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Server error while creating task');
    }

    setShowModal(false);
    setDescription('');
    setAmount('');
  };

  const closeModal = () => {
    setShowModal(false);
    setDescription('');
    setAmount('');
  };

  // Handle deleting a task with confirmation
  const handleDeleteTask = async (taskName) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/delete-task`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: taskName }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Task deleted successfully!');
        alert('Task deleted successfully!');
        setNames((prevNames) => prevNames.filter((t) => t.name !== taskName));
      } else {
        alert(data.message || 'Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Server error while deleting task');
    }
  };

  const filteredNames = names.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to safely format a date string to YYYY-MM-DD
  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toISOString().slice(0, 10);
    } catch (e) {
      console.log(e)
      return '';
    }
  };

  // Normalize editModalTask's date and time format for the edit modal
  const normalizedEditTask = editModalTask && {
    ...editModalTask,
    date: formatDate(editModalTask.date),
    time: editModalTask.time?.slice(0, 5),
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          {/* Logo */}
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-700 dark:text-blue-400 flex-shrink-0 flex items-center gap-2">
            <span className="sm:hidden"><CopyPlus className="w-6 h-6" /></span>
            <span className="hidden sm:inline">Task Manager</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs sm:max-w-sm lg:max-w-md mx-3 sm:mx-4">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search names..."
              className="w-full px-3 sm:px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm transition-colors text-sm sm:text-base"
              autoComplete="off"
            />
          </div>

          {/* Home Button and User Icon */}
          <div className=" flex items-center gap-8 sm:gap-10 flex-shrink-0">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md shadow-sm transition-colors duration-200"
            >
              <HomeIcon className="w-4 h-4" />
              Home
              <span className="hidden xs:inline text-sm sm:text-base">Home</span>
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative rounded-full w-10 h-10 overflow-hidden border-2 border-green-500 shadow-lg hover:shadow-xl transition duration-200"
              >
                {userProfile.profileImage ? (
                  <img
                    src={userProfile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-green-100 flex items-center justify-center rounded-full">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                )}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 p-5 space-y-4 transition-all duration-300 ease-in-out">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-bold text-gray-800 dark:text-white">Profile Settings</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-300">Manage your account</p>
                    </div>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setTimeout(() => setIsEditing(false), 300);
                      }}
                      className="w-7 h-7 flex items-center justify-center border border-gray-400 text-gray-500 hover:text-green-600 hover:border-green-600 rounded-md transition duration-150"
                      aria-label="Close"
                    >
                      <span className="text-lg font-bold">×</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-4 pb-2 border-b border-gray-200 dark:border-gray-700 mb-2">
                    <label htmlFor="profileImage" className="cursor-pointer relative">
                      <div className="relative w-16 h-16">
                        {userProfile.profileImage ? (
                          <img src={userProfile.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover border-4 border-white shadow" />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 border-4 border-white shadow">
                            <User className="w-8 h-8" />
                          </div>
                        )}
                        <div className="absolute bottom-0 right-0 w-7 h-7  text- white border-2  rounded-full flex items-center justify-center text-base shadow">
                          <Camera size={14} />
                        </div>
                      </div>
                      <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">{userProfile.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-300">{userProfile.email}</span>
                      <span className="text-xs text-green-700 bg-green-100 dark:bg-green-700 dark:text-white px-2 py-0.5 rounded-full mt-1 inline-block font-medium">
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex flex-col gap-1">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-300 mb-0.5">📞 Phone Number</span>
                      <span className="text-base font-medium text-gray-800 dark:text-gray-100">
                        {userProfile.phone || 'N/A'}
                      </span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex flex-col gap-1">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-300 mb-0.5 flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> Address
                      </span>
                      <span className="text-base font-medium text-gray-800 dark:text-gray-100">
                        {userProfile.address || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="space-y-2 pt-2">
                      <input
                        type="text"
                        placeholder="Phone"
                        value={userProfile.phone}
                        onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        value={userProfile.address}
                        onChange={(e) => handleProfileUpdate('address', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  <div className="flex gap-2 pt-3">
                    {isEditing ? (
                      <button
                        onClick={handleSaveProfile}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-semibold shadow-md"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-semibold shadow-md"
                      >
                        ✏️ Edit Profile
                      </button>
                    )}
                    <button
                      onClick={() => {
                        // Remove only user-related data from localStorage
                        localStorage.removeItem("account-user");
                        // Optionally clear other app-specific keys if needed
                        setMenuOpen(false);
                        setIsEditing(false);
                        setUserProfile({
                          name: '',
                          email: '',
                          phone: '',
                          address: '',
                          profileImage: null
                        });
                        // Optionally clear sessionStorage if used for auth
                        if (window.sessionStorage) {
                          sessionStorage.removeItem("account-user");
                        }
                        // Redirect to login page (ensure lowercase path)
                        navigate('/login', { replace: true });
                      }}
                      className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg text-sm font-semibold shadow-md"
                    >
                      ↩️ Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20"
      >
        <main className="w-full max-w-7xl px-6 md:px-12">
          <div className="bg-gray-200 p-6 rounded-lg w-gray min-h-[600px] shadow-[0_8px_24px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_24px_rgba(255,255,255,0.05)]">
            <motion.div
              className="grid gap-6 grid-cols-1 sm:grid-cols-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.09 }
                }
              }}
            >
              <AnimatePresence>
                {filteredNames.map((task, index) => (
                  <motion.div
                    key={task._id || index}
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ type: "spring", stiffness: 70, damping: 14 }}
                    whileHover={{
                      scale: 1.04,
                      boxShadow: "0 12px 36px rgba(0,60,200,0.08)"
                    }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 relative cursor-pointer hover:shadow-2xl transition-all duration-300"
                    onClick={(e) => {
                      if (["INPUT", "BUTTON"].includes(e.target.tagName)) return;
                      navigate(`/list/${task._id}`);
                    }}
                  >
                    {/* Edit & Delete Buttons */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditModalTask(task);
                        }}
                        className="bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        title="Delete User"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(task.name);
                        }}
                        className="bg-red-100 dark:bg-red-600 text-red-700 dark:text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                    {/* Name */}
                    <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 ">
                      {task.name}
                    </h2>
                    <p className="text-large text-gray-500 mb-4">
                      Credited at {task.date} {task.time}
                    </p>
                    {/* Stats Cards */}
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                      <div className="bg-gradient-to-r from-green-400 to-green-600 dark:from-green-700 dark:to-green-900 text-white rounded-lg p-4 text-center shadow hover:shadow-xl hover:scale-[1.03] transform transition duration-300 h-full w-full">
                        <p className="text-[16px] font-semibold">Credit 📈</p>
                        <p className="text-lg font-bold">₹ {task.credit || task.amount || 0}</p>
                      </div>
                      <div className="bg-gradient-to-r from-red-400 to-red-600 dark:from-red-700 dark:to-red-900 text-white rounded-lg p-4 text-center shadow hover:shadow-xl hover:scale-[1.03] transform transition duration-300 h-full w-full">
                        <p className="text-[16px] font-semibold">Debit 📉</p>
                        <p className="text-lg font-bold">₹ {task.debit || 0}</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-900 text-white rounded-lg p-4 text-center shadow hover:shadow-xl hover:scale-[1.03] transform transition duration-300 h-full w-full">
                        <p className="text-sm font-medium">Balance</p>
                        <p className="text-lg font-bold">₹ {task.balance || 0}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredNames.length === 0 && (
                <div className="col-span-full flex flex-col justify-center items-center text-gray-600 dark:text-gray-300 text-xl sm:text-2xl font-bold h-[200px] text-center px-4">
                  {names.length === 0
                    ? "Click the + button to create a task"
                    : "No tasks found."}
                </div>
              )}
            </motion.div>
          </div>
        </main>

        {/* Floating Button for Credit Modal */}
        <button
          onClick={openCreditModal}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white text-xl font-bold flex items-center justify-center rounded-full fixed bottom-10 right-10 shadow-lg transition"
        >
          +
        </button>

        {/* Modal for Adding Credit */}
        {showModal && (
          <div className="fixed  inset-0  flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 max-w-md w-full mx-4 shadow-xl relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-600">Create a New Task</h2>
                <button
                  onClick={closeModal}
                  className="w-7 h-7 flex items-center justify-center border border-gray-400 text-gray-500 hover:text-green-600 hover:border-green-600 rounded-md transition duration-150"
                  aria-label="Close"
                >
                  <span className="text-lg font-bold">×</span>
                </button>
              </div>
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

        {/* Modal for Editing Task */}
        {editModalTask && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 max-w-md w-full mx-4 shadow-xl relative">
              <button
                onClick={() => setEditModalTask(null)}
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center border border-gray-400 text-gray-500 hover:text-green-600 hover:border-green-600 rounded-md transition duration-150"
                aria-label="Close"
              >
                <span className="text-lg font-bold">×</span>
              </button>
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit Task</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={normalizedEditTask.name}
                  onChange={(e) =>
                    setEditModalTask({ ...editModalTask, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={normalizedEditTask.amount}
                  onChange={(e) =>
                    setEditModalTask({ ...editModalTask, amount: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6 flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={normalizedEditTask?.date ?? ''}
                    onChange={(e) =>
                      setEditModalTask({ ...editModalTask, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <input
                    type="time"
                    value={normalizedEditTask?.time ?? ''}
                    onChange={(e) =>
                      setEditModalTask({ ...editModalTask, time: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={async () => {
                    if (
                      !editModalTask.name?.trim() ||
                      !editModalTask.amount ||
                      !editModalTask.date ||
                      !editModalTask.time
                    ) {
                      alert("All fields are required to update the task.");
                      return;
                    }

                    try {
                      const response = await fetch("http://localhost:8000/update-task", {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(editModalTask),
                      });
                      const data = await response.json();
                      if (response.ok && data.success) {
                        const refreshed = await fetch("http://localhost:8000/get-all-tasks");
                        const refreshedData = await refreshed.json();
                        if (refreshed.ok && refreshedData.tasks) {
                          setNames(refreshedData.tasks);
                          console.log("data edited successfully")
                        }
                        setEditModalTask(null);
                      } else {
                        alert(data.message || "Failed to update task");
                      }
                    } catch (error) {
                      console.error("Error updating task:", error);
                      alert("Server error while updating task");
                    }
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditModalTask(null)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
      </>
  );
}