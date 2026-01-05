import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Camera, 
  MapPin, 
  Phone, 
  LogOut, 
  Settings, 
  X, 
  Check,
  Mail,
  Edit2,
  SquarePen
} from "lucide-react";
import { toast } from 'sonner';
import API_BASE_URL from '../../config/api';

export default function ProfileDropdown({ userId }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // State
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileImage: null
  });
  
  const dropdownRef = useRef(null);

  // --- Handlers ---

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserProfile((prev) => ({ ...prev, profileImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (field, value) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    // Optimistic UI update
    setIsEditing(false);
    
    try {
      const response = await fetch(`${API_BASE_URL}/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          name: userProfile.name,
          phone: userProfile.phone,
          address: userProfile.address,
          profileImage: userProfile.profileImage
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("account-user");
    sessionStorage.removeItem("account-user");
    setMenuOpen(false);
    navigate('/login', { replace: true });
    window.location.reload();
  };

  // --- Effects ---

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Only close if not editing and not interacting with the modal
        if (!isEditing && !event.target.closest('.modal-content')) {
          setMenuOpen(false);
        }
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen, isEditing]);

  // Fetch Data
  useEffect(() => {
    if (!userId) return;
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/get-profile/${userId}`);
        const data = await res.json();
        if (data.success) {
          setUserProfile({
            name: data.user.name || 'User',
            email: data.user.email || '',
            phone: data.user.phone || '',
            address: data.user.address || '',
            profileImage: data.user.profileImage || null
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [userId]);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* --- Trigger Button --- */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`
          relative group flex items-center justify-center w-11 h-11 rounded-full 
          transition-all duration-300 border-2 
          ${menuOpen ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-gray-200 dark:border-gray-700 hover:border-emerald-400'}
        `}
      >
        <div className="w-full h-full rounded-full overflow-hidden">
          {userProfile.profileImage ? (
            <img
              src={userProfile.profileImage}
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          )}
        </div>
        {/* Active Status Dot */}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full shadow-sm"></span>
      </button>
      
      {/* --- Dropdown Menu --- */}
      {menuOpen && (
        <div 
          className="absolute right-0 top-14 w-80 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden ring-1 ring-black/5">
            
            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-6 pb-8 border-b border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 text-gray-600 bg-gray-200 p-1 rounded-sm dark:bg-gray-500 dark:text-white transition-colors"
              >
                <X size={13} />
              </button>

              <div className="flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="w-20 h-20 rounded-full p-1 bg-white dark:bg-gray-700 shadow-md">
                    {userProfile.profileImage ? (
                      <img src={userProfile.profileImage} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <div className="w-full h-full rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600">
                        <User size={32} />
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                  {userProfile.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {userProfile.email}
                </p>
              </div>
            </div>

            {/* Info Section */}
            <div className="px-5 py-4 space-y-4 -mt-4 relative z-10">
              <div className="bg-white dark:bg-gray-750 border border-gray-100 dark:border-gray-700 dark:bg-gray-700 dark:text-white  rounded-xl shadow-sm p-4 mt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-white">
                  <div className="w-6 h-6 rounded-sm bg-green-100 dark:bg-blue-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Phone size={14} />
                  </div>
                  <span className="truncate">{userProfile.phone || 'No phone added'}</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-white">
                  <div className="w-6 h-6 rounded-sm  bg-blue-100 dark:bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <MapPin size={14} />
                  </div>
                  <span className="truncate ">{userProfile.address || 'No address added'}</span>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex gap-3">
              <button
                onClick={() => {
                  setMenuOpen(false); // Close dropdown logic handled by modal state usually, but safe here
                  setIsEditing(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-emerald-600 transition-all shadow-sm"
              >
                <SquarePen size={16} />
                Edit
              </button>
              
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:border-rose-200 transition-all shadow-sm"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Edit Profile Modal --- */}
      {isEditing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="modal-content w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Edit2 size={18} className="text-emerald-500" />
                Edit Profile
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
              {/* Image Upload */}
              <div className="flex justify-center">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800">
                    <img
                      src={userProfile.profileImage || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label 
                    htmlFor="editProfileImage" 
                    className="absolute bottom-0 right-0 w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer  transition-all border-2 border-white dark:border-gray-800"
                  >
                    <Camera size={14} />
                  </label>
                  <input
                    id="editProfileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={userProfile.phone}
                      onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white placeholder-gray-400 shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={userProfile.address}
                      onChange={(e) => handleProfileUpdate('address', e.target.value)}
                      placeholder="123 Main St, City, Country"
                      className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white placeholder-gray-400 shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-all shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/40 transition-all flex justify-center items-center gap-2"
              >
                <Check size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}