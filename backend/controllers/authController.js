// controllers/authController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ================= REGISTER =================

const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ================= LOGIN =================

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        console.log("Email Received:", email);

        const user = await User.findOne({ email });

        console.log("User Found:", user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("Password Received:", password);

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log("Is Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ================= PROFILE =================

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(
            req.user.userId
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ================= LOGOUT =================

const logout = (req, res) => {

    res.status(200).json({
        success: true,
        message: "Logout Successful"
    });

};

// ================= FORGOT PASSWORD =================

const forgotPassword = (req, res) => {

    const { email } = req.body;

    res.status(200).json({
        success: true,
        message: `Password reset link sent to ${email}`
    });

};

// ================= RESET PASSWORD =================

const resetPassword = async (req, res) => {

    try {

        const { email, newPassword } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );

        user.password =
            hashedPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message:
                "Password updated successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



module.exports = {
    register,
    login,
    getProfile,
    logout,
    forgotPassword,
    resetPassword
};