const User = require('../models/user');

// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
    const { userId, name, phone, address, profileImage } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, phone, address, profileImage },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
