const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "Email not found" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(403).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            setTimeout(() => {
                res.status(400).json({ message: "User already exists" });
            }, 3000);
            return;
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ email, password: hashedPassword, name });
        await newUser.save();

        res.status(200).json({
            message: "Successfully registered",
            token: "mock-token-435",
            user: {
                name: newUser.name,
                email: newUser.email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.logout = (req, res) => {
    // In JWT-based auth, logout is handled on client-side by clearing token
    res.status(200).json({ message: "Logged out successfully" });
};
