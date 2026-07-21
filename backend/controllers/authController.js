// controllers/authController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
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
// ================= UPDATE PROFILE =================

const updateProfile = async (req, res) => {

    try {

        const { name, phone } = req.body;

        const user = await User.findById(req.user.userId);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        user.name = name || user.name;
        user.phone = phone || user.phone;

        await user.save();

        res.status(200).json({

            success: true,

            message: "Profile updated successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }

        });

    }

    catch (error) {

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

const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                success:false,
                message:"No account found with this email."
            });

        }

        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");

        user.resetPasswordToken = resetToken;

        user.resetPasswordExpire =
            Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetUrl =
            `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        const message = `
            <h2>BiteRush Password Reset</h2>

            <p>Hello ${user.name},</p>

            <p>Click below to reset your password.</p>

            <a href="${resetUrl}">
                Reset Password
            </a>

            <br><br>

            <p>This link expires in 15 minutes.</p>
        `;

        await sendEmail({

            email:user.email,

            subject:"BiteRush Password Reset",

            message,

        });

        res.status(200).json({

            success:true,

            message:"Password reset email sent."

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

// ================= RESET PASSWORD =================



const resetPassword = async (req, res) => {

    try {

        const { token } = req.params;

        const { password } = req.body;

        const user = await User.findOne({

            resetPasswordToken: token,

            resetPasswordExpire: {
                $gt: Date.now(),
            },

        });

        if (!user) {

            return res.status(400).json({

                success: false,

                message: "Reset link is invalid or has expired.",

            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        user.resetPasswordToken = null;

        user.resetPasswordExpire = null;

        await user.save();

        res.status(200).json({

            success: true,

            message: "Password reset successfully!",

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};



module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    logout,
    forgotPassword,
    resetPassword
};